import { CouponModel } from "./Coupon";

export class CustomerModel {
  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public coupons?: CouponModel[];

  public constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    coupons?: CouponModel[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
  }
}

export class CustomerPayLoadModel {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public coupons?: CouponModel[];

  public constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    coupons?: CouponModel[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
  }
}
