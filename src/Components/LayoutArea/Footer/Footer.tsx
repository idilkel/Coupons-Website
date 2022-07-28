import store from "../../../Redux/Store";
import CouponTotal from "../../CouponArea/CouponTotal/CouponTotal";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer flex-around">
      <SocialMedia />
      <p className="flex-center">
        All rights reserved &copy; to Idil Kasuto Kelson
      </p>
      <CouponTotal />
    </div>
  );
}

export default Footer;
