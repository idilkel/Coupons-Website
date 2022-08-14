import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import store from "../../../Redux/Store";
import "./OneCompanyBoot.css";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { CouponModel } from "../../../Models/Coupon";

function OneCompanyBoot(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );

  const navigate = useNavigate();
  const params = useParams();
  const companyId = +(params.id || 0);
  const [id, setId] = useState<number>(companyId);
  console.log(companyId);

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
        .getAllCompanies()
        .then((res) => {
          setCompanies(res.data);
          // Update App State (Global State)
          store.dispatch(companiesDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  const [company, setCompany] = useState<CompanyModel>(
    store
      .getState()
      .companiesReducer.companies.filter((c) => c.id === companyId)[0]
  );

  if (company === undefined) {
    navigate("/admin/companies");
  }

  console.log(company);
  console.log("The company name is " + company?.name);

  let userMail;
  if (localStorage.getItem("user") !== null) {
    userMail = JSON.parse(localStorage.getItem("user")).email;
  } else {
    userMail = null;
  }

  return (
    <div className="OneCompanyBoot flex-center-col">
      {company != null && userMail === "admin@admin.com" ? (
        <>
          {" "}
          <Card
            border="secondary"
            style={{ width: "15rem" }}
            className="text-dark bg-warning"
          >
            <Card.Header className="flex-center">
              Name: {company?.name}
            </Card.Header>

            <Card.Body>
              <Card.Text className="single-line-only">
                Company Id: {company?.id}
              </Card.Text>
              <Card.Text className="single-line-only">
                Email: {company?.email}
              </Card.Text>
              <Card.Text className="single-line-only">
                Password: {company?.password}
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

export default OneCompanyBoot;
