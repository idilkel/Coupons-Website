import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
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
import CustomerCouponBoot from "../CustomerCouponBoot/CustomerCouponBoot";
import "./CustomerCouponsMaxPriceBoot.css";
import { Button } from "react-bootstrap";
import { UserTypes } from "../../../Models/Enums";

function CustomerCouponsMaxPriceBoot(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const navigate = useNavigate();
  const params = useParams();
  const maxPrice = +params.price || 0;
  const [priceId, setPriceId] = useState<number>(maxPrice);

  console.log("CouponsList" + store.getState().couponsReducer.coupons);
  console.log("priceId$$$" + priceId);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  const [price, setPrice]: any = useState("");

  const customerCoupons = () => {
    // store.dispatch(couponsClear());
    navigate("/customers/coupons");
  };

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  // useEffect(() => {
  //   // if (store.getState().couponsReducer.coupons.length === 0) {
  //   web
  //     .getAllCustomerCouponsByMaxPrice(priceId)
  //     .then((res) => {
  //       // notify.success(SccMsg.ALL_COUPONS);//deleted to avoid two notifications
  //       // Update Component State (Local state)
  //       setCoupons(res.data);
  //       // Update App State (Global State)
  //       store.dispatch(couponsDownloadedAction(res.data)); //it is better that the store has coupons from all categories
  //       console.log("list after dispatch: " + coupons);
  //       console.log(
  //         "All Customer Coupons" + store.getState().couponsReducer.coupons
  //       );
  //       console.log(store.getState().couponsReducer.coupons);
  //     })
  //     .catch((err) => {
  //       notify.error(err);
  //     });
  //   // }
  // }, []);

  useEffect(() => {
    setCoupons(coupons.filter((c) => c.price <= priceId));
  }, []);

  // const params = useParams();
  // const maxPrice = params.maxPrice || ""; // get the starting price from url

  // const [filteredCoupons, setFilteredCoupons] = useState<CouponModel[]>([]);
  // const [price, setPrice] = useState(maxPrice); // hold a filter of coupons

  // useEffect(() => {
  //   let priceToNum = +price; // convert filter to num
  //   setFilteredCoupons(
  //     store
  //       .getState()
  //       .couponsReducer.coupons.filter((coupon) => coupon.price <= priceToNum)
  //   );
  // }, [price]); // effect depends on changes in filter state (which changes according to the input!)

  return (
    <div className="CustomerCouponsMaxPriceBoot flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      <div>
        <Button variant="secondary" onClick={customerCoupons}>
          Customer Coupons
        </Button>{" "}
      </div>
      <div className="flex-row-none-wrap-list">
        {coupons.length > 0 && userType === UserTypes.CUSTOMER ? (
          coupons.map((c) => <CustomerCouponBoot key={c.id} coupon={c} />)
        ) : (
          <EmptyView msg={"No coupons today"} />
        )}
      </div>
    </div>
    // <div className="CustomerCouponsMaxPriceBoot flex-center-col">
    //   <div>
    //     <div>
    //       <input
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         placeholder="maxPrice"
    //       />
    //     </div>

    //     <div>
    //       {filteredCoupons.map((coupon) => (
    //         <CustomerCouponBoot key={coupon.id} coupon={coupon} />
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default CustomerCouponsMaxPriceBoot;
