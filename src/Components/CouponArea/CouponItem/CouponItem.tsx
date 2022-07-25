import { CouponModel } from "../../../Models/Coupon";
import "./CouponItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import store from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { useState } from "react";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";

interface CouponItemProps {
  coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  const companyId = props.coupon.companyId;
  // const company = store
  //   .getState()
  //   .companiesReducer.companies.filter((c) => c.id === companyId)[0].name;

  // const [email, setEmail] = useState(store.getState().authReducer.user?.email);
  const navigate = useNavigate();

  // const convertIdToName = async () => {
  //   web
  //     .getNameFromId()
  //     .then((res) => {
  //       notify.success(SccMsg.GOT_NAME);
  //       console.log("The company ID is!!!!!" + res.value);
  //     })
  //     .catch((err) => {
  //       notify.error(err.message);
  //     });
  // };
  // const name = convertIdToName();
  // console.log("Hello name!!!:" + { name });
  return (
    <div className="CouponItem">
      <div className="card">
        <img
          src="https://loremflickr.com/150/150/coupon"
          alt={props.coupon.title}
        />
        <h2>{props.coupon.category}</h2>
        <h3>{props.coupon.companyId}</h3>
        {/* <h3>{name}</h3> */}
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
