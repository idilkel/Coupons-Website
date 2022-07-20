import "./EditCompany.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyWoCouponsModel } from "../../../Models/Company";
import { useState } from "react";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";

function EditCompany(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(companyId);
  const [origin, setOrigin] = useState<CompanyWoCouponsModel>({
    // can't update company - business-logic
    name: "",
    email: "",
    password: "",
  });

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Company password is required"),
  });

  //Step 7: React-hook-form
  // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CompanyWoCouponsModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Where there any changes?
  const { dirtyFields } = useFormState({
    control,
  });

  //Step 8: On-submit:  Send to remote as put request
  const updateCompany = async (company: CompanyWoCouponsModel) => {
    axios
      .put<any>(globals.urls.administrator + "company/" + id, company)
      .then((res) => {
        notify.success("The company has been updated");
        navigate("/companies");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/companies");
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
