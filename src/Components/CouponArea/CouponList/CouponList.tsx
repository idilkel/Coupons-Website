import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CouponList.css";
import { BsPlusSquare } from "react-icons/bs";
import CouponToPurchase from "../CouponToPurchase/CouponToPurchase";
import { useNavigate } from "react-router-dom";
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import Button from "react-bootstrap/Button";

function CouponList(): JSX.Element {
  const navigate = useNavigate();
  const customerCoupons = () => {
    navigate("/customers/coupons");
  };
  const goBack = () => {
    navigate(-1);
  };
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  console.log("todoList" + store.getState().couponsReducer.coupons);

  useEffect(() => {
    if (
      store.getState().couponsReducer.coupons.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCoupons()
        .then((res) => {
          notify.success(SccMsg.ALL_COUPONS);
          // Update Component State (Local state)
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(couponsDownloadedAction(res.data));
          console.log("list after dispatch: " + coupons); //why empty after refresh
          console.log("todoList" + store.getState().couponsReducer.coupons);
          console.log(store.getState().couponsReducer.coupons);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);

  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "RESTAURANTS", text: "RESTAURANTS" },
    { value: "ENTERTAINMENT", text: "ENTERTAINMENT" },
    { value: "FASHION", text: "FASHION" },
    { value: "ELECTRONICS", text: "ELECTRONICS" },
  ];

  return (
    <div className="CouponList flex-center-col">
      <h1 className="flex-row-none-wrap-list">Our Coupons</h1>
      <div>
        {/* <button className="button-success" onClick={customerCoupons}>
          My Coupons
        </button>
        <button className="button-success" onClick={() => navigate(-1)}>
          Go back
        </button> */}
        <Button variant="secondary" onClick={customerCoupons}>
          My Coupons
        </Button>{" "}
        <Button variant="secondary" onClick={goBack}>
          Go back
        </Button>{" "}
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

export default CouponList;
