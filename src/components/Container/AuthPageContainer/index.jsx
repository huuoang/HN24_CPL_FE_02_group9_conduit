import ContainerRow from "../ContainerRow";
import { Link } from "react-router-dom";

function AuthPageContainer({ children, error, path, text, title })
{
  return (
    <div className="auth-page">
      <ContainerRow type="page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{title}</h1>
          <p className="text-xs-center">
            <Link to={path}>{text}</Link>
          </p>

          {error && (
            <ul className="error-messages">
              {typeof error === 'string' ? (
                <li>{error}</li>
              ) : (
                Array.isArray(error) ? error.map((err, index) => <li key={index}>{err}</li>) : null
              )}
            </ul>
)}

          {children}
        </div>
      </ContainerRow>
    </div>
  );
}

export default AuthPageContainer;

