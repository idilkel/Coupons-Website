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
import "./CustomerCouponsCategoryBoot.css";
import { Button } from "react-bootstrap";

function CustomerCouponsCategoryBoot(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const navigate = useNavigate();
  const params = useParams();
  const catName = params.cat || null;
  const [catId, setCatId] = useState<string>(catName);
  const customerCoupons = () => {
    navigate("/customers/coupons");
  };
  const goBack = () => {
    navigate(-1);
  };

  //   console.log("CouponsList" + store.getState().couponsReducer.coupons);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  const [cat, setCat]: any = useState("");

  let userType;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }
  // console.log("userType!!!: " + userType);

  useEffect(() => {
    if (
      store.getState().couponsReducer.coupons.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCustomerCouponsByCategory(catId)
        .then((res) => {
          notify.success(SccMsg.ALL_COUPONS);
          // Update Component State (Local state)
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(couponsDownloadedAction(res.data));
          console.log("list after dispatch: " + coupons);
          console.log(
            "All Customer Coupons" + store.getState().couponsReducer.coupons
          );
          console.log(store.getState().couponsReducer.coupons);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);

  return (
    <div className="CustomerCoupons flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
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

export default CustomerCouponsCategoryBoot;
