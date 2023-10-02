import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
  password?: string;
  role?: string;
  accessToken?: string;
}

export interface IMeal {
  name?: string;
  price?: number;
  restaurant?: Types.ObjectId;
}

export interface IRestaurant {
  name?: string;
  address?: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface ICart {
  name?: string;
  price?: number;
  restaurant?: Types.ObjectId;
  owner?: Types.ObjectId;
  quantity?: number;
}

export interface IRequest extends Request {
  user?: any;
}
