import "./Menu.css";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function Menu(): JSX.Element {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  // const func1 = () => {
  //   console.log("I DID IT!!!");
  //   if (
  //     // store.getState().couponsReducer.coupons.length === 0 &&
  //     userType !== null
  //   ) {
  //     switch (userType) {
  //       case "COMPANY":
  //         web
  //           .getAllCompanyCoupons()
  //           .then((res) => {
  //             store.dispatch(couponsDownloadedAction(res.data));
  //             console.log("%7%");
  //           })
  //           .catch((err) => {
  //             notify.error(err);
  //           });
  //         break;
  //       case "CUSTOMER":
  //         web
  //           .getAllCoupons() //To see all coupons offered for purchasing
  //           .then((res) => {
  //             store.dispatch(couponsDownloadedAction(res.data));
  //             console.log("%8%");
  //           })
  //           .catch((err) => {
  //             notify.error(err);
  //           });
  //         break;
  //       case "ADMINISTRATOR":
  //         web
  //           .getAllCoupons()
  //           .then((res) => {
  //             store.dispatch(couponsDownloadedAction(res.data));
  //             console.log("%9%");
  //           })
  //           .catch((err) => {
  //             notify.error(err);
  //           });
  //         break;
  //     }
  //   }
  // };

  return (
    <div className="Menu flex-col-top-center">
      <span className="icon">
        <MenuLink to="home">
          <div className={isRoot ? "active" : ""}>
            <AiOutlineHome size={50} />
          </div>
        </MenuLink>
      </span>
      <MenuLink to="/coupons" onClick={""}>
        Coupons
      </MenuLink>
      <MenuLink to="/about">About</MenuLink>
    </div>
  );
}

export default Menu;
