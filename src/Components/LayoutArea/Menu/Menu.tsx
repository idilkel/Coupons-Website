import "./Menu.css";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
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
      </span>
      <MenuLink to="/coupons">Coupons</MenuLink>
      <MenuLink to="/about">About</MenuLink>
    </div>
  );
}

export default Menu;
