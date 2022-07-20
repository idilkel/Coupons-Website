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
  SINGLE_COUPON = "got single coupon successfully",
  DELETE_COUPON = "deleted coupon successfully",
  UPDATE_COUPON = "updated coupon successfully",
  ADD_COUPON = "added coupon successfully",
  LOGIN = "login request sent successfully",
  PURCHASED = "coupon purchased successfully",
}

class Notify {
  private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "top" },
  });

  public success(message: SccMsg) {
    this.notification.success(message);
  }

  public error(message: string) {
    // this.notification.error(message);
    this.notification.error(this.extractMsg(message));
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data === "string") {
      //Backend exact error
      return err.response.data;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
      return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
      return err.message;
    }

    return "an error occurred, please try again.";
  }
}

const notify = new Notify();
export default notify;
