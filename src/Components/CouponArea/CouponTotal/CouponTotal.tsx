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

  let updatedNumber = (type: string) => {
    if (type === "CUSTOMER") {
      return store.getState().customerCouponsReducer.coupons.length;
    } else {
      return store.getState().couponsReducer.coupons.length;
    }
  };

  // console.log("The updated number is ^^^ " + updatedNumber(userType));

  const [num, setNum] = useState(updatedNumber(userType));

  // console.log(
  //   "customerCouponsReducer.coupons%%% " +
  //     store.getState().customerCouponsReducer.coupons.length
  // );
  // console.log(
  //   "couponsReducer.coupons%%% " +
  //     store.getState().couponsReducer.coupons.length
  // );

  // console.log("userType%%%: " + userType);

  useEffect(() => {
    return store.subscribe(() => {
      setNum(updatedNumber(userType));
    });
  }, [num]);

  return (
    <div className="TodoTotal">
      <Circle num={num} />
    </div>
  );
}

export default CouponTotal;
