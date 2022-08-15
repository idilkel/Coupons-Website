import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCustomer.css";
import Button from "react-bootstrap/Button";
import store from "../../../Redux/Store";
import { customerDeletedAction } from "../../../Redux/CustomersAppState";
import { UserTypes } from "../../../Models/Enums";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";

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
        notify.success(SccMsg.DELETE_CUSTOMER);
        store.dispatch(customerDeletedAction(id));
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(err);
        navigate("/admin/customers");
      });
  };

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  return (
    <div className="flex-center-col">
      {userType === UserTypes.ADMINISTRATOR ? (
        <>
          {" "}
          <div className="DeleteCustomer flex-center-col-wrap">
            <h1>Delete a Customer</h1>
            <h3>Are you sure you want to delete Customer#{id}?</h3>
            <div>
              <Button variant="danger" className="margin" onClick={yes}>
                Yes
              </Button>{" "}
              <Button variant="success" className="margin" onClick={no}>
                No
              </Button>{" "}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <EmptyView msg={"This is an Admin page only"} />{" "}
        </>
      )}
    </div>
  );
}

export default DeleteCustomer;
