import "./Menu.css";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";

function Menu(): JSX.Element {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  return (
    <div className="Menu flex-col-top-center">
      <span className="icon">
        <MenuLink to="home">
          <div className={isRoot ? "active" : ""}>
            <AiOutlineHome size={50} />
          </div>
        </MenuLink>
        {/* <MenuLink to="/home">
          <AiOutlineHome size={50} />
        </MenuLink> */}
      </span>
      <MenuLink to="/coupons">Coupons</MenuLink>
      <MenuLink to="/about">About</MenuLink>
      {/* <Link to="/home">
        <AiOutlineHome size={50} />
      </Link>
      <Link to="/coupons">Coupons</Link>
      <Link to="/about">About</Link> */}
      {/* <a href="#">
        <AiOutlineHome />
      </a>
      <a href="#">Coupons</a>
      <a href="#">About</a> */}
    </div>
  );
}

export default Menu;
