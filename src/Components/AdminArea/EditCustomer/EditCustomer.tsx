import "./EditCustomer.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { customerUpdatedAction } from "../../../Redux/CustomersAppState";
import { useState } from "react";

function EditCustomer(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(customerId);
  const [customer, setCustomer] = useState<CustomerModel>(
    store
      .getState()
      .customersReducer.customers.filter((c) => c.id === customerId)[0]
  );
  const [origin, setOrigin] = useState<CustomerModel>({
    // can't update company - business-logic
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    password: customer.password,
  });

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    firstName: yup.string().required("FirstName name is required"),
    lastName: yup.string().required("LastName name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(4, "At least 4 characters required")
      .max(12, "At most 12 characters required")
      .required("Customer password is required"),
  });

  //Step 7: React-hook-form
  // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Where there any changes?
  const { dirtyFields } = useFormState({
    control,
  });

  //Step 8: On-submit:  Send to remote as put request
  const updateCustomer = async (customer: CustomerModel) => {
    web
      .updateCustomer(id, customer)
      .then((res) => {
        notify.success(SccMsg.UPDATE_CUSTOMER);
        navigate("/admin/customers");
        // Update App State (Global State)
        store.dispatch(customerUpdatedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/admin/customers");
      });
  };

  return (
    <div className="flex-center">
      <div className="EditCustomer">
        <h1>Company Update</h1>;
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form
          onSubmit={handleSubmit(updateCustomer)}
          className="flex-center-col"
        >
          <label htmlFor="firstName">Customer First Name</label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="firstName"
            id="firstName"
          />
          <span>{errors.firstName?.message}</span>

          <label htmlFor="lastName">Customer Last Name</label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="lastName"
            id="lastName"
          />
          <span>{errors.lastName?.message}</span>

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
        ;
      </div>
    </div>
  );
}

export default EditCustomer;
