import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions.js/auth.actions";
import "./Login.scss";

const Login = () => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (
      formValues.email === "admin@example.com" &&
      formValues.password === "1234"
    ) {
      setError("");
      dispatch(loginUser());
      history.push("/");
    } else {
      setError("Invalid Username or password");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">ADMIN PANEL</div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={onLogin}>
                <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <input
                    onChange={onChangeValue}
                    id="inputEmail"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autoFocus
                    className="form-control rounded-pill border-0 shadow-sm px-4"
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    onChange={onChangeValue}
                    id="inputPassword"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control rounded-pill border-0 shadow-sm px-4 "
                  />
                </div>

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text" />
                </div>
                <div className="col-lg-6 login-btm login-button">
                  <button type="submit" className="btn btn-outline-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </div>
  );
};

export default Login;
