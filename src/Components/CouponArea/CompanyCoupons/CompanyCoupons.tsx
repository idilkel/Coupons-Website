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

function CompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  console.log("todoList" + store.getState().couponsReducer.coupons);

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  useEffect(() => {
    if (
      store.getState().couponsReducer.coupons.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCompanyCoupons()
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
  return (
    <div className="CouponList flex-center-col">
      <h1 className="flex-row-none-wrap-list">{email} Coupons</h1>
      <CustomLink to="add">
        <BsPlusSquare size={35} />
      </CustomLink>
      <div>
        <div className="flex-row-none-wrap-list">
          {coupons.length > 0 ? (
            coupons.map((c) => <CouponItem key={c.id} coupon={c} />)
          ) : (
            <EmptyView msg={"No coupons today"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCoupons;
