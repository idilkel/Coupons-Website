import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const params = useParams();
  const taskId = +(params.id || 0);
  const [id, setId] = useState<number>(taskId);
  const navigate = useNavigate();

  const no = () => {
    navigate("/admin/customers");
  };
  const yes = () => {
    web
      .deleteCoupon(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_COUPON);
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/customers");
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
