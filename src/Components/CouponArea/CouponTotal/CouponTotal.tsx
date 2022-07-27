import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./CouponTotal.css";

function CouponTotal(): JSX.Element {
  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  console.log("userType%%%: " + userType);

  const [num, setNum] = useState(
    store.getState().couponsReducer.coupons.length
  );

  const [cusNum, setCusNum] = useState(
    store.getState().customerCouponsReducer.coupons.length
  );

  console.log(
    "customerCouponsReducer.coupons%%% " +
      store.getState().customerCouponsReducer.coupons.length
  );

  useEffect(() => {
    return store.subscribe(() => {
      setNum(store.getState().couponsReducer.coupons.length);
    });
  }, [num]);

  useEffect(() => {
    return store.subscribe(() => {
      setNum(store.getState().customerCouponsReducer.coupons.length);
    });
  }, [cusNum]);

  return (
    <div className="TodoTotal">
      <Circle num={cusNum} />
      <Circle num={num} />
      {/* {userType === "CUSTOMER" ? <Circle num={cusNum} /> : <Circle num={num} />} */}
    </div>
  );
}

export default CouponTotal;
