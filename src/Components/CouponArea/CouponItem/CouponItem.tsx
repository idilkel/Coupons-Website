import { CouponModel } from "../../../Models/Coupon";
import "./CouponItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import moment from "moment";

interface CouponItemProps {
  coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  return (
    <div className="CouponItem">
      <img src="props.coupon.image" alt={props.coupon.title} />
      <h1>{props.coupon.category}</h1>
      <h2>{props.coupon.title}</h2>
      <p className="date">
        {moment(props.coupon.startDate).format("DD/MM/YYYY")}
        {moment(props.coupon.endDate).format("DD/MM/YYYY")}
      </p>
      <p className="single-line-only">{props.coupon.description}</p>
      <p className="single-line-only">{props.coupon.company?.name}</p>
      <div className="buttons">
        <button>
          <RiFileAddLine />
        </button>
        <button>
          <RiEdit2Line />
        </button>
        <button>
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
}

export default CouponItem;
