import { IMedicine } from "./medicinesTypes";

export type TCart = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: {
    medicineId: IMedicine;
    quantity: number;
  }[];
  totalPrice: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
