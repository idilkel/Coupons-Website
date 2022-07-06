import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList from "../../CouponArea/CouponList/CouponList";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      {/* <CouponList /> */}
      {/* <AddCoupon /> */}
      <EditCoupon />
      {/* <DeleteCoupon /> */}
    </div>
  );
}

export default Main;
