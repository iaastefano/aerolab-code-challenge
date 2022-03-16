import { IRedeemHistoryItem } from "../redeems/models";

export interface IUser {
  id: string;
  name: string;
  points: string;
  redeemHistory: IRedeemHistoryItem[];
  createDate: string;
}