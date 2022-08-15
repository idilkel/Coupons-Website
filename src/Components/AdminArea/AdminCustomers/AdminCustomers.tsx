import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./AdminCustomers.css";
import {
  RiArrowDownCircleLine,
  RiDeleteBinLine,
  RiEdit2Line,
  RiFileAddLine,
} from "react-icons/ri";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { UserTypes } from "../../../Models/Enums";

function AdminCustomers(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customersReducer.customers
  );

  console.log(
    "customers:" + store.getState().customersReducer.customers.length
  );

  const navigate = useNavigate();
  const admin = () => {
    navigate("/admin");
  };
  const companies = () => {
    navigate("/admin/companies");
  };
  const addCustomer = () => {
    navigate("/admin/customers/add");
  };

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  useEffect(() => {
    if (
      store.getState().customersReducer.customers.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCustomers()
        .then((res) => {
          // notify.success(SccMsg.ALL_COMPANIES);//Line removed since it gives two alerts on update
          // Update Component State (Local state)

          setCustomers(res.data);
          // Update App State (Global State)
          store.dispatch(customersDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);
  return (
    <div className="AdminCustomers flex-center-col">
      <h2>Customers List</h2>
      <div className="margin">
        <Button variant="secondary" className="margin" onClick={admin}>
          Admin Homepage
        </Button>{" "}
        <Button variant="secondary" className="margin" onClick={companies}>
          Companies List
        </Button>{" "}
        <Button variant="success" className="margin" onClick={addCustomer}>
          Add Customer
        </Button>{" "}
      </div>
      {customers.length > 0 && userType === UserTypes.ADMINISTRATOR ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, index) => (
                <tr data-index={index}>
                  <td>
                    <CustomLink to={`/admin/customers/${customer.id}`}>
                      {customer.id}
                    </CustomLink>
                  </td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                  <td>
                    <CustomLink to={`/admin/customers/update/${customer.id}`}>
                      <RiEdit2Line size={20} />
                    </CustomLink>
                  </td>
                  <td>
                    <CustomLink to={`/admin/customers/delete/${customer.id}`}>
                      <RiDeleteBinLine size={20} />
                    </CustomLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3>
          <EmptyView msg={"Only Admin can see the list. No customers"} />
        </h3>
      )}
    </div>
  );
}

export default AdminCustomers;
