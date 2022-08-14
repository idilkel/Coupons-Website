import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import { CustomerModel } from "../../../Models/Customer";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./OneCustomerBoot.css";

function OneCustomerBoot(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().companiesReducer.companies
  );

  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id || 0);
  const [id, setId] = useState<number>(customerId);
  console.log(customerId);

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  useEffect(() => {
    if (
      userType !== null &&
      store.getState().couponsReducer.coupons.length === 0
    ) {
      web
        .getAllCustomers()
        .then((res) => {
          setCustomers(res.data);
          // Update App State (Global State)
          store.dispatch(customersDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  const [customer, setCustomer] = useState<CustomerModel>(
    store
      .getState()
      .customersReducer.customers.filter((c) => c.id === customerId)[0]
  );

  if (customer === undefined) {
    navigate("/admin/customers");
  }

  let userMail;
  if (localStorage.getItem("user") !== null) {
    userMail = JSON.parse(localStorage.getItem("user")).email;
  } else {
    userMail = null;
  }
  return (
    <div className="OneCustomerBoot flex-center-col">
      {customer != null && userMail === "admin@admin.com" ? (
        <>
          {" "}
          <Card
            border="secondary"
            style={{ width: "15rem" }}
            className="text-dark bg-warning"
          >
            <Card.Header className="flex-center">
              Name: {customer?.firstName} {customer?.lastName}
            </Card.Header>

            <Card.Body>
              <Card.Text className="single-line-only">
                Customer Id: {customer?.id}
              </Card.Text>
              <Card.Text className="single-line-only">
                Email: {customer?.email}
              </Card.Text>
              <Card.Text className="single-line-only">
                Password: {customer?.password}
              </Card.Text>
            </Card.Body>
          </Card>{" "}
        </>
      ) : (
        <>
          {" "}
          <h3>
            <EmptyView msg={"Only Admin can see the list. No Companies"} />
          </h3>{" "}
        </>
      )}
    </div>
  );
}

export default OneCustomerBoot;
