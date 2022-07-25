import { useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import "./EditCoupon.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import { useNavigate, useParams } from "react-router-dom";

function EditCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(couponId);
  const [origin, setOrigin] = useState<CouponModel>({
    // can't update company - business-logic
    category: "",
    title: "",
    description: "",
    price: 0,
    amount: 0,
    startDate: new Date(),
    endDate: new Date(),
    image: "",
  });

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    company: yup.string().required("Company is required"),
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
    image: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      })
      .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 200000;
      })
      .test("type", "We only support png", function (value) {
        return value && value[0] && value[0].type === "image/png";
      }),
  });

  //Step 7: React-hook-form
  // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Where there any changes?
  const { dirtyFields } = useFormState({
    control,
  });

  //Step 8: On-submit:  Send to remote as put request
  const updateCoupon = async (coupon: CouponModel) => {
    axios
      .put<any>(globals.urls.companies + "coupons/" + id, coupon)
      .then((res) => {
        notify.success(SccMsg.UPDATE_COUPON);
        navigate("/coupons");
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/coupons");
      });
  };
  return (
    <div className="flex-center">
      <div className="EditCoupon flex-center-col-wrap">
        <h1>Coupon Update</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(updateCoupon)} className="flex-center-col">
          {/* Step 10: {...register("caption")}     &    {errors.caption?.message} */}
          {/* <label htmlFor="company">Company</label>
        <input
          {...register("company")}
          type="text"
          placeholder="company"
          id="company"
        />
        <span>{errors.company?.message}</span> */}

          <label htmlFor="category">Category</label>
          {/* <input
          {...register("category")}
          type="text"
          placeholder="category"
          id="category"
        /> */}
          <select
            {...register("category")}
            id="category"
            name="category"
            // placeholder="Select a category"
          >
            <option value="default" disabled hidden>
              Select a category
            </option>
            <option value="restaurants">Restaurants</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
          </select>
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
            type="datetime-local"
            placeholder="startDate"
            id="startDate"
          />
          <span>{errors.startDate?.message}</span>

          <label htmlFor="endDate">End date</label>
          <input
            {...register("endDate")}
            type="datetime-local"
            placeholder="endDate"
            id="endDate"
          />
          <span>{errors.endDate?.message}</span>

          <label htmlFor="image">Image</label>
          <input
            {...register("image")}
            type="file"
            placeholder="image"
            id="image"
          />
          <span>{errors.image?.message}</span>

          <button className="button-success" disabled={!isDirty}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCoupon;
