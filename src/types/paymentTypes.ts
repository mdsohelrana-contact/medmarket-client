import { IMedicine } from "./medicinesTypes";

export type TMedicine = {
  medicineId: IMedicine;
  quantity: number;
  _id: string;
};

export type TTransactionInfo = {
  paymentDate: string; // ISO Date String
  paymentMethod: string;
  paymentStatus: string;
};

export type TOrder = {
  _id: string;
  userId: string;
  phoneNumber: string;
  stripeSessionId: string;
  totalPrice: number;
  orderIntent: string;
  medicines: TMedicine[];
  transactionInfo?: TTransactionInfo;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
};
