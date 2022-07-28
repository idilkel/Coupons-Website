import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { couponsClear } from "../../../Redux/CouponsAppState";
import { logoutAction } from "../../../Redux/AuthAppState";
import "./Logout.css";
import Button from "react-bootstrap/Button";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import { customerCouponsClear } from "../../../Redux/CustomerCouponsAppState";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const yes = () => {
    store.dispatch(logoutAction());
    store.dispatch(couponsClear());
    // store.dispatch(customerCouponsClear());
    navigate("/login");
  };

  // useEffect(() => {
  //   //do with notif
  //   const res = window.confirm("Are you sure you want to log out?");
  //   // console.log("****Logout res" + res);
  //   if (res) {
  //     store.dispatch(logoutAction());
  //     store.dispatch(couponsClear());
  //     navigate("/login");
  //   }
  // });
  return (
    <>
      <div className="flex-center-col">
        <div className="Logout flex-center-col-wrap">
          <h1>Logout</h1>
          <h3>Are you sure you want to logout?</h3>
          <div>
            <Button variant="danger" className="margin" onClick={yes}>
              Yes
            </Button>{" "}
            <Button variant="success" className="margin" onClick={goBack}>
              No
            </Button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
