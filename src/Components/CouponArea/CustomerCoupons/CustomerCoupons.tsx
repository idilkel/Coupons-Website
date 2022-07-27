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
// import CouponItem from "../CouponItem/CouponItem";
import "./CustomerCoupons.css";
import { BsPlusSquare } from "react-icons/bs";
import CustomerCouponItem from "../CustomerCouponItem/CustomerCouponItem";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerModel } from "../../../Models/Customer";
import CustomerCouponBoot from "../CustomerCouponBoot/CustomerCouponBoot";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { customerCouponsDownloadedAction } from "../../../Redux/CustomerCouponsAppState";
import Button from "react-bootstrap/Button";

function CustomerCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().customerCouponsReducer.coupons
  );
  const navigate = useNavigate();
  const [cat, setCat]: any = useState("");
  console.log("Selected!!!: " + cat);

  const [price, setPrice]: any = useState("");
  console.log("Price!!!: " + price);

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    maxPrice: yup.number().min(0),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  // console.log("CouponsList" + store.getState().customerCouponsReducer.coupons);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  useEffect(() => {
    if (store.getState().customerCouponsReducer.coupons.length === 0) {
      web
        .getAllCustomerCoupons()
        .then((res) => {
          // notify.success(SccMsg.ALL_COUPONS); //two notifications on change
          // Update Component State (Local state)
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(customerCouponsDownloadedAction(res.data));
          // console.log("list after dispatch: " + coupons);
          // console.log(
          //   "All Customer Coupons" +
          //     store.getState().customerCouponsReducer.coupons
          // );
          // console.log(store.getState().customerCouponsReducer.coupons);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);

  //On-submit Category Selection:  Send to remote as post request
  const selected = async () => {
    if (
      cat === "RESTAURANTS" ||
      cat === "TRAVEL" ||
      cat === "ENTERTAINMENT" ||
      cat === "FASHION" ||
      cat === "ELECTRONICS"
    ) {
      web
        .getAllCustomerCouponsByCategory(cat) //todo
        .then((res) => {
          notify.success(SccMsg.COUPONS_CATEGORY);
          navigate("/customers/coupons/category/" + cat);
          store.dispatch(customerCouponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  };

  //Step 8: On-submit:
  const getMaxPrice = () => {
    navigate("/customers/coupons/maxPrice/" + price);
  };

  //Did change?
  useEffect(() => {
    selected();
  }, [cat]);

  // useEffect(() => {
  //   if (price > 0) {
  //     navigate("/customers/coupons/maxPrice/" + price);
  //   }
  // }, [price]);

  return (
    <div className="CustomerCoupons flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
      <div className="single-line-only">
        {/* <div className="flex-around">
          <label htmlFor="min">0</label>
          <input
            type="range"
            className="form-range range-length"
            id="customRange1"
            min="0"
            max="500"
            step="0.1"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <label htmlFor="max">500</label>
        </div> */}
        <form onSubmit={handleSubmit(getMaxPrice)} className="flex-center-col">
          <label htmlFor="maxPrice">Maximum Price</label>
          <input
            {...register("maxPrice")}
            type="number"
            placeholder="max"
            id="maxPrice"
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* <span>{errors.maxPrice?.message}</span> */}

          <Button
            variant="secondary"
            type="submit"
            disabled={!isValid}
            className="mt-1 btn-sm"
          >
            Submit
          </Button>
        </form>
        <div className="margin-top">
          <Form.Select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>Select a category</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="RESTAURANTS">RESTAURANTS</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="FASHION">FASHION</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
          </Form.Select>
        </div>
      </div>
      <div>
        <div className="flex-row-none-wrap-list">
          {coupons.length > 0 && userType === "CUSTOMER" ? (
            // coupons.map((c) => <CustomerCouponItem key={c.id} coupon={c} />)
            coupons.map((c) => <CustomerCouponBoot key={c.id} coupon={c} />)
          ) : (
            <EmptyView msg={"No coupons today"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerCoupons;
