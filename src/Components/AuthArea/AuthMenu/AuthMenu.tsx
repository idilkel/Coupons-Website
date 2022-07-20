import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
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
        </>
      ) : (
        <>
          Hello Guest
          <MenuLink to="login">Login</MenuLink>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
