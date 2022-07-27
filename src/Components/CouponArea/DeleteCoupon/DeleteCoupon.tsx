import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const params = useParams();
  const couponId = +(params.id || 0);
  const [id, setId] = useState<number>(couponId);
  const navigate = useNavigate();

  const no = () => {
    navigate("/companies/coupons");
  };
  const yes = () => {
    web
      .deleteCoupon(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_COUPON);
        store.dispatch(couponDeletedAction(id));
        navigate("/companies/coupons");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/companies/coupons");
      });
  };

  return (
    <div className="flex-center-col">
      <div className="DeleteCoupon flex-center-col-wrap">
        <h1>Delete Coupon</h1>
        <h3>Are you sure you want to delete Coupon#{id}?</h3>
        <div>
          <button className="button-danger" onClick={yes}>
            Yes
          </button>
          <button className="button" onClick={no}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCoupon;
