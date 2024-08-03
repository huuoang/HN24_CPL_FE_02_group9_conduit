import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userSignUp from "../../../services/userSignUp";

function SignUpForm({ onError }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submission

    userSignUp(form)
      .then(setAuthState)
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.message.includes("Username")) {
          setErrors((prevErrors) => ({ ...prevErrors, username: "Username already exists" }));
        }
        if (error.message.includes("Email")) {
          setErrors((prevErrors) => ({ ...prevErrors, email: "Email already exists" }));
        }
        onError(error);
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.username && <div style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{errors.username}</div>}
        <FormFieldset
          name="username"
          required
          placeholder="Your Name"
          value={form.username}
          handler={inputHandler}
        />
      </div>

      <div>
        {errors.email && <div style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{errors.email}</div>}
        <FormFieldset
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          handler={inputHandler}
        />
      </div>

      <div>
        <FormFieldset
          name="password"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          handler={inputHandler}
        />
      </div>

      <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
    </form>
  );
}

export default SignUpForm;
