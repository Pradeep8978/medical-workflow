import React, { useEffect, useState } from "react";
import CaseImage from "../../components/case-image/CaseImage";
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';



const CaseDetails = () => {
  const [caseDetails, setCaseDetails] = useState({});

  const params = useParams();
  const caseList = useSelector(state =>  state.cases.caseList);

  useEffect(()=> {
        const currentCase = caseList.find(item => item.id === Number(params.id));
        setCaseDetails(currentCase);
  }, [caseList, params.id])


  return (
    <>
      <div className="container">
        <div className=" mt-5">
          {caseDetails?.images?.map((item, i) => {
            return (
              <div>
                <CaseImage
                  imageItem={item}
                  onAnnotaionChange={data => {}}
                  disabled
                />
              </div>
            );
          })}
          <div className="card p-4 col-lg-6 col-md-8 col-sm-12">
            <div className="row">
              <h4 className="col-12">{caseDetails.title} </h4>
              <div className="col-12">
              <div>Status: <span className="case-status">{caseDetails.status}</span> </div>
              </div>

              <p className="col-12">{caseDetails.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseDetails;
