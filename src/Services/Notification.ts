import { Notyf } from "notyf";

export enum SccMsg {
  ALL_COMPANIES = "got all companies successfully",
  SINGLE_COMPANY = "got single company successfully",
  DELETE_COMPANY = "deleted company successfully",
  UPDATE_COMPANY = "updated company successfully",
  ADD_COMPANY = "added company successfully",
  ALL_CUSTOMERS = "got all customers successfully",
  SINGLE_CUSTOMER = "got single customer successfully",
  DELETE_CUSTOMER = "deleted customer successfully",
  UPDATE_CUSTOMER = "updated customer successfully",
  ADD_CUSTOMER = "added customer successfully",
  ALL_COUPONS = "got all coupons successfully",
  COUPONS_CATEGORY = "got all coupons by category successfully",
  COUPONS_MAX_PRICE = "got all coupons by maximum price successfully",
  SINGLE_COUPON = "got single coupon successfully",
  DELETE_COUPON = "deleted coupon successfully",
  UPDATE_COUPON = "updated coupon successfully",
  ADD_COUPON = "added coupon successfully",
  LOGIN = "login request sent successfully",
  PURCHASED = "coupon purchased successfully",
  GOT_NAME = "got company name successfully",
}

export enum ErrMsg {
  FAIL_EDIT_COMPANIES = "failed to edit company",
  WRONG_LOGIN_DETAILS = "Wrong login details. Please try again",
}

class Notify {
  private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "top" },
  });

  public success(message: SccMsg) {
    console.log("Err type1");
    this.notification.success(message);
  }

  public error(message: string) {
    // this.notification.error(message);
    console.log("Err type2");
    console.log(message);
    this.notification.error(this.extractMsg(message));
  }

  private extractMsg(err: any): string {
    if (Array.isArray(err?.response?.data)) {
      console.log("Err type3");
      // Backend exact error list
      return err?.response?.data[0];
    }

    if (typeof err === "string") {
      console.log("Err type4");
      console.log(err);
      return err;
    }

    if (typeof err?.response?.data?.value === "string") {
      console.log("Err type5");
      //Backend exact error
      return err.response.data.value;
    }

    if (typeof err?.response?.data === "string") {
      console.log("Err type6");
      //Backend exact error
      return err.response.data;
    }

    // Must be last
    if (typeof err?.message === "string") {
      console.log("Err type7");
      console.log(err.message);

      return err.message;
    }

    return "an error occurred, please try again.";
  }
}

const notify = new Notify();
export default notify;
