import AuthPageContainer from "../components/Container/AuthPageContainer";
import SignUpForm from "../components/Forms/SignUpForm";
import { useState } from "react";

function SignUp()
{
  const [ errorMessage, setErrorMessage ] = useState();

  const handleError = (error) =>
  {
    setErrorMessage(error);
  };

  return (
    <AuthPageContainer
      error={errorMessage}
      path="/login"
      text="Sign in to your account"
      title="Sign up"
    >
      <SignUpForm onError={handleError} />
    </AuthPageContainer>
  );
}

export default SignUp;
