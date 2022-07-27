import axios from "axios";
import { CompanyModel } from "../Models/Company";
import { CouponModel } from "../Models/Coupon";
import { CustomerModel } from "../Models/Customer";
import { LoginModel, UserModel } from "../Models/LoginModel";
import globals from "./Globals";
import tokenAxios from "./InterceptorAxios";

class WebApi {
  private loginUrl = globals.urls.login;
  private adminUrl = globals.urls.administrator;
  private compUrl = globals.urls.companies;
  private custUrl = globals.urls.customers;

  //Login Controllers:
  public async login(login: LoginModel): Promise<any> {
    return await axios.post<UserModel>(this.loginUrl, login);
  }

  //Admin Controllers:
  public async addCompany(company: CompanyModel): Promise<any> {
    return await tokenAxios.post<CompanyModel>(
      this.adminUrl + "/companies",
      company
    );
  }

  public async updateCompany(id: number, company: CompanyModel): Promise<any> {
    return await tokenAxios.put<CompanyModel>(
      this.adminUrl + "/company/" + id,
      company
    );
  }

  public async deleteCompany(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.adminUrl + "/companies/" + id);
  }

  public async getAllCompanies(): Promise<any> {
    return await tokenAxios.get<CompanyModel[]>(this.adminUrl + "/companies");
  }

  public async getSingleCompany(id: number): Promise<any> {
    return await tokenAxios.get<CompanyModel>(
      this.adminUrl + "/companies/" + id
    );
  }

  public async addCustomer(customer: CustomerModel): Promise<any> {
    return await tokenAxios.post<CustomerModel>(
      this.adminUrl + "/customers",
      customer
    );
  }

  public async updateCustomer(
    id: number,
    customer: CustomerModel
  ): Promise<any> {
    return await tokenAxios.put<CustomerModel>(
      this.adminUrl + "/customers/" + id,
      customer
    );
  }

  public async deleteCustomer(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.adminUrl + "/customers/" + id);
  }

  public async getAllCustomers(): Promise<any> {
    return await tokenAxios.get<CustomerModel[]>(this.adminUrl + "/customers");
  }

  public async getSingleCustomer(id: number): Promise<any> {
    return await tokenAxios.get<CustomerModel>(
      this.adminUrl + "/customers/" + id
    );
  }

  public async getAllCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.adminUrl + "/coupons");
  }

  // public async getAllCoupons(): Promise<any> {
  //   return await tokenAxios.get<CouponModel[]>(
  //     this.adminUrl + "/coupons/payloads"
  //   );
  // }

  public async getAllCouponsByCategory(category: string): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.adminUrl + "/coupons/category?category=" + category
    );
  }

  public async getAllCouponsByMaxPrice(maxPrice: number): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.adminUrl + "/coupons/price/max?value=" + maxPrice
    );
  }

  //Company Controllers:
  public async addCoupon(coupon: CouponModel): Promise<any> {
    console.log("Trying to add a coupon^^^");
    const url = this.compUrl + "/coupons";
    console.log("@@@" + url);
    return await tokenAxios.post<CouponModel>(
      this.compUrl + "/coupons",
      coupon
    );
  }

  public async updateCoupon(id: number, coupon: CouponModel): Promise<any> {
    return await tokenAxios.put<CouponModel>(
      this.compUrl + "/coupons/" + id,
      coupon
    );
  }

  public async deleteCoupon(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.compUrl + "/coupons/" + id);
  }

  public async getAllCompanyCoupons(): Promise<any> {
    const url = this.compUrl + "/coupons";
    console.log("@@@" + url);
    return await tokenAxios.get<CouponModel[]>(this.compUrl + "/coupons");
  }

  public async getCompanyAsList(): Promise<any> {
    const url = this.compUrl + "/currentAsList";
    console.log("@@@" + url);
    return await tokenAxios.get<CouponModel[]>(this.compUrl + "/currentAsList");
  }

  // public async getAllCompanyCoupons(): Promise<any> {
  //   return await tokenAxios.get<CouponModel[]>(
  //     this.compUrl + "/coupons/payloadtest"
  //   );
  // }

  // public async getNameFromId(): Promise<any> {
  //   return await tokenAxios.get<string>(this.compUrl + "/idToName");
  // }

  public async getSingleCoupon(id: number): Promise<any> {
    return await tokenAxios.get<CouponModel>(this.compUrl + "/coupons/" + id);
  }

  public async getAllCompanyCouponsByCategory(category: string): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.compUrl + "/coupons/category?category=" + category
    );
  }

  public async getAllCompanyCouponsByMaxPrice(value: number): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.compUrl + "/coupons/price/max?value=" + value
    );
  }

  public async getCompanyDetails(): Promise<any> {
    return await tokenAxios.get<CompanyModel>(this.compUrl + "/details");
  }

  //Customer Controllers:
  public async purchaseCoupon(coupon: CouponModel): Promise<any> {
    return await tokenAxios.post<CouponModel>(
      this.custUrl + "/purchase",
      coupon
    );
  }

  public async getAllCustomerCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.custUrl + "/coupons");
  }

  public async getAllCustomerCouponsByCategory(category: string): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.custUrl + "/coupons/category?category=" + category
    );
  }

  public async getAllCustomerCouponsByMaxPrice(value: number): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(
      this.custUrl + "/coupons/price/max?value=" + value
    );
  }

  public async getCustomerDetails(): Promise<any> {
    return await tokenAxios.get<CustomerModel>(this.custUrl + "/details");
  }
}
const web = new WebApi();
export default web;
