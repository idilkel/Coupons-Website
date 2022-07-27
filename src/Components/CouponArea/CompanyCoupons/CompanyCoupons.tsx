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
import CouponItem from "../CouponItem/CouponItem";
import "./CompanyCoupons.css";
import { BsPlusSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CompanyBootCoupon from "../CompanyBootCoupon/CompanyBootCoupon";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import { CompanyModel } from "../../../Models/Company";

function CompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const navigate = useNavigate();
  const addCoupon = () => {
    navigate("/companies/coupons/add");
  };

  //In-order to assure that the companies store is full

  console.log("todoList" + store.getState().couponsReducer.coupons);
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

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  useEffect(() => {
    if (store.getState().couponsReducer.coupons.length === 0) {
      web
        .getAllCompanyCoupons()
        .then((res) => {
          // notify.success(SccMsg.ALL_COUPONS); //two notifications on update
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

  //Step 8: On-submit:  Send to remote as post request
  const couponByMaxPrice = async (maxPrice: number) => {
    web
      .getAllCustomerCouponsByMaxPrice(maxPrice)
      .then((res) => {
        notify.success(SccMsg.COUPONS_MAX_PRICE);

        // Update App State (Global State)
        store.dispatch(couponsDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

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
        .getAllCompanyCouponsByCategory(cat) //todo
        .then((res) => {
          notify.success(SccMsg.COUPONS_CATEGORY);
          navigate("/companies/coupons/category/" + cat);
          store.dispatch(couponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  };

  const getMaxPrice = async (price: number) => {
    if (price >= 0) {
      web
        .getAllCompanyCouponsByMaxPrice(price) //todo
        .then((res) => {
          notify.success(SccMsg.COUPONS_MAX_PRICE);
          navigate("/companies/coupons/maxPrice/" + price);
          store.dispatch(couponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  };

  //Did change?
  useEffect(() => {
    selected();
  }, [cat]);

  // useEffect(() => {
  //   getMaxPrice();
  // }, [price]);

  return (
    <div className="CompanyCoupons flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      <div className="single-line-only">
        <Button variant="success" onClick={addCoupon} className="m-2">
          Add a Coupon
        </Button>{" "}
        <div>
          <Form.Select
            className="m-2"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option>Select a category</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="RESTAURANTS">RESTAURANTS</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="FASHION">FASHION</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
          </Form.Select>
        </div>
      </div>
      <form onSubmit={handleSubmit(getMaxPrice)} className="flex-center-col">
        <label htmlFor="maxPrice">Maximum Price</label>
        <input
          {...register("maxPrice")}
          type="number"
          placeholder="maxPrice"
          id="maxPrice"
        />
        {/* <span>{errors.maxPrice?.message}</span> */}
        <Button
          variant="secondary"
          type="submit"
          disabled={!isValid}
          className="mt-3"
        >
          Submit
        </Button>
      </form>

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

export default CompanyCoupons;
