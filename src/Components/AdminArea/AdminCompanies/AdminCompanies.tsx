import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./AdminCompanies.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { LoginModel } from "../../../Models/LoginModel";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function AdminCompanies(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );

  console.log(
    "companies1:" + store.getState().companiesReducer.companies.length
  );

  const navigate = useNavigate();
  const admin = () => {
    navigate("/admin");
  };
  const customers = () => {
    navigate("/admin/customers");
  };
  const addCompany = () => {
    navigate("/admin/companies/add");
  };

  //   console.log("companies2" + store.getState().companiesReducer.companies);
  let userMail;
  if (localStorage.getItem("user") !== null) {
    userMail = JSON.parse(localStorage.getItem("user")).email;
  } else {
    userMail = null;
  }
  // console.log("userMail: " + userMail);

  //<= 1 since company app state can be filled with only one company if company was logged first for add coupon to get company mail
  useEffect(() => {
    if (store.getState().companiesReducer.companies.length <= 1) {
      web
        .getAllCompanies()
        .then((res) => {
          // notify.success(SccMsg.ALL_COMPANIES);//Line removed since it gives two alerts on update
          // Update Component State (Local state)
          // console.log("Hey: " + res.data);
          setCompanies(res.data);
          // Update App State (Global State)
          store.dispatch(companiesDownloadedAction(res.data));
          //   console.log("list after dispatch: " + companies); //why empty after refresh
          //   console.log(
          //     "Companies list" + store.getState().companiesReducer.companies
          //   );
          //   console.log(store.getState().companiesReducer.companies);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);
  return (
    <div className="AdminCompanies flex-center-col">
      <h2>Companies List</h2>
      <div className="margin">
        <Button variant="secondary" className="margin" onClick={admin}>
          Admin Homepage
        </Button>{" "}
        <Button variant="secondary" className="margin" onClick={customers}>
          Customers List
        </Button>{" "}
        <Button variant="success" className="margin" onClick={addCompany}>
          Add Company
        </Button>{" "}
      </div>
      {companies.length > 0 && userMail === "admin@admin.com" ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr data-index={index}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.password}</td>
                  <td>
                    <CustomLink to={`/admin/companies/update/${company.id}`}>
                      <RiEdit2Line size={20} />
                    </CustomLink>
                  </td>
                  <td>
                    <CustomLink to={`/admin/companies/delete/${company.id}`}>
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
          <EmptyView msg={"Only Admin can see the list. No Companies"} />
        </h3>
      )}
    </div>
  );
}

export default AdminCompanies;
