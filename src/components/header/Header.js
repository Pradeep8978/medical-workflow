import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { logoutUser } from "../../actions.js/auth.actions";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const onLogout = () => {
    localStorage.setItem('state', '')
    dispatch(logoutUser());
    history.push('/')

  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        Medical Lab Case Management Workflow
      </span>
      {isAuthenticated &&
      <button className="btn btn-danger" type="button" onClick={onLogout}>
        Logout
      </button>}
    </nav>
    <nav aria-label="breadcrumb">

</nav>
    </>
  );
};

export default Header;
