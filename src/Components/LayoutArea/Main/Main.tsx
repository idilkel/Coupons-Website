import { Outlet } from "react-router-dom";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList from "../../CouponArea/CouponList/CouponList";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import Routing from "../../RoutingArea/Routing/Routing";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <Routing />
      <Outlet />
      {/* <CouponList /> */}
      {/* <AddCoupon /> */}
      {/* <EditCoupon /> */}
      {/* <DeleteCoupon /> */}
    </div>
  );
}

export default Main;
