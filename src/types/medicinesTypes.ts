export interface IMedicine {
  _id: string;
  name: string;
  brand_name: string[];
  category: string;
  createdAt: string;
  dosage_form: string[];
  generic_name: string;
  imageUrl: string[];
  prescription_required: boolean;
  price: number;
  stock: number;
  strength: string[];
  symptoms: string[];
  updatedAt: string;
}

export interface ICart {
  medicineId:string;
  quantity?: number;
}
