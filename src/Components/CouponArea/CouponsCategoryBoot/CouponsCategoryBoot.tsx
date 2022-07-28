import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import "./CouponsCategoryBoot.css";

function CouponsCategoryBoot(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const catName = params.cat || null;
  const [catId, setCatId] = useState<string>(catName);

  const customerCoupons = () => {
    navigate("/customers/coupons");
  };
  const allCoupons = () => {
    store.dispatch(couponsClear());
    navigate("/coupons");
  };
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const [cat, setCat]: any = useState("");

  console.log("todoList" + store.getState().couponsReducer.coupons);

  useEffect(() => {
    if (
      store.getState().couponsReducer.coupons.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCouponsByCategory(catId)
        .then((res) => {
          //   notify.success(SccMsg.ALL_COUPONS);//two notifications on going back from something else
          // Update Component State (Local state)
          setCoupons(res.data);
          // Update App State (Global State)
          store.dispatch(couponsDownloadedAction(res.data));
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
        <Button variant="secondary" onClick={allCoupons}>
          All Coupons
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

export default CouponsCategoryBoot;
