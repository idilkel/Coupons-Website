import { CouponModel } from "./Coupon";

export class CompanyModel {
  public id?: number;
  public name?: string;
  public email?: string;
  public password?: string;
  public coupons?: CouponModel[];

  public constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    coupons?: CouponModel[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
  }
}

// export class CompanyPayLoadModel {
//   public name?: string;
//   public email?: string;
//   public password?: string;
//   public coupons?: CouponModel[];

//   public constructor(
//     name?: string,
//     email?: string,
//     password?: string,
//     coupons?: CouponModel[]
//   ) {
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.coupons = coupons;
//   }
// }

// export class CompanyWoCouponsModel {
//   public name?: string;
//   public email?: string;
//   public password?: string;
//   public coupons?: any[];

//   public constructor(
//     name?: string,
//     email?: string,
//     password?: string,
//     coupons?: any[]
//   ) {
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.coupons = coupons;
//   }
// }
