import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userLogin from "../../../services/userLogin";

function LoginForm({ onError })
{
  const [ { email, password }, setForm ] = useState({ email: "", password: "" });
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const [ er, setEr ] = useState("");

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    userLogin({ email, password })
      .then(setAuthState)
      .then(() => navigate("/"))
      .catch(onError => {
        setEr(onError.errors?.email[0] || onError.errors?.password[0] || "Failed to login user.");
      });
  };

  const inputHandler = (e) =>
  {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [ name ]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
       {er && <p style={{ color: "red" }}>{er}</p>}
      <FormFieldset
        type="email"
        name="email"
        required
        placeholder="Email"
        value={email}
        handler={inputHandler}
        autoFocus
      ></FormFieldset>
      

      <FormFieldset
        name="password"
        type="password"
        required
        placeholder="Password"
        value={password}
        handler={inputHandler}
        minLength="3"
      ></FormFieldset>
      <button className="btn btn-lg btn-primary pull-xs-right">Login</button>
    </form>
  );
}

export default LoginForm;
