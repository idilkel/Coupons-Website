import { CouponModel } from "../../../Models/Coupon";
import "./CustomerCouponItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import store from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { useState } from "react";

interface CouponItemProps {
  coupon: CouponModel;
}

function CustomerCouponItem(props: CouponItemProps): JSX.Element {
  // const companyId = props.coupon.companyId;
  // const company = store
  //   .getState()
  //   .companiesReducer.companies.filter((c) => c.id === companyId)[0].name;

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  return (
    <div className="CustomerCouponItem">
      <div className="card">
        <img
          src="https://loremflickr.com/150/150/coupon"
          alt={props.coupon.title}
        />
        <h2>{props.coupon.category}</h2>
        <h3>{props.coupon.company.name}</h3>
        <span className="single-line-only paddedBold">
          {props.coupon.title}
        </span>
        <span className="single-line-only">{props.coupon.description}</span>
        <span
          className={
            props.coupon.amount === 0
              ? "single-line-only warning"
              : "single-line-only"
          }
        >
          Coupons Left: {props.coupon.amount}
        </span>

        <div className="flex-around">
          <span className="date">
            {/* {moment(props.coupon.startDate).format("DD/MM/YYYY")} */}
            End Date:
          </span>
          <span className="date">
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
}
export default CustomerCouponItem;
