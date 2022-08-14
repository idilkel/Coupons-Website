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
import "./CouponsCategoryBoot.css";

function CouponsCategoryBoot(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const catName = params.cat || null;
  const [catId, setCatId] = useState<string>(catName);

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

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  console.log("todoList" + store.getState().couponsReducer.coupons);

  // useEffect(() => {
  //   if (
  //     store.getState().couponsReducer.coupons.length === 0 ||
  //     store.subscribe
  //   ) {
  //     web
  //       .getAllCouponsByCategory(catId)
  //       .then((res) => {
  //         //   notify.success(SccMsg.ALL_COUPONS);//two notifications on going back from something else
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
    setCoupons(coupons.filter((c) => c.category == catId));
  }, []);

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
      </div>
      <div>
        <div className="flex-row-none-wrap-list">
          {coupons.length > 0 ? (
            coupons.map((c) => <CouponToPurchaseBoot key={c.id} coupon={c} />)
          ) : (
            <EmptyView msg={"No coupons today"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponsCategoryBoot;
