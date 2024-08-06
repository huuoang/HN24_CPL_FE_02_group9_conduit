import { useEffect, useState } from "react";
import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import userUpdate from "../../../services/userUpdate";
import getUser from "../../../services/getUser"; 

function SettingsForm() {
  const { headers, isAuth, loggedUser, setAuthState } = useAuth();
  const [form, setForm] = useState({
    bio: loggedUser.bio || "",
    email: loggedUser.email,
    image: loggedUser.image || "",
    password: "", 
    username: loggedUser.username,
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [inactive, setInactive] = useState(false);
  const [formError, setFormError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      getUser({ headers }).then(user => {
        setCurrentUser(user);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [isAuth, headers, navigate]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
    setInactive(false);

    if (formError) {
      setFormError("");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (inactive) return;

    try {
      if (currentUser) {
        if (form.username !== currentUser.username || form.email !== currentUser.email) {
          setFormError("Username or email already exists. Please try again.");
          return;
        }
      }

      const updatedFields = {};
      if (form.bio !== currentUser.bio) updatedFields.bio = form.bio;
      if (form.email !== currentUser.email) updatedFields.email = form.email;
      if (form.image !== currentUser.image) updatedFields.image = form.image;
      if (form.password) updatedFields.password = form.password;
      if (form.username !== currentUser.username) updatedFields.username = form.username;

      await userUpdate({ headers, ...updatedFields });
      setAuthState((prevState) => ({
        ...prevState,
        loggedUser: { ...prevState.loggedUser, ...form },
      }));
      navigate(`/profile/${form.username}`); 
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

          {formError && (
            <span style={{ color: "red", fontSize: "0.875rem" }}>
              {formError}
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
