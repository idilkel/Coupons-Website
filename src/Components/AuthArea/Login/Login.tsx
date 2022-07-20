import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LoginModel } from "../../../Models/LoginModel";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/AuthAppState";
import { log } from "console";

function Login(): JSX.Element {
  const navigate = useNavigate();

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    type: yup.string().required("Client Type is required"),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

  //Step 8: On-submit:  Send to remote as post request
  const loginUser = async (model: LoginModel) => {
    const credentials = new LoginModel();
    credentials.email = model.email;
    credentials.password = model.password;
    credentials.type = model.type;

    console.log("going to send to remote server..." + credentials);

    web
      .login(credentials)
      .then((res) => {
        console.log("token!!!" + res.data.token);
        notify.success(SccMsg.LOGIN);
        store.dispatch(loginAction(res.data));
        if (credentials.type === "COMPANY") {
          navigate("/companies/coupons");
        } else if (credentials.type === "CUSTOMER") {
          navigate("/customers/coupons");
        } else if (credentials.type === "ADMINISTRATOR") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  return (
    <div className="flex-center">
      <div className="Login flex-center-col-wrap">
        <h1>Login</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(loginUser)} className="flex-center-col">
          {/* Step 10: {...register("title")}     &    {errors.title?.message} */}
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
          <label htmlFor="type">Client Type</label>
          <select {...register("type")} id="type" name="type">
            <option value="default" disabled hidden>
              Select Client Type
            </option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="COMPANY">COMPANY</option>
            <option value="ADMINISTRATOR">ADMINISTRATOR</option>
          </select>
          <span>{errors.type?.message}</span>
          <button className="button-success" disabled={!isValid}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
