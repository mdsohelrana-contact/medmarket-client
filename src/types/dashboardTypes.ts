export interface ITopProduct {
    _id: string;
    productId: string;
    productName: string;
    productPrice: number;
    totalOrders: number;
  }
  
  export interface IDashboardAnalytics {
    topProduct: ITopProduct[];
    totalOrders: number;
    totalPendingOrders: number;
    totalProducts: number;
    totalRevenue: number;
    totalUsers: number;
  }
  