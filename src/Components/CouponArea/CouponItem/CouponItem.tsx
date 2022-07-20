import { CouponModel } from "../../../Models/Coupon";
import "./CouponItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import store from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { useState } from "react";

interface CouponItemProps {
  coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  // const companyId = props.coupon.companyId;
  // const company = store
  //   .getState()
  //   .companiesReducer.companies.filter((c) => c.id === companyId)[0].name;

  const [email, setEmail] = useState(store.getState().authReducer.user?.email);
  return (
    <div className="CouponItem">
      <div className="card">
        <img
          src="https://loremflickr.com/150/150/coupon"
          alt={props.coupon.title}
        />
        <h2>{props.coupon.category}</h2>
        <h3>{props.coupon.companyId}</h3>
        <span className="single-line-only paddedBold">
          {props.coupon.title}
        </span>
        <span className="single-line-only">{props.coupon.description}</span>
        {/* <span className="single-line-only">{props.coupon.companyId}</span> */}

        <div className="flex-around">
          <span className="date">
            {/* {moment(props.coupon.startDate).format("DD/MM/YYYY")} */}
            End Date:
          </span>
          <span className="date">
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </span>
        </div>
        {/* <button>
          <RiFileAddLine />
        </button>
        <button>
          <RiEdit2Line />
        </button>
        <button>
          <RiDeleteBinLine />
        </button> */}

        <div className="flex-around">
          <CustomLink to={`/coupons/update/${props.coupon.id}`}>
            <RiEdit2Line size={30} />
          </CustomLink>
          <CustomLink to={`/coupons/delete/${props.coupon.id}`}>
            <RiDeleteBinLine size={30} />
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export default CouponItem;
