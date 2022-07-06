import { Url } from "url";
import { CompanyModel, CompanyWoCouponsModel } from "./Company";

export class CouponModel {
  public id?: number;
  public company?: CompanyWoCouponsModel;
  public category?: string;
  public title?: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public amount?: number;
  public price?: number;
  public image?: string;

  public constructor(
    id?: number,
    company?: CompanyWoCouponsModel,
    category?: string,
    title?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    amount?: number,
    price?: number,
    image?: string
  ) {
    this.id = id;
    this.company = company;
    this.category = category;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.amount = amount;
    this.image = image;
  }
}

export class CouponPayLoadModel {
  public company?: CompanyWoCouponsModel;
  public category?: string;
  public title?: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public amount?: number;
  public price?: number;
  public image?: string;

  public constructor(
    company?: CompanyWoCouponsModel,
    category?: string,
    title?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    amount?: number,
    price?: number,
    image?: string
  ) {
    this.company = company;
    this.category = category;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.amount = amount;
    this.image = image;
  }
}
