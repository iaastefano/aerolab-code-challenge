export interface IRedeemHistoryItem {
    productId: string;
    name: string;
    cost: number;
    category: string;
    _id: string;
    createDate: string;
    img: {
      url: string;
      hdUrl: string;
    }
}