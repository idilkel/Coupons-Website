import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponItem from "../CouponItem/CouponItem";
import "./CouponList.css";

function CouponList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    axios
      .get<CouponModel[]>(globals.urls.coupons + "/admin/coupons")
      .then((res) => {
        notify.success("Successfully loaded tasks");
        setCoupons(res.data);
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);
  return (
    <div className="CouponList">
      <h2 className="flex-row-none-wrap-list">Our Coupons</h2>
      <div>
        <div className="flex-row-none-wrap-list">
          {coupons.length > 0 ? (
            coupons.map((c) => <CouponItem key={c.id} coupon={c} />)
          ) : (
            <EmptyView msg={"Something went wrong"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponList;
