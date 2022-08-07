import { type } from "os";
import { useEffect, useState } from "react";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./CouponTotal.css";

function CouponTotal(): JSX.Element {
  const [num, setNum] = useState(
    store.getState().couponsReducer.coupons.length
  );

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  // useEffect(() => {}, []);

  useEffect(() => {
    if (
      store.getState().couponsReducer.coupons.length === 0 &&
      userType !== null
    ) {
      switch (userType) {
        case "COMPANY":
          web
            .getAllCompanyCoupons()
            .then((res) => {
              setNum(res.data.length);
              store.dispatch(couponsDownloadedAction(res.data));
              console.log("%3%");
            })
            .catch((err) => {
              notify.error(err);
            });
          break;
        case "CUSTOMER":
          web
            .getAllCustomerCoupons()
            .then((res) => {
              setNum(res.data.length);
              store.dispatch(couponsDownloadedAction(res.data));
              console.log("%4%");
            })
            .catch((err) => {
              notify.error(err);
            });
          break;
        case "ADMINISTRATOR":
          web
            .getAllCoupons()
            .then((res) => {
              setNum(res.data.length);
              store.dispatch(couponsDownloadedAction(res.data));
              console.log("%5%");
            })
            .catch((err) => {
              notify.error(err);
            });
          break;
      }

      // web
      //   .getAllCoupons()
      //   .then((res) => {
      //     // notify.success(SccMsg.ALL_COUPONS); //two notifications on change
      //     // Update Component State (Local state)
      //     console.log("Hello res data<><><>" + res.data);
      //     // setCoupons(res.data);
      //     setNum(res.data.length);
      //     // Update App State (Global State)
      //     store.dispatch(couponsDownloadedAction(res.data));
      //   })
      //   .catch((err) => {
      //     notify.error(err);
      //     console.log("Hello error on first get coupons length<><><>");
      //   });
    }
    return store.subscribe(() => {
      setNum(store.getState().couponsReducer.coupons.length);
    });
  }, [num]);

  return (
    <div className="TodoTotal">
      {store.getState().couponsReducer.coupons === null ? (
        <>
          <Circle num={0} />
        </>
      ) : (
        <>
          <Circle num={num} />
        </>
      )}
    </div>
  );
}

export default CouponTotal;

// function setCoupons(data: any) {
//   throw new Error("Function not implemented.");
// }
