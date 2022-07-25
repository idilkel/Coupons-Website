import "./CouponToPurchase.css";
import { CouponModel } from "../../../Models/Coupon";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import store from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { useState } from "react";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";

interface CouponItemProps {
  coupon: CouponModel;
}

function CouponToPurchase(props: CouponItemProps): JSX.Element {
  // const [email, setEmail] = useState(store.getState().authReducer.user?.email);
  const navigate = useNavigate();

  //State with preliminary start point
  const [id, setId] = useState<number>(props.coupon.id);

  const purchase = async (coupon: CouponModel) => {
    web
      .purchaseCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.PURCHASED);
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
    <div className="CouponToPurchase">
      <div className="card">
        <img
          src="https://loremflickr.com/150/150/coupon"
          alt={props.coupon.title}
        />
        <h5>{props.coupon.category}</h5>
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

        <div className="flex-around">
          {/* <CustomLink to={`/coupons/update/${props.coupon.id}`}>
            <RiEdit2Line size={30} />
          </CustomLink>
          <CustomLink to={`/coupons/delete/${props.coupon.id}`}>
            <RiDeleteBinLine size={30} />
          </CustomLink> */}

          <button
            className="button"
            onClick={() => {
              purchase(props.coupon);
            }}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponToPurchase;
