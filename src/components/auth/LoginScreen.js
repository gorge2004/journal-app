import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleLogin,
  startLoginByEmailPassword,
} from "../../actions/auth";
import UIErrorForm from "../../ui/UIErrorForm";
import React from "react";
const LoginScreen = React.memo(() => {
  const { msgError, loading } = useSelector((state) => state.ui);
  const dispacth = useDispatch();
  const [{ email, password }, handleInputchange, reset] = useForm({
    email: "jorge@gmail.com",
    password: "123456",
  });

  const handleLogin = (evt) => {
    evt.preventDefault();
    dispacth(startLoginByEmailPassword(email, password));
  };
  const handleLoginByGoogle = (evt) => {
    dispacth(startGoogleLogin());
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
        { msgError &&  <UIErrorForm msg={msgError} />  }
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputchange}
        />
        <input
          className="auth__input"
          autoComplete="off"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleInputchange}
        />

        <button className=" btn btn-primary btn-block" type="submit" disabled={loading}>
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with social network</p>
          <div className="google-btn" onClick={handleLoginByGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create a new account
        </Link>
      </form>
    </>
  );
});

export default LoginScreen;
