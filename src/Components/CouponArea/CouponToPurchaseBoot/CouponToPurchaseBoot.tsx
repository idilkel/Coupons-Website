import "./CouponToPurchaseBoot.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Button from "react-bootstrap/Button";
import store from "../../../Redux/Store";
import { customerCouponPurchasedAction } from "../../../Redux/CustomerCouponsAppState";

interface CouponToPurchaseBootProps {
  coupon: CouponModel;
}

function CouponToPurchaseBoot(props: CouponToPurchaseBootProps): JSX.Element {
  const navigate = useNavigate();

  const purchase = async (coupon: CouponModel) => {
    web
      .purchaseCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.PURCHASED);
        store.dispatch(customerCouponPurchasedAction(coupon));
        navigate("/customers/coupons");
        //Update App State (Global State)
        // store.dispatch(CouponPurchased(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/coupons");
      });
  };

  return (
    <div className="CouponToPurchaseBoot">
      <Card
        border="secondary"
        style={{ width: "15rem" }}
        className="text-dark bg-warning"
      >
        <Card.Header className="flex-center">
          {props.coupon.category}
        </Card.Header>
        <Card.Header className="flex-center">
          {props.coupon.company.name}
        </Card.Header>
        <Card.Body>
          <Card.Img
            variant="top"
            src="https://loremflickr.com/150/150/coupon"
            alt="{props.coupon.title}+ image"
          />
          <Card.Text className="single-line-only">
            {props.coupon.title}
          </Card.Text>
          <Card.Text className="single-line-only">
            {props.coupon.description}
          </Card.Text>
          <Card.Text>
            Price:&nbsp;
            {props.coupon.price}&nbsp;ILS
          </Card.Text>
          <Card.Text
            className={props.coupon.amount === 0 ? "text-danger" : "text-dark"}
          >
            Coupons Left: {props.coupon.amount}
          </Card.Text>
          <Card.Text>
            Exp:&nbsp;
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </Card.Text>
          <Card.Footer>
            <div className="flex-around">
              {/* <button
                className="button"
                onClick={() => {
                  purchase(props.coupon);
                }}
              >
                Purchase
              </button> */}
              <Button
                variant="secondary"
                className="margin"
                onClick={() => {
                  purchase(props.coupon);
                }}
              >
                Purchase
              </Button>{" "}
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CouponToPurchaseBoot;
