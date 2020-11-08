import React, { useEffect, useState } from "react";
import CaseImage from "./../../components/case-image/CaseImage";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reSubmitIssue, submitIssue } from "../../actions.js/case.actions";
import { toBase64 } from "./../../utils/file-util";

const NewCase = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const caseList = useSelector((state) => state.cases.caseList);
  const isEdit = location.pathname.includes("/edit");

  useEffect(() => {
    if (isEdit) {
      const currentCase = caseList.find(
        (item) => item.id === Number(params.id)
      );
      setImages(currentCase.images);
      setTitle(currentCase.title);
      setNotes(currentCase.notes);
    }
  }, [params.id, caseList, isEdit]);

  useEffect(() => {}, []);
  const onChangeImage = (e) => {
    const allPromises = Object.values(e.target.files).map((file) =>
      toBase64(file)
    );
    Promise.all(allPromises).then((data) => {
      setImages([...images, ...data.map((o) => ({ imgUrl: o }))]);
    });
  };

  const onAnnotaionChange = (imgData, i) => {
    setImages(
      images.map((item, index) => {
        return index === i ? imgData : item;
      })
    );
  };

  const onSubmitIssue = () => {
    const issue = {
      id: isEdit ? Number(params.id) : caseList.length + 1,
      images,
      title,
      notes,
      status: isEdit ? "submitted" : "initiated",
    };
    if (isEdit) {
      dispatch(reSubmitIssue(issue));
    } else {
      dispatch(submitIssue(issue));
    }
    history.push("/");
  };

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
      <div className="container new-case-container">
  
        <div className=" mt-5">
          {images.map((item, i) => {
            return (
              <div>
                <CaseImage
                  imageItem={item}
                  onAnnotaionChange={(data) => onAnnotaionChange(data, i)}
                />
              </div>
            );
          })}
          <div className="card p-4 col-lg-6 col-md-8 col-sm-12">
            <div className="row">
              <input
                type="file"
                onChange={onChangeImage}
                multiple
                className="formControl m-1"
              />
              <input
                type="text"
                value={title}
                className="formControl m-1 col-sm-12"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of case"
              />
              <textarea
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="formControl m-1 col-sm-12"
                placeholder="Write notes here..."
              />
              <button onClick={onSubmitIssue} className="btn btn-success mt-2">
                Create Case
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCase;
