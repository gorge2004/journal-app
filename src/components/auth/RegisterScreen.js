import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailAndPassword } from "../../actions/auth";
const RegisterScreen = () => {
  const [{ name, email, password, password2 }, handleInputchange, reset] =
    useForm({
      name: "Jorge",
      email: "jorge@gmail.com",
      password: "123456",
      password2: "123456",
    });
  // obetengo el state del redux tal como se tiene
  const { msgError } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    if (isFormValue()) {
      console.log(name, email, password, password2);
      dispatch(startRegisterWithEmailAndPassword(email, password, name));
      
    }
  };
  const isFormValue = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required."));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is not validate."));
      return false;
    } else if (password !== password2 || password2.length <= 5) {
      dispatch(
        setError("password should be at least characters and match each other.")
      );
      return false;
    }
    dispatch(removeError());

    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleSubmitRegister} className="animate__animated animate__fadeIn animate__faster">
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputchange}
        />
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
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputchange}
        />
        <input
          className="auth__input"
          autoComplete="off"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputchange}
        />
        <button className=" btn btn-primary btn-block mb-5" type="submit">
          Login
        </button>

        <Link className="link mt-5" to="/auth/login">
          already registered ?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
