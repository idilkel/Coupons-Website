import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
  const params = useParams();
  const companyId = +(params.id || 0);
  const [id, setId] = useState<number>(companyId);
  const navigate = useNavigate();

  const no = () => {
    navigate("/admin/companies");
  };
  const yes = () => {
    web
      .deleteCompany(id)
      .then((res) => {
        notify.success("Deleted successfully");
        navigate("/admin/companies");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/companies");
      });
  };

  return (
    <div className="flex-center-col">
      <div className="DeleteCoupon flex-center-col-wrap">
        <h1>Delete a Company</h1>
        <h3>Are you sure you want to delete Company#{id}?</h3>
        <div>
          <button className="button-danger" onClick={yes}>
            Yes
          </button>
          <button className="button" onClick={no}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCompany;
