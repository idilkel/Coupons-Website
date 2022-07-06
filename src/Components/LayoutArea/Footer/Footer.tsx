import Circle from "../../SharedArea/Circle/Circle";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer flex-around">
      <SocialMedia />
      <p>All rights reserved &copy; to Idil Kasuto Kelson</p>
      <Circle />
    </div>
  );
}

export default Footer;
