import AuthPageContainer from "../components/Container/AuthPageContainer";
import LoginForm from "../components/Forms/LoginForm";
import { useState } from "react";

function Login()
{
  const [ errorMessage, setErrorMessage ] = useState();

  const handleError = (error) =>
  {
    setErrorMessage(error);
  };

  return (
    <AuthPageContainer
      error={errorMessage}
      path="/register"
      text="Need an account?"
      title="Sign in"
    >
      <LoginForm onError={handleError} />
    </AuthPageContainer>
  );
}

export default Login;
