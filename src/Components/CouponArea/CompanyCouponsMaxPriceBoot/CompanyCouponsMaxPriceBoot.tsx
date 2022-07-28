import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import {
  couponsClear,
  couponsDownloadedAction,
} from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";
import "./CompanyCouponsMaxPriceBoot.css";
import { BsPlusSquare } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import CompanyBootCoupon from "../CompanyBootCoupon/CompanyBootCoupon";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CompanyCouponsMaxPriceBoot(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const navigate = useNavigate();
  const params = useParams();
  const maxPrice = +params.price || 0;
  const [priceId, setPriceId] = useState<number>(maxPrice);
  const [price, setPrice]: any = useState("");

  const companyCoupons = () => {
    store.dispatch(couponsClear());
    navigate("/companies/coupons");
  };

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  useEffect(() => {
    // if (store.getState().couponsReducer.coupons.length === 0) {
    web
      .getAllCompanyCouponsByMaxPrice(priceId)
      .then((res) => {
        // notify.success(SccMsg.ALL_COUPONS); //two notifications on update
        // Update Component State (Local state)
        setCoupons(res.data);
        // Update App State (Global State)
        store.dispatch(couponsDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(err);
      });
    // }
  }, []);

  return (
    <div className="CompanyCouponsMaxPriceBoot flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      <div>
        <Button variant="secondary" onClick={companyCoupons}>
          Company Coupons
        </Button>{" "}
      </div>
      <div className="flex-row-none-wrap-list">
        {coupons.length > 0 && userType === "COMPANY" ? (
          // coupons.map((c) => <CouponItem key={c.id} coupon={c} />)
          coupons.map((c) => <CompanyBootCoupon key={c.id} coupon={c} />)
        ) : (
          <EmptyView msg={"No coupons today"} />
        )}
      </div>
    </div>
  );
}

export default CompanyCouponsMaxPriceBoot;
