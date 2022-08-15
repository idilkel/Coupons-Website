import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCompany.css";
import Button from "react-bootstrap/Button";
import store from "../../../Redux/Store";
import { companyDeletedAction } from "../../../Redux/CompaniesAppState";
import { UserTypes } from "../../../Models/Enums";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";

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
        notify.success(SccMsg.DELETE_COMPANY);
        store.dispatch(companyDeletedAction(id));
        navigate("/admin/companies");
      })
      .catch((err) => {
        notify.error(err);
        navigate("/admin/companies");
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
          <div className="DeleteCompany flex-center-col-wrap">
            <h1>Delete a Company</h1>
            <h3>Are you sure you want to delete Company#{id}?</h3>
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
          <EmptyView msg={"This is an Admin page only"} />
        </>
      )}
    </div>
  );
}

export default DeleteCompany;
