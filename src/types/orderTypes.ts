import { IMedicine } from "./medicinesTypes";

export interface IAddress {
  city: string;
  country: string;
}

export interface IOrderMedicines {
  medicineId: IMedicine;
  quantity: number;

  medicineInfo: {
    dosageForm: string;
    prescription: string;
    strength: string;
  };
  _id: string;
}

export interface TransactionInfo {
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
}

export interface Order {
  _id: string;
  userId: string;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
  medicines: IOrderMedicines[];
  orderIntent: string;
  phoneNumber: string;
  stripeSessionId: string;
  totalPrice: number;
  transactionInfo: TransactionInfo;
}

export interface IMeta {
  page: number;
  total: number;
  totalPage: number;
}

export interface IOrderHistoryResponse {
  meta: IMeta;
  result: Order[];
  totalCost: number;
}
