import "./CouponToPurchaseBoot.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Button from "react-bootstrap/Button";
import store from "../../../Redux/Store";
import {
  couponAddedAction,
  couponsClear,
} from "../../../Redux/CouponsAppState";

interface CouponToPurchaseBootProps {
  coupon: CouponModel;
}

function CouponToPurchaseBoot(props: CouponToPurchaseBootProps): JSX.Element {
  const navigate = useNavigate();

  const purchase = async (coupon: CouponModel) => {
    // coupon.amount -= 1;
    web
      .purchaseCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.PURCHASED);
        store.dispatch(couponsClear());
        navigate("/customers/coupons");
        //Update App State (Global State)
        // store.dispatch(CouponPurchased(res.data));
        // store.dispatch(couponAddedAction(coupon));
      })
      .catch((err) => {
        notify.error(err);
        navigate("/coupons");
      });
  };

  //props.coupon.endDate is given by YYY-MM-DD formate and comparison to new Date was problematic
  //props.coupon.endDate is converted to String and decomposed to Array of numbers by "-" separator
  const year_month_day = (date: Date) => {
    let dateString = date.toString();
    let a = dateString.split("-").map(Number);
    return a;
  };

  const isBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    let todayDay = today.getDate();
    let dateYear = year_month_day(date)[0];
    let dateMonth = year_month_day(date)[1];
    let dateDay = year_month_day(date)[2];
    if (
      dateYear < todayYear ||
      (dateYear === todayYear && dateMonth < todayMonth) ||
      (dateYear === todayYear && dateMonth === todayMonth && dateDay < todayDay)
    ) {
      return true;
    } else {
      return false;
    }
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
            // src="https://loremflickr.com/150/150/coupon"
            src={props.coupon.image}
            alt="Coupon image not loaded"
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
          <Card.Text
            className={
              isBeforeToday(props.coupon.endDate) ? "text-danger" : "text-dark"
            }
          >
            Exp:&nbsp;
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </Card.Text>
          <Card.Footer>
            <div className="flex-around">
              {store.getState().authReducer.user.type === "CUSTOMER" ? (
                <>
                  {props.coupon.amount > 0 ? (
                    <>
                      <Button
                        variant="secondary"
                        className="margin"
                        onClick={() => {
                          purchase(props.coupon);
                        }}
                      >
                        Purchase
                      </Button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button
                        variant="secondary"
                        className="margin"
                        disabled={true}
                        onClick={() => {
                          purchase(props.coupon);
                        }}
                      >
                        Purchase
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              {/* <Button
                variant="secondary"
                className="margin"
                onClick={() => {
                  purchase(props.coupon);
                }}
              >
                Purchase
              </Button>{" "} */}
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CouponToPurchaseBoot;
