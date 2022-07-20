import "./AddCompany.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { CompanyWoCouponsModel } from "../../../Models/Company";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { companyAddedAction } from "../../../Redux/CompaniesAppState";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Company password is required"),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CompanyWoCouponsModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Step 8: On-submit:  Send to remote as post request
  const addCompany = async (company: CompanyWoCouponsModel) => {
    web
      .addCompany(company)
      .then((res) => {
        notify.success(SccMsg.ADD_COMPANY);
        navigate("/admin/companies");
        // Update App State (Global State)
        store.dispatch(companyAddedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/companies");
      });
  };

  return (
    <div className="flex-center">
      <div className="AddCompany">
        <h1>Add a Company</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(addCompany)} className="flex-center-col">
          {/* Step 10: {...register("title")}     &    {errors.title?.message} */}
          <label htmlFor="name">Company Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="name"
            id="name"
          />
          <span>{errors.name?.message}</span>

          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="email"
            id="email"
          />
          <span>{errors.email?.message}</span>

          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            id="password"
          />
          <span>{errors.password?.message}</span>
          <button className="button-success" disabled={!isValid}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
