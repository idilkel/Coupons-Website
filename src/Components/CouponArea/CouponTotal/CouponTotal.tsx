import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./CouponTotal.css";

function CouponTotal(): JSX.Element {
  const [num, setNum] = useState(
    store.getState().couponsReducer.coupons.length
  );

  useEffect(() => {
    // if (num === 0) {
    //   web
    //     .countTasks()
    //     .then((res) => {
    //       setNum(res.data);
    //       // notify.success("total : " + res.data);
    //     })
    //     .catch((err) => {
    //       notify.error(err.message);
    //     });
    // }
    return store.subscribe(() => {
      setNum(store.getState().couponsReducer.coupons.length);
    });
  }, [num]);

  return (
    <div className="TodoTotal">
      <Circle num={num} />
    </div>
  );
}

export default CouponTotal;
