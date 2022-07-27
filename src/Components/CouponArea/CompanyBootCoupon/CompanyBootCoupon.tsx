import "./CompanyBootCoupon.css";
import Card from "react-bootstrap/Card";
import { CouponModel } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";

interface CouponItemProps {
  coupon: CouponModel;
}

function CompanyBootCoupon(props: CouponItemProps): JSX.Element {
  const companyId = props.coupon.company.name;
  const navigate = useNavigate();
  return (
    <div className="CompanyBootCoupon">
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
              <CustomLink to={`/coupons/update/${props.coupon.id}`}>
                <RiEdit2Line size={30} />
              </CustomLink>
              <CustomLink to={`/coupons/delete/${props.coupon.id}`}>
                <RiDeleteBinLine size={30} />
              </CustomLink>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CompanyBootCoupon;
