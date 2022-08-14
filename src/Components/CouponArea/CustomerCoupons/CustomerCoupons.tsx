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
import "./CustomerCoupons.css";
import { BsPlusSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerModel } from "../../../Models/Customer";
import CustomerCouponBoot from "../CustomerCouponBoot/CustomerCouponBoot";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { NumberModel } from "../../../Models/NumberModel";
import { Category, UserTypes } from "../../../Models/Enums";

function CustomerCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const navigate = useNavigate();
  const [cat, setCat]: any = useState("");
  console.log("Selected!!!: " + cat);

  const [price, setPrice] = useState<number>();

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    maxPrice: yup.number().min(0),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<NumberModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  // console.log("CouponsList" + store.getState().couponsReducer.coupons);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  let userType: string = null;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  }

  // console.log("userType!!!: " + userType);

  useEffect(() => {
    if (
      userType !== null &&
      store.getState().couponsReducer.coupons.length === 0
    ) {
      web
        .getAllCustomerCoupons()
        .then((res) => {
          // notify.success(SccMsg.ALL_COUPONS); //two notifications on change
          // Update Component State (Local state)
          console.log("res data<><><>" + res.data);
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(couponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  //On-submit Category Selection:  Send to remote as post request
  const selected = async () => {
    if (
      cat === Category.RESTAURANTS ||
      cat === Category.TRAVEL ||
      cat === Category.ENTERTAINMENT ||
      cat === Category.FASHION ||
      cat === Category.ELECTRONICS
    ) {
      console.log("SELECTED***");
      console.log(store.getState().couponsReducer.coupons.length);
      navigate("/customers/coupons/category/" + cat);
    }

    // {
    //   web
    //     .getAllCustomerCouponsByCategory(cat) //todo
    //     .then((res) => {
    //       notify.success(SccMsg.COUPONS_CATEGORY);
    //       navigate("/customers/coupons/category/" + cat);
    //       store.dispatch(couponsDownloadedAction(res.data));
    //     })
    //     .catch((err) => {
    //       notify.error(err);
    //     });
    // }
  };

  //Step 8: On-submit:
  const getMaxPrice = (price: NumberModel) => {
    navigate("/customers/coupons/maxPrice/" + price.maxPrice);
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
      {userType === null ||
      store.getState().authReducer.user.type !== "CUSTOMER" ? (
        <>
          <EmptyView msg={"Sorry! This is a customer page only!"} />
        </>
      ) : (
        <>
          <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
          {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
          <div className="single-line-only">
            <form
              onSubmit={handleSubmit(getMaxPrice)}
              className="flex-center-col"
            >
              <label htmlFor="maxPrice">Maximum Price</label>
              <input
                {...register("maxPrice")}
                type="number"
                placeholder="max"
                id="maxPrice"
                onChange={(args) =>
                  setPrice(+(args.target as HTMLInputElement).value)
                }
              />
              <span>{errors?.maxPrice?.message}</span>

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
                <option value={Category.TRAVEL}>TRAVEL</option>
                <option value={Category.RESTAURANTS}>RESTAURANTS</option>
                <option value={Category.ENTERTAINMENT}>ENTERTAINMENT</option>
                <option value={Category.FASHION}>FASHION</option>
                <option value={Category.ELECTRONICS}>ELECTRONICS</option>
              </Form.Select>
            </div>
          </div>
          <div>
            <div className="flex-row-none-wrap-list">
              {coupons.length > 0 && userType === UserTypes.CUSTOMER ? (
                coupons.map((c) => <CustomerCouponBoot key={c.id} coupon={c} />)
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

export default CustomerCoupons;
