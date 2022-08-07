import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./MenuLink.css";

interface MenuLinkProps {
  to: string;
  children: any;
  onClick?: any;
}

function MenuLink(props: MenuLinkProps): JSX.Element {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div className="MenuLink">
      <Link className={match ? "MenuLink active" : "MenuLink"} to={props.to}>
        {props.children}
      </Link>
    </div>
  );
}

export default MenuLink;
