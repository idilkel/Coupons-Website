import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import AddCompany from "../../CouponArea/AddCompany/AddCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList from "../../CouponArea/CouponList/CouponList";
import DeleteCompany from "../../CouponArea/DeleteCompany/DeleteCompany";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCompany from "../../CouponArea/EditCompany/EditCompany";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import Login from "../../AuthArea/Login/Login";
import About from "../../PagesArea/About/About";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import Logout from "../../AuthArea/Logout/Logout";
import CustomerCoupons from "../../CouponArea/CustomerCoupons/CustomerCoupons";
import CompanyCoupons from "../../CouponArea/CompanyCoupons/CompanyCoupons";
import AdminHomepage from "../../AdminArea/AdminHomepage/AdminHomepage";
import AdminCompanies from "../../AdminArea/AdminCompanies/AdminCompanies";
import AdminCustomers from "../../AdminArea/AdminCustomers/AdminCustomers";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/coupons" element={<CouponList />} />
        <Route path="/companies/coupons" element={<CompanyCoupons />} />
        <Route path="/customers/coupons" element={<CustomerCoupons />} />
        <Route path="/coupons/add" element={<AddCoupon />} />
        <Route path="/coupons/delete/:id" element={<DeleteCoupon />} />
        <Route path="/coupons/update/:id" element={<EditCoupon />} />
        <Route path="/admin/companies/add" element={<AddCompany />} />
        <Route path="/admin/companies/delete/:id" element={<DeleteCompany />} />
        <Route path="/admin/companies/update/:id" element={<EditCompany />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
