import { CouponModel } from "../Models/Coupon";
import globals from "../Services/Globals";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CouponsAppState {
  public coupons: CouponModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted",
  CouponsClear = "CouponsClear",
  // CouponsPurchased = "CouponsPurchased",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponAction {
  type: CouponsActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
  console.log("step4 coupons: " + coupons);
  return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponAddedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponDeletedAction(id: number): CouponAction {
  return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsClear(): CouponAction {
  return { type: CouponsActionType.CouponDeleted };
}

// export function couponPurchasedAction(coupon: CouponModel): CouponAction {
//   return { type: CouponsActionType.CouponsPurchased, payload: coupon };
// }

// Step 5 - Reducer function perform the required action
export function couponsReducer(
  currentState: CouponsAppState = new CouponsAppState(),
  action: CouponAction
): CouponsAppState {
  const newState = { ...currentState }; //Spread Operator

  switch (action.type) {
    case CouponsActionType.CouponsDownloaded:
      newState.coupons = action.payload;
      console.log("downloaded...");
      console.log(newState.coupons);
      console.log("payload: " + action.payload);
      break;
    case CouponsActionType.CouponAdded:
      newState.coupons.push(action.payload);
      break;
    case CouponsActionType.CouponUpdated:
      const idx = newState.coupons.findIndex((t) => t.id === action.payload.id);
      newState.coupons[idx] = action.payload;
      break;
    case CouponsActionType.CouponDeleted:
      newState.coupons = newState.coupons.filter(
        (c) => c.id !== action.payload
      );
      break;

    case CouponsActionType.CouponsClear:
      newState.coupons = [];
      break;
  }
  return newState;
}
