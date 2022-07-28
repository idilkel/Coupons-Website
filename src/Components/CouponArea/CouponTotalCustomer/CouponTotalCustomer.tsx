import { useEffect, useState } from "react";
import { customerCouponsDownloadedAction } from "../../../Redux/CustomerCouponsAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./CouponTotalCustomer.css";

function CouponTotalCustomer(): JSX.Element {
  //   const [num, setNum] = useState(
  //     store.getState().customerCouponsReducer.coupons.length
  //   );

  //   useEffect(() => {
  //     if (store.getState().customerCouponsReducer.coupons.length === 0) {
  //       web
  //         .getAllCustomerCoupons()
  //         .then((res) => {
  //           // notify.success(SccMsg.ALL_COUPONS); //two notifications on change
  //           // Update Component State (Local state)
  //           console.log("Hey res data<><><>" + res.data);
  //           setCoupons(res.data);
  //           setNum(res.data.length);
  //           // Update App State (Global State)
  //           store.dispatch(customerCouponsDownloadedAction(res.data));
  //         })
  //         .catch((err) => {
  //           notify.error(err);
  //           console.log("Hey error on first get customer coupons length<><><>");
  //         });
  //     }
  //     return store.subscribe(() => {
  //       setNum(store.getState().customerCouponsReducer.coupons.length);
  //     });
  //   }, [num]);

  return (
    <div className="CouponTotalCustomer">
      {/* {store.getState().customerCouponsReducer.coupons === null ? (
        <>
          <Circle num={0} />
        </>
      ) : (
        <>
          <Circle num={num} />
        </>
      )} */}
    </div>
  );
}

// export default CouponTotalCustomer;

// function setCoupons(data: any) {
//   throw new Error("Function not implemented.");
// }
