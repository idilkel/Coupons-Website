import { useNavigate } from "react-router-dom";
import "./AdminHomepage.css";

function AdminHomepage(): JSX.Element {
  const navigate = useNavigate();
  const companies = () => {
    navigate("/admin/companies");
  };
  const customers = () => {
    navigate("/admin/customers");
  };
  return (
    <div className="AdminHomepage flex-center-col">
      <h2>Hello Admin</h2>
      <div>
        <button className="button-success" onClick={companies}>
          Companies List
        </button>
        <button className="button-success" onClick={customers}>
          Customers List
        </button>
        <button className="button-success" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
}

export default AdminHomepage;
