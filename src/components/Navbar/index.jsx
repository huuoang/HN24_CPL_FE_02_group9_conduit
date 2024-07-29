import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";
import { useAuth } from "../../context/AuthContext";
import {Link} from "react-router-dom";

function Navbar()
{
    const {isAuth}= useAuth();
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    conduit
                </Link>

                <ul className="nav navbar-nav pull-xs-right">
                    <NavItem text="Home" url="/" />

                    {isAuth && (
                        <>
                            <NavItem text="New Article" icon="ion-compose" url="/editor" />
                            <DropdownMenu />
                        </>
                    )}

                    {!isAuth && (
                        <>
                            <NavItem text="Login" icon="ion-log-in" url="/login" />
                            <NavItem text="Sign up" url="/register" />
                        </>
                    )}
                </ul>
            </div>
        </nav>        
    );
}

export default Navbar