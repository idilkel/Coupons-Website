import { useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AdminHomepage.css";
import Button from "react-bootstrap/Button";

function AdminHomepage(): JSX.Element {
  const navigate = useNavigate();
  const companies = () => {
    navigate("/admin/companies");
  };
  const customers = () => {
    navigate("/admin/customers");
  };
  const goBack = () => {
    navigate(-1);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );
  const [email, setEmail] = useState(store.getState().authReducer.user?.email);
  return (
    <div className="AdminHomepage flex-center-col">
      {email === "admin@admin.com" ? (
        <h2>Hello Admin</h2>
      ) : (
        <h2>Sorry! Only admin can use this page</h2>
      )}
      <div>
        {/* <button className="button-success" onClick={companies}>
          Companies List
        </button>
        <button className="button-success" onClick={customers}>
          Customers List
        </button>
        <button className="button-success" onClick={goBack}>
          Go back
        </button> */}
        <Button variant="secondary" onClick={companies}>
          Companies List
        </Button>{" "}
        <Button variant="secondary" onClick={customers}>
          Customers List
        </Button>{" "}
        <Button variant="secondary" onClick={goBack}>
          Go back
        </Button>{" "}
      </div>
    </div>
  );
}

export default AdminHomepage;
