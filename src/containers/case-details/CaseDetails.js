import React, { useEffect, useState } from "react";
import CaseImage from "../../components/case-image/CaseImage";
import {useParams, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';



const CaseDetails = () => {
  const [caseDetails, setCaseDetails] = useState({});

  const params = useParams();
  const history = useHistory();
  const caseList = useSelector(state =>  state.cases.caseList);

  useEffect(()=> {
        const currentCase = caseList.find(item => item.id === Number(params.id));
        setCaseDetails(currentCase);
  }, [caseList, params.id])


  return (
    <>
      <ol class="breadcrumb">
          <li class="breadcrumb-item active d-flex" aria-current="page" onClick={() => history.goBack()}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-chevron-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>{" "}
            Back
          </li>
        </ol>
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
