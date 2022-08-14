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
import { BsCheckLg, BsPlusSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyModel } from "../../../Models/Company";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import { NumberModel } from "../../../Models/NumberModel";
import { UserTypes } from "../../../Models/Enums";

function CouponList(): JSX.Element {
  const navigate = useNavigate();
  const customerCoupons = () => {
    store.dispatch(couponsClear());
    navigate("/customers/coupons");
  };
  const companyCoupons = () => {
    store.dispatch(couponsClear());
    console.log(
      "Coupons cleared??? Current length after clearing " +
        store.getState().couponsReducer.coupons.length //is indeed 0
    );
    navigate("/companies/coupons");
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

  const [price, setPrice] = useState<number>();
  console.log("Price!!!: " + price);

  // console.log("todoList" + store.getState().couponsReducer.coupons);

  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );

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
  const getMaxPrice = (price: NumberModel) => {
    navigate("/coupons/maxPrice/" + price.maxPrice);
  };

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  useEffect(() => {
    if (
      (isLoggedIn && store.getState().couponsReducer.coupons.length === 0) ||
      userType === UserTypes.CUSTOMER
    ) {
      web
        .getAllCoupons()
        .then((res) => {
          // notify.success(SccMsg.ALL_COUPONS);// deleted to avoid two notifications on purchase
          // Update Component State (Local state)
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(couponsDownloadedAction(res.data)); //The couponAppState is updated to the number of customer
          console.log("%2%");
          console.log("list after dispatch: " + coupons); //why empty after refresh
          console.log("todoList" + store.getState().couponsReducer.coupons);
          console.log(store.getState().couponsReducer.coupons);
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  return (
    <div className="CouponList flex-center-col">
      {!isLoggedIn ? (
        <>
          {" "}
          <EmptyView msg={"Please Login to enjoy our coupons"} />{" "}
        </>
      ) : (
        <>
          {isLoggedIn &&
          store.getState().authReducer.user.type === "COMPANY" ? (
            <>
              <h1 className="flex-row-none-wrap-list">Company Coupons</h1>
              <h3 className="flex-row-none-wrap-list">
                The add, update and delete please press "Company Coupons" button
              </h3>
              <div>
                <Button variant="secondary" onClick={companyCoupons}>
                  Company Coupons
                </Button>{" "}
              </div>
            </>
          ) : (
            <>
              {" "}
              <h1 className="flex-row-none-wrap-list">Our Coupons</h1>
            </>
          )}

          {isLoggedIn &&
          store.getState().authReducer.user.type === UserTypes.CUSTOMER ? (
            <>
              <div>
                {" "}
                <Button variant="secondary" onClick={customerCoupons}>
                  Customer Coupons
                </Button>{" "}
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="single-line-only">
            <Button variant="secondary" onClick={goTravel} className="m-2">
              TRAVEL
            </Button>{" "}
            <Button variant="secondary" onClick={goRestaurants} className="m-2">
              RESTAURANTS
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={goEntertainment}
              className="m-2"
            >
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
                  onChange={(args) =>
                    setPrice(+(args.target as HTMLInputElement).value)
                  }
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
                coupons.map((c) => (
                  <CouponToPurchaseBoot key={c.id} coupon={c} />
                ))
              ) : (
                <EmptyView msg={"No coupons today"} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CouponList;
