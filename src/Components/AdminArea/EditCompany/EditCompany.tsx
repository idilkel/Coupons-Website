import "./EditCompany.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import { useState } from "react";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";
import { CouponModel } from "../../../Models/Coupon";

function EditCompany(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(companyId);
  console.log("The id to update is: " + id);
  const [company, setCompany] = useState<CompanyModel>(
    store
      .getState()
      .companiesReducer.companies.filter((c) => c.id === companyId)[0]
  );
  const [origin, setOrigin] = useState<CompanyModel>({
    // can't update company - business-logic
    name: company.name,
    email: company.email,
    password: company.password,
    // coupons: company.coupons,
  });

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(4, "At least 4 characters required")
      .max(12, "At most 12 characters required")
      .required("Company password is required"),
  });

  //Step 7: React-hook-form
  // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CompanyModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Where there any changes?
  const { dirtyFields } = useFormState({
    control,
  });

  //Step 8: On-submit:  Send to remote as put request
  const updateCompany = async (company: CompanyModel) => {
    company.id = id;
    web
      .updateCompany(id, company)
      .then((res) => {
        notify.success(SccMsg.UPDATE_COMPANY);
        navigate("/admin/companies");
        // Update App State (Global State)
        store.dispatch(companyUpdatedAction(res.data));
        console.log("YES@@@" + res.data.name);
      })
      .catch((err) => {
        notify.error(ErrMsg.FAIL_EDIT_COMPANIES);
        console.log("NO@@@");
        navigate("/admin/companies");
      });
  };

  return (
    <div className="flex-center">
      <div className="EditCompany">
        <h1>Company Update</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form
          onSubmit={handleSubmit(updateCompany)}
          className="flex-center-col"
        >
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
          <button className="button-success" disabled={!isDirty}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCompany;
