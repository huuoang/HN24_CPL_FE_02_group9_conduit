import { useEffect, useState } from "react";
import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import userUpdate from "../../../services/userUpdate";

function SettingsForm() {
  const { headers, isAuth, loggedUser, setAuthState } = useAuth();
  const [form, setForm] = useState({
    bio: loggedUser.bio || "",
    email: loggedUser.email,
    image: loggedUser.image || "",
    password: loggedUser.password || "",
    username: loggedUser.username,
  });

  const [inactive, setInactive] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, loggedUser, navigate]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
    setInactive(false);

    // Xóa lỗi mật khẩu khi người dùng nhập lại
    if (name === "password") {
      setPasswordError("");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (inactive) return;

    if (form.password.length < 3) {
      setPasswordError("Password must be longer than 3 characters");
      return;
    }

    try {
      await userUpdate({ headers, ...form });
      setAuthState((prevState) => ({
        ...prevState,
        loggedUser: { ...prevState.loggedUser, ...form },
      }));
      navigate(`/profile/${form.username}`); // Chuyển hướng đến trang profile
    } catch (error) {
      console.error(error);
    }

    setInactive(true);
  };

  return (
    isAuth && (
      <form onSubmit={formSubmit}>
        <fieldset>
          <FormFieldset
            placeholder="URL of profile picture"
            name="image"
            value={form.image}
            handler={inputHandler}
          />

          <FormFieldset
            placeholder="Your Name"
            name="username"
            required
            value={form.username}
            handler={inputHandler}
          />

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              name="bio"
              value={form.bio}
              onChange={inputHandler}
            />
          </fieldset>

          <FormFieldset
            placeholder="Email"
            name="email"
            required
            value={form.email}
            handler={inputHandler}
          />

          <FormFieldset
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            handler={inputHandler}
            minLength="3"
          />

          {passwordError && (
            <span style={{ color: "red", fontSize: "0.875rem" }}>
              {passwordError}
            </span>
          )}

          {!inactive && (
            <button
              type="submit"
              className="btn btn-lg btn-primary pull-xs-right"
            >
              Update Settings
            </button>
          )}
        </fieldset>
      </form>
    )
  );
}

export default SettingsForm;
