import { CouponModel } from "../Models/Coupon";
import globals from "../Services/Globals";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CustomerCouponsAppState {
  public coupons: CouponModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CustomerCouponsActionType {
  CustomerCouponsDownloaded = "CustomerCouponsDownloaded",
  //   CouponAdded = "CouponAdded",
  CustomerCouponsClear = "CustomerCouponsClear",
  CustomerCouponsPurchased = "CustomerCouponsPurchased",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponAction {
  type: CustomerCouponsActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customerCouponsDownloadedAction(
  coupons: CouponModel[]
): CouponAction {
  console.log("step4 coupons: " + coupons);
  return {
    type: CustomerCouponsActionType.CustomerCouponsDownloaded,
    payload: coupons,
  };
}

// export function couponAddedAction(coupon: CouponModel): CouponAction {
//   return { type: CouponsActionType.CouponAdded, payload: coupon };
// }

export function customerCouponsClear(): CouponAction {
  return { type: CustomerCouponsActionType.CustomerCouponsClear };
}

export function customerCouponPurchasedAction(
  coupon: CouponModel
): CouponAction {
  return {
    type: CustomerCouponsActionType.CustomerCouponsPurchased,
    payload: coupon,
  };
}

// Step 5 - Reducer function perform the required action
export function customerCouponsReducer(
  currentState: CustomerCouponsAppState = new CustomerCouponsAppState(),
  action: CouponAction
): CustomerCouponsAppState {
  const newState = { ...currentState }; //Spread Operator

  switch (action.type) {
    case CustomerCouponsActionType.CustomerCouponsDownloaded:
      newState.coupons = action.payload;
      console.log("downloaded...");
      console.log(newState.coupons);
      console.log("payload: " + action.payload);
      break;
    // case CouponsActionType.CustomerCouponAdded:
    //   newState.coupons.push(action.payload);
    //   break;
    case CustomerCouponsActionType.CustomerCouponsPurchased:
      newState.coupons.push(action.payload);
      break;
    case CustomerCouponsActionType.CustomerCouponsClear:
      newState.coupons = [];
      break;
  }
  return newState;
}
