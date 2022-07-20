import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./AdminCustomers.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";

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

  console.log("customers2" + store.getState().customersReducer.customers);

  useEffect(() => {
    if (
      store.getState().customersReducer.customers.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCustomers()
        .then((res) => {
          notify.success(SccMsg.ALL_COMPANIES);
          // Update Component State (Local state)
          console.log("Hey: " + res.data);
          setCustomers(res.data);
          // Update App State (Global State)
          store.dispatch(customersDownloadedAction(res.data));
          console.log("list after dispatch: " + customers); //why empty after refresh
          console.log(
            "Companies list" + store.getState().customersReducer.customers
          );
          console.log(store.getState().customersReducer.customers);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);
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
        <button className="button-green" onClick={addCustomer}>
          Add Customer
        </button>
      </div>
      {customers.length > 0 ? (
        <div>
          <table className="flex-center-top">
            <tbody>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              {customers.map((customer, index) => (
                <tr data-index={index}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                  <td>
                    <CustomLink to={`/admin/customers/update/${customer.id}`}>
                      <RiEdit2Line size={30} />
                    </CustomLink>
                  </td>
                  <td>
                    <CustomLink to={`/admin/customers/delete/${customer.id}`}>
                      <RiDeleteBinLine size={30} />
                    </CustomLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No customers left</h3>
      )}
    </div>
  );
}

export default AdminCustomers;
