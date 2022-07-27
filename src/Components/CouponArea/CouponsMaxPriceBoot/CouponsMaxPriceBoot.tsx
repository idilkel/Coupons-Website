import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponToPurchaseBoot from "../CouponToPurchaseBoot/CouponToPurchaseBoot";
import "./CouponsMaxPriceBoot.css";

function CouponsMaxPriceBoot(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const priceId = +(params.price || 0);
  const [price, setPrice] = useState<number>(priceId);

  const customerCoupons = () => {
    navigate("/customers/coupons");
  };
  const goBack = () => {
    navigate(-1);
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
        .getAllCompanyCouponsByMaxPrice(priceId)
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
        <Button variant="secondary" onClick={goBack}>
          Go back
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

export default CouponsMaxPriceBoot;