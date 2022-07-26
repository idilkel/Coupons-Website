import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";
import "./AuthMenu.css";
import Button from "react-bootstrap/Button";

function AuthMenu(): JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );
  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  console.log("Authorization: " + store.getState().authReducer.user);
  useEffect(() => {
    return store.subscribe(() => {
      // setIsLoggedIn(false);
      setIsLoggedIn(store.getState().authReducer.user?.token?.length > 0);
      setEmail(store.getState().authReducer.user?.email);
    });
  }, []);
  return (
    <div className="AuthMenu flex-row-gap">
      {isLoggedIn ? (
        <>
          Hello {email}
          <MenuLink to="logout">Logout</MenuLink>
          <Button variant="secondary" className="margin" onClick={goBack}>
            Back
          </Button>{" "}
        </>
      ) : (
        <>
          Hello Guest
          <MenuLink to="login">Login</MenuLink>
          <Button variant="secondary" className="margin" onClick={goBack}>
            Back
          </Button>{" "}
        </>
      )}
    </div>
  );
}

export default AuthMenu;
