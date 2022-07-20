import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
  const params = useParams();
  const customerId = +(params.id || 0);
  const [id, setId] = useState<number>(customerId);
  const navigate = useNavigate();

  const no = () => {
    navigate("/admin/customers");
  };
  const yes = () => {
    web
      .deleteCustomer(id)
      .then((res) => {
        notify.success("Deleted successfully");
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/customers");
      });
  };

  return (
    <div className="flex-center-col">
      <div className="DeleteCustomer flex-center-col-wrap">
        <h1>Delete a Customer</h1>
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

export default DeleteCustomer;
