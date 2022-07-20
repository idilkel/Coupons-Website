import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { couponsClear } from "../../../Redux/CouponsAppState";
import { logoutAction } from "../../../Redux/AuthAppState";
import "./Logout.css";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    //do with notif
    const res = window.confirm("Are you sure you want to log out?");
    if (res) {
      store.dispatch(logoutAction());
      store.dispatch(couponsClear());
      navigate("/login");
    }
  });
  return <></>;
}

export default Logout;
