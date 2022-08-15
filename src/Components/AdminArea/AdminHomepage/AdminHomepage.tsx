import { useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AdminHomepage.css";
import Button from "react-bootstrap/Button";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { UserTypes } from "../../../Models/Enums";

function AdminHomepage(): JSX.Element {
  const navigate = useNavigate();
  const companies = () => {
    navigate("/admin/companies");
  };
  const customers = () => {
    navigate("/admin/customers");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );
  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  let userType: string = null;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  }

  return (
    <div className="AdminHomepage flex-center-col">
      {userType === null ||
      store.getState().authReducer.user.type !== UserTypes.ADMINISTRATOR ? (
        <>
          <EmptyView msg={"Sorry! This is an admin page only!"} />
        </>
      ) : (
        <>
          <div>
            <Button variant="secondary" onClick={companies}>
              Companies List
            </Button>{" "}
            <Button variant="secondary" onClick={customers}>
              Customers List
            </Button>{" "}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHomepage;
