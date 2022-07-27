import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerCouponBoot from "../CustomerCouponBoot/CustomerCouponBoot";
import "./CustomerCouponsMaxPriceBoot.css";
import { Button } from "react-bootstrap";
import {
  customerCouponsClear,
  customerCouponsDownloadedAction,
} from "../../../Redux/CustomerCouponsAppState";

function CustomerCouponsMaxPriceBoot(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().customerCouponsReducer.coupons
  );
  const navigate = useNavigate();
  const params = useParams();
  const maxPrice = +params.price || 0;
  const [priceId, setPriceId] = useState<number>(maxPrice);

  console.log("CouponsList" + store.getState().customerCouponsReducer.coupons);
  console.log("priceId$$$" + priceId);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  const [price, setPrice]: any = useState("");

  const customerCoupons = () => {
    store.dispatch(customerCouponsClear());
    navigate("/customers/coupons");
  };

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  useEffect(() => {
    // if (store.getState().customerCouponsReducer.coupons.length === 0) {
    web
      .getAllCustomerCouponsByMaxPrice(priceId)
      .then((res) => {
        // notify.success(SccMsg.ALL_COUPONS);//deleted to avoid two notifications
        // Update Component State (Local state)
        setCoupons(res.data);
        // Update App State (Global State)
        store.dispatch(customerCouponsDownloadedAction(res.data)); //it is better that the store has coupons from all categories
        console.log("list after dispatch: " + coupons);
        console.log(
          "All Customer Coupons" +
            store.getState().customerCouponsReducer.coupons
        );
        console.log(store.getState().customerCouponsReducer.coupons);
      })
      .catch((err) => {
        notify.error(err.message);
      });
    // }
  }, []);

  return (
    <div className="CustomerCouponsMaxPriceBoot flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      <div>
        <Button variant="secondary" onClick={customerCoupons}>
          My Coupons
        </Button>{" "}
        {/* <Button variant="secondary" onClick={goBack}>
          Go back
        </Button>{" "} */}
      </div>
      <div className="flex-row-none-wrap-list">
        {coupons.length > 0 && userType === "CUSTOMER" ? (
          // coupons.map((c) => <CustomerCouponItem key={c.id} coupon={c} />)
          coupons.map((c) => <CustomerCouponBoot key={c.id} coupon={c} />)
        ) : (
          <EmptyView msg={"No coupons today"} />
        )}
      </div>
    </div>
  );
}

export default CustomerCouponsMaxPriceBoot;
