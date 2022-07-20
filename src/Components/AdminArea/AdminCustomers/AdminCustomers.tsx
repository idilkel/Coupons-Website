import { useNavigate } from "react-router-dom";
import "./AdminCustomers.css";

function AdminCustomers(): JSX.Element {
  const navigate = useNavigate();
  const admin = () => {
    navigate("/admin");
  };
  const companies = () => {
    navigate("/admin/companies");
  };
  return (
    <div className="AdminCustomers flex-center-col">
      <h2>Customers List</h2>
      <div>
        <button className="button-success" onClick={admin}>
          Admin Homepage
        </button>
        <button className="button-success" onClick={companies}>
          Companies List
        </button>
      </div>
    </div>
  );
}

export default AdminCustomers;
