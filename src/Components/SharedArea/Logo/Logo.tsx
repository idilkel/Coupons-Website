import "./Logo.css";
import src from "../../../Assets/Images/coupon_logo.svg";

function Logo(): JSX.Element {
  return (
    <div className="Logo">
      <img src={src} alt="logo" />
    </div>
  );
}

export default Logo;
