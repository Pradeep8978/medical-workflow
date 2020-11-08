import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeIssueStatus } from "../../actions.js/case.actions";
import "./CaseList.scss";

const STATUS_LIST = [
    '',
    'initiated',
    'submitted',
    'approved',
    'rejected'
];

const CaseList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filteredStatus, setFilteredStatus] = useState('');
  const caseList = useSelector((state) => state.cases.caseList);
  const filteredCases = caseList.filter(caseitem => caseitem.status.includes(filteredStatus));

  const onChangeStatus = (status, id) => {
    dispatch(changeIssueStatus(status, Number(id)));
  };

  const onFilterStatus = (e) => {
    setFilteredStatus(e.target.value);
  }

  const renderActionButtons = (caseItem) => {
    switch (caseItem.status) {
      case "initiated":
        return (
          <button
            onClick={() => onChangeStatus("submitted", caseItem.id)}
            className="btn btn-warning"
          >
            Submit Case
          </button>
        );
      case "submitted":
        return (
          <>
            <button
              onClick={() => onChangeStatus("approved", caseItem.id)}
              className="btn btn-success mr-2"
            >
              Approve Case
            </button>
            <button
              onClick={() => onChangeStatus("rejected", caseItem.id)}
              className="btn btn-danger"
            >
              Reject Case
            </button>
          </>
        );
      case "approved":
        return null;
      default: return null;  
    }
  };

  return (
    <div className="case-list-container container">
      <button className="btn btn-outline-primary mt-3" onClick={() => history.push("/new")}>
        New Case
      </button>
      <div className="mt-3">
        <h1 className="d-flex heading">Case List 
            <select className="form-control col-3" value={filteredStatus} onChange={onFilterStatus}>
                {
                    STATUS_LIST.map(val => <option key={val} value={val}>{val || 'All'}</option>)
                }
            </select>
        </h1>
        {filteredCases.length ? filteredCases.map(caseItem => {
          return (
            <div key={caseItem.id} className="card mb-2">
              {/* <img
                className="card-img-top"
                src={caseItem?.images[0].imgUrl}
                alt="Card image cap"
                height={400}
              /> */}
              <div className="card-body">
                <h5 className="card-title">{caseItem.title}</h5>
                <p className="card-text">{caseItem.notes}</p>
                <div>Status: <span className="case-status">{caseItem.status}</span></div>
                <div className="mt-2 mb-2">{renderActionButtons(caseItem)}</div>
                {["submitted"].includes(caseItem.status) && (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => history.push(`/case/${caseItem.id}/edit`)}
                  >
                    Edit Case Details
                  </button>
                )}

                <button
                  className="btn btn-dark"
                  onClick={() => history.push(`/case/${caseItem.id}/details`)}
                >
                  View Case Details
                </button>
              </div>
            </div>
          );
        }) : <h1 className="text-center no-records">No Records found</h1>}
      </div>
    </div>
  );
};

export default CaseList;
