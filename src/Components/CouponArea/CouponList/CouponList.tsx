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
import "./CouponList.css";
import { BsPlusSquare } from "react-icons/bs";
import CouponToPurchase from "../CouponToPurchase/CouponToPurchase";
import { useNavigate } from "react-router-dom";
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyModel } from "../../../Models/Company";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";

function CouponList(): JSX.Element {
  const navigate = useNavigate();
  const customerCoupons = () => {
    navigate("/customers/coupons");
  };

  const goTravel = () => {
    navigate("/coupons/category/TRAVEL");
  };

  const goRestaurants = () => {
    navigate("/coupons/category/RESTAURANTS");
  };

  const goEntertainment = () => {
    navigate("/coupons/category/ENTERTAINMENT");
  };

  const goFashion = () => {
    navigate("/coupons/category/FASHION");
  };

  const goElectronics = () => {
    navigate("/coupons/category/ELECTRONICS");
  };

  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const [price, setPrice]: any = useState("");
  console.log("Price!!!: " + price);

  // console.log("todoList" + store.getState().couponsReducer.coupons);

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

  //Step 8: On-submit:
  const getMaxPrice = () => {
    navigate("/coupons/maxPrice/" + price);
  };

  useEffect(() => {
    if (store.getState().couponsReducer.coupons.length === 0) {
      web
        .getAllCoupons()
        .then((res) => {
          // notify.success(SccMsg.ALL_COUPONS);// deleted to avoid two notifications on purchase
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
        {/* <Button variant="secondary" onClick={allCoupons}>
          All Coupons
        </Button>{" "} */}
      </div>
      <div className="single-line-only">
        <Button variant="secondary" onClick={goTravel} className="m-2">
          TRAVEL
        </Button>{" "}
        <Button variant="secondary" onClick={goRestaurants} className="m-2">
          RESTAURANTS
        </Button>{" "}
        <Button variant="secondary" onClick={goEntertainment} className="m-2">
          ENTERTAINMENT
        </Button>{" "}
        <Button variant="secondary" onClick={goFashion} className="m-2">
          FASHION
        </Button>{" "}
        <Button variant="secondary" onClick={goElectronics} className="m-2">
          ELECTRONICS
        </Button>{" "}
        <span>
          <form
            onSubmit={handleSubmit(getMaxPrice)}
            className="flex-center-col"
          >
            {/* Step 10: {...register("title")}     &    {errors.title?.message} */}
            <label htmlFor="maxPrice">Max Price</label>
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
        </span>
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
