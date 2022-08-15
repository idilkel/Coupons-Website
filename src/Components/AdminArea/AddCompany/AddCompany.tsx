import "./AddCompany.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { companyAddedAction } from "../../../Redux/CompaniesAppState";
import Button from "react-bootstrap/Button";

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
  } = useForm<CompanyModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Step 8: On-submit:  Send to remote as post request
  const addCompany = async (company: CompanyModel) => {
    web
      .addCompany(company)
      .then((res) => {
        notify.success(SccMsg.ADD_COMPANY);
        navigate("/admin/companies");
        // Update App State (Global State)
        store.dispatch(companyAddedAction(res.data));
      })
      .catch((err) => {
        notify.error(err);
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
            placeholder="Name"
            id="name"
          />
          <span>{errors.name?.message}</span>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            id="email"
          />
          <span>{errors.email?.message}</span>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            id="password"
          />
          <span>{errors.password?.message}</span>

          <div>
            <Button
              variant="secondary"
              type="submit"
              disabled={!isValid}
              className="mt-3"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
