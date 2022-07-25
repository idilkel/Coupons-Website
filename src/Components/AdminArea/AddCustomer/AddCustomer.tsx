import "./AddCustomer.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { CompanyWoCouponsModel } from "../../../Models/Company";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { companyAddedAction } from "../../../Redux/CompaniesAppState";
import { customerAddedAction } from "../../../Redux/CustomersAppState";
import { CustomerModel } from "../../../Models/Customer";
import Button from "react-bootstrap/Button";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Company password is required"),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Step 8: On-submit:  Send to remote as post request
  const addCustomer = async (customer: CustomerModel) => {
    web
      .addCustomer(customer)
      .then((res) => {
        notify.success(SccMsg.ADD_CUSTOMER);
        navigate("/admin/customers");
        // Update App State (Global State)
        store.dispatch(customerAddedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/customers");
      });
  };

  return (
    <div className="flex-center">
      <div className="AddCustomer">
        <h1>Add a Customer</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(addCustomer)} className="flex-center-col">
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="First Name"
            id="firstName"
          />
          <span>{errors.firstName?.message}</span>

          <label htmlFor="lastName">First Name</label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            id="lastName"
          />
          <span>{errors.lastName?.message}</span>

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
          {/* <button className="button-success" disabled={!isValid}>
            Add
          </button> */}
          <div>
            <Button
              variant="secondary"
              type="submit"
              disabled={!isValid}
              className="margin"
            >
              Add
            </Button>
            <Button variant="secondary" className="margin" onClick={goBack}>
              Go back
            </Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
