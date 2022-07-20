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

  console.log("companies2" + store.getState().companiesReducer.companies);

  useEffect(() => {
    if (
      store.getState().companiesReducer.companies.length === 0 ||
      store.subscribe
    ) {
      web
        .getAllCompanies()
        .then((res) => {
          notify.success(SccMsg.ALL_COMPANIES);
          // Update Component State (Local state)
          console.log("Hey: " + res.data);
          setCompanies(res.data);
          // Update App State (Global State)
          store.dispatch(companiesDownloadedAction(res.data));
          console.log("list after dispatch: " + companies); //why empty after refresh
          console.log(
            "Companies list" + store.getState().companiesReducer.companies
          );
          console.log(store.getState().companiesReducer.companies);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);
  return (
    <div className="AdminCompanies flex-center-col">
      <h2>Companies List</h2>
      <div>
        <button className="button-success" onClick={admin}>
          Admin Homepage
        </button>
        <button className="button-success" onClick={customers}>
          Customers List
        </button>
        <button className="button-green" onClick={addCompany}>
          Add Company
        </button>
      </div>
      {companies.length > 0 ? (
        <div>
          <table className="flex-center-top">
            <tbody>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              {companies.map((company, index) => (
                <tr data-index={index}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.password}</td>
                  <td>
                    <CustomLink to={`/admin/companies/update/${company.id}`}>
                      <RiEdit2Line size={30} />
                    </CustomLink>
                  </td>
                  <td>
                    <CustomLink to={`/admin/companies/delete/${company.id}`}>
                      <RiDeleteBinLine size={30} />
                    </CustomLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No companies left</h3>
      )}
    </div>
  );
}

export default AdminCompanies;
