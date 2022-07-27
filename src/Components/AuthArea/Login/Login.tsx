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
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { couponsClear } from "../../../Redux/CouponsAppState";

interface LoginProps {
  time: Date;
}

function Login(props: LoginProps): JSX.Element {
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

    // const [time, setTime] = useState(props.time);

    console.log("going to send to remote server..." + credentials);

    web
      .login(credentials)
      .then((res) => {
        console.log("token!!!" + res.data.token);
        console.log("loginTime!!!" + res.data.loginTime);
        notify.success(SccMsg.LOGIN);
        store.dispatch(loginAction(res.data));
        // setTime(res.data.loginTime);
        // if (res.data.token === null) {
        //   localStorage.removeItem("user");
        //   store.dispatch(couponsClear());
        // }
        switch (credentials.type) {
          case "COMPANY":
            navigate("/companies/coupons");
            break;
          case "CUSTOMER":
            navigate("/customers/coupons");
            break;
          case "ADMINISTRATOR":
            navigate("/admin");
            break;
        }
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/login");
      });
  };

  useEffect(() => {
    let timerId = setInterval(() => {}, 1000);
  }, []);

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
          {/* <button className="button-success" disabled={!isValid}>
            Login
          </button> */}
          <Button
            className="mt-2"
            type="submit"
            variant="secondary"
            disabled={!isValid}
          >
            Login
          </Button>{" "}
        </form>
      </div>
    </div>
  );
}
export default Login;
