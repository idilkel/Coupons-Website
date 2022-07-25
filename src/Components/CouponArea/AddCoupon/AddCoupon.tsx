import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../Models/Coupon";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "../../../Redux/Store";
import { couponAddedAction } from "../../../Redux/CouponsAppState";
import Button from "react-bootstrap/Button";
import { CompanyModel } from "../../../Models/Company";

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();
  const [cat, setCat]: any = useState("");
  console.log("Selected!!!: " + cat);
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const [company, setCompany] = useState<CompanyModel>(
    store
      .getState()
      .companiesReducer.companies.filter(
        (c) => c.email === store.getState().authReducer.user.email
      )[0]
  );
  const goBack = () => {
    navigate(-1);
  };

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    // company: yup.string().required("Company is required"),
    // company: yup.number().required("Company is required"),
    category: yup.string().required("Category is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    startDate: yup
      .date()
      .min(new Date(), "Can't assign a past date")
      .default(new Date())
      .typeError("Start date must be specified")
      .required("Start date is required")
      .nullable()
      .default(() => new Date()),
    endDate: yup
      .date()
      .min(new Date(), "Can't assign a past date")
      .default(new Date())
      .typeError("End date must be specified")
      .required("End date is required")
      .nullable()
      .default(() => new Date()),
    amount: yup.number().required("Amount is required"),
    price: yup.number().required("Price is required"),
    image: yup.string().required("Image is required"),
    // image: yup
    //   .mixed()
    //   .test("required", "You need to provide a file", (value) => {
    //     return value && value.length;
    //   })
    //   .test("fileSize", "The file is too large", (value, context) => {
    //     return value && value[0] && value[0].size <= 200000;
    //   })
    //   .test("type", "We only support png", function (value) {
    //     return value && value[0] && value[0].type === "image/png";
    //   }),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

  //Step 8: On-submit:  Send to remote as post request
  const addCoupon = async (coupon: CouponModel) => {
    coupon.company = company;
    web
      .addCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.ADD_COUPON);
        // Update App State (Global State)
        store.dispatch(couponAddedAction(res.data));
        navigate("/companies/coupons");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/companies/coupons");
      });
  };

  useEffect(() => {
    if (store.getState().companiesReducer.companies.length === 0) {
      //get all companies and save to redux
    }
  }, []);

  return (
    <div className="flex-center flex-center-col">
      <h1>Add a Coupon</h1>
      <div className="AddCoupon flex-center-col-wrap">
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(addCoupon)} className="flex-center-col">
          {/* Step 10: {...register("title")}     &    {errors.title?.message} */}
          {/* <label htmlFor="company">Company</label>
        <input
          {...register("company")}
          type="text"
          placeholder="company"
          id="company"
        />
        <span>{errors.company?.message}</span> */}
          {/* <label htmlFor="companyId">Company</label>
        <input
          {...register("companyId")}
          type="number"
          placeholder="companyId"
          id="companyId"
        />
        <span>{errors.companyId?.message}</span> */}

          {/* <input
        {...register("category")}
        type="text"
        placeholder="category"
        id="category"
      /> */}
          {/* <select
          {...register("category")}
          // type="text"
          id="category"
          name="category"
          onChange={(e) =>
            setCat("category", e.target.value, { shouldValidate: true })
          }
        >
          <option value="default" disabled hidden>
            Select a category
          </option>
          <option value="RESTAURANTS">RESTAURANTS</option>
          <option value="TRAVEL">TRAVEL</option>
          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
          <option value="FASHION">FASHION</option>
          <option value="ELECTRONICS">ELECTRONICS</option>
        </select> */}
          {/* <div> */}
          <label htmlFor="category">Category</label>
          <Form.Select
            {...register("category")}
            id="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option>Select a category</option>
            <option value="RESTAURANTS">RESTAURANTS</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="FASHION">FASHION</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
          </Form.Select>
          {/* </div> */}
          <span>{errors.category?.message}</span>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="title"
            id="title"
          />
          <span>{errors.title?.message}</span>
          <label htmlFor="description">Description</label>
          <input
            {...register("description")}
            type="text"
            placeholder="description"
            id="description"
          />
          <span>{errors.description?.message}</span>
          <label htmlFor="price">Price</label>
          <input
            {...register("price")}
            type="number"
            step="0.1"
            placeholder="price"
            id="price"
          />
          <span>{errors.price?.message}</span>
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount")}
            type="number"
            placeholder="amount"
            id="amount"
          />
          <span>{errors.amount?.message}</span>
          <label htmlFor="startDate">Start date</label>
          <input
            {...register("startDate")}
            type="date"
            placeholder="startDate"
            id="startDate"
          />
          <span>{errors.startDate?.message}</span>
          <label htmlFor="endDate">End date</label>
          <input
            {...register("endDate")}
            type="date"
            placeholder="endDate"
            id="endDate"
          />
          <span>{errors.endDate?.message}</span>
          <label htmlFor="image">Image</label>
          {/* <input
          {...register("image")}
          type="file"
          placeholder="image"
          id="image"
        /> */}
          <input
            {...register("image")}
            type="text"
            placeholder="image"
            id="image"
          />
          <span>{errors.image?.message}</span>
          <button className="button-success" disabled={!isValid}>
            Add
          </button>
          {/* <Button className="mt-2" variant="success" disabled={!isValid}>
          Add
        </Button>{" "} */}
        </form>
      </div>
      <Button className="mt-2" variant="secondary" onClick={goBack}>
        Go Back
      </Button>{" "}
    </div>
  );
}

export default AddCoupon;
