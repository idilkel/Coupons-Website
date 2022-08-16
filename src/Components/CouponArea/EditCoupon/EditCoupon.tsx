import { useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import "./EditCoupon.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/Store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { couponUpdatedAction } from "../../../Redux/CouponsAppState";
import web from "../../../Services/WebApi";

function EditCoupon(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const couponId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(couponId);
  const [coupon, setCoupon] = useState<CouponModel>(
    store.getState().couponsReducer.coupons.filter((c) => c.id === couponId)[0]
  );
  const [cat, setCat]: any = useState(coupon.category);
  const [comp, setComp]: any = useState(coupon.company);
  const [origin, setOrigin] = useState<CouponModel>({
    // can't update company - business-logic
    category: coupon.category,
    title: coupon.title,
    description: coupon.description,
    price: coupon.price,
    amount: coupon.amount,
    startDate: coupon.startDate,
    endDate: coupon.endDate,
    image: coupon.image,
  });
  // const goBack = () => {
  //   navigate(-1);
  // };

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    // company: yup.string().required("Company is required"),
    category: yup.string().required("Category is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    startDate: yup
      .date()
      .min(new Date(), "Can't assign a past date")
      .max(yup.ref("endDate"), "Can't assign start date after end date")
      .default(new Date())
      .typeError("Start date must be specified")
      .required("Start date is required")
      .nullable()
      .default(() => new Date()),
    endDate: yup
      .date()
      .min(yup.ref("startDate"), "Can't assign end date before start date")
      .default(new Date())
      .typeError("End date must be specified")
      .required("End date is required")
      .nullable()
      .default(() => new Date()),
    amount: yup.number().required("Amount is required").min(0),
    price: yup.number().required("Price is required"),
    image: yup.string().required("Image is required"),
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
    coupon.id = id;
    coupon.company = comp;
    web
      .updateCoupon(id, coupon)
      .then((res) => {
        notify.success(SccMsg.UPDATE_COUPON);
        navigate("/companies/coupons");
        // Update App State (Global State)
        store.dispatch(couponUpdatedAction(res.data));
      })
      .catch((err) => {
        notify.error(err);
        navigate("/companies/coupons");
      });
  };
  return (
    <div className="flex-center-col">
      <div className="EditCoupon flex-center-col-wrap">
        <h1>Coupon Update</h1>
        {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
        <form onSubmit={handleSubmit(updateCoupon)} className="flex-center-col">
          {/* Step 10: {...register("caption")}     &    {errors.caption?.message} */}

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

          <input
            {...register("image")}
            type="text"
            placeholder="image"
            id="image"
          />
          <span>{errors.image?.message}</span>

          <Button
            variant="secondary"
            type="submit"
            disabled={!isDirty}
            className="mt-3"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditCoupon;
