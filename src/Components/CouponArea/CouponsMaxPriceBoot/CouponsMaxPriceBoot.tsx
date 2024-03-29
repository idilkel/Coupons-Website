import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import {
  couponsClear,
  couponsDownloadedAction,
} from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import "./CouponsMaxPriceBoot.css";

function CouponsMaxPriceBoot(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const priceId = +(params.price || 0);
  const [price, setPrice] = useState<number>(priceId);

  const customerCoupons = () => {
    store.dispatch(couponsClear());
    navigate("/customers/coupons");
  };
  const companyCoupons = () => {
    navigate("/companies/coupons");
  };

  const allCoupons = () => {
    // store.dispatch(couponsClear());

    navigate("/coupons");
  };

  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const [cat, setCat]: any = useState("");

  console.log("todoList" + store.getState().couponsReducer.coupons);

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  // useEffect(() => {
  //   if (
  //     store.getState().couponsReducer.coupons.length === 0 ||
  //     (store.subscribe && store.getState().authReducer.user.type === "COMPANY")
  //   ) {
  //     web
  //       .getAllCompanyCouponsByMaxPrice(priceId)
  //       .then((res) => {
  //         notify.success(SccMsg.ALL_COUPONS);
  //         // Update Component State (Local state)
  //         setCoupons(res.data);
  //         // Update App State (Global State)
  //         store.dispatch(couponsDownloadedAction(res.data));
  //         console.log("list after dispatch: " + coupons); //why empty after refresh
  //         console.log("todoList" + store.getState().couponsReducer.coupons);
  //         console.log(store.getState().couponsReducer.coupons);
  //       })
  //       .catch((err) => {
  //         notify.error(err);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    setCoupons(coupons.filter((c) => c.price <= priceId));
  }, []);

  // useEffect(() => {
  //   if (
  //     store.getState().couponsReducer.coupons.length === 0 ||
  //     (store.subscribe &&
  //       (store.getState().authReducer.user.type === "CUSTOMER" ||
  //         store.getState().authReducer.user.type === "ADMINISTRATOR"))
  //   ) {
  //     web
  //       .getAllCouponsByMaxPrice(priceId)
  //       .then((res) => {
  //         notify.success(SccMsg.ALL_COUPONS);
  //         // Update Component State (Local state)
  //         setCoupons(res.data);
  //         // Update App State (Global State)
  //         store.dispatch(couponsDownloadedAction(res.data));
  //         console.log("list after dispatch: " + coupons); //why empty after refresh
  //         console.log("todoList" + store.getState().couponsReducer.coupons);
  //         console.log(store.getState().couponsReducer.coupons);
  //       })
  //       .catch((err) => {
  //         notify.error(err);
  //       });
  //   }
  // }, []);

  return (
    <div className="CouponList flex-center-col">
      <h1 className="flex-row-none-wrap-list">Our Coupons</h1>
      <div>
        {userType === "CUSTOMER" ? (
          <>
            <Button variant="secondary" onClick={customerCoupons}>
              Customer Coupons
            </Button>{" "}
          </>
        ) : (
          <> </>
        )}
        {userType === "COMPANY" ? (
          <>
            <Button variant="secondary" onClick={companyCoupons}>
              Company Coupons
            </Button>{" "}
          </>
        ) : (
          <> </>
        )}
        <Button variant="secondary" onClick={allCoupons}>
          All Coupons
        </Button>{" "}
        {/* <Button variant="secondary" onClick={customerCoupons}>
          Customer Coupons
        </Button>{" "} */}
        {/* <Button variant="secondary" onClick={companyCoupons}>
          Company Coupons
        </Button>{" "} */}
      </div>

      <div>
        <div className="flex-row-none-wrap-list">
          {coupons.length > 0 ? (
            // coupons.map((c) => <CouponToPurchase key={c.id} coupon={c} />)
            coupons.map((c) => <CouponToPurchaseBoot key={c.id} coupon={c} />)
          ) : (
            <EmptyView msg={"No coupons today"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponsMaxPriceBoot;
