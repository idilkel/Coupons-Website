import moment from "moment";
import { Card } from "react-bootstrap";
import { CouponModel } from "../../../Models/Coupon";
import "./CustomerCouponBoot.css";

interface CustomerCouponBootProps {
  coupon: CouponModel;
}

function CustomerCouponBoot(props: CustomerCouponBootProps): JSX.Element {
  return (
    <div className="CustomerCouponBoot">
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
          <Card.Text>
            Exp:&nbsp;
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomerCouponBoot;
