interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImg: string;
  role: "customer" | "admin" | "other";  
  createdAt: string;  
  updatedAt: string; 
  address: string;  
}
