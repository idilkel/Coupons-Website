import { useState } from "react";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const [id, setId] = useState<number>(17);
  return (
    <div className="flex-center-col">
      <div className="DeleteCoupon flex-center-col-wrap">
        <h1>Delete Coupon</h1>
        <h3>Are you sure you want to delete Coupon#{id}?</h3>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCoupon;
