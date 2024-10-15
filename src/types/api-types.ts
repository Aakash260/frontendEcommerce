import {
  User,
  Product,
  ShippingInfo,
  CartItem,
  Order,
  Stats,
  Pie,
  Bar,
  Line,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllUserResponse = {
  success: boolean;
  users: User[];
};
export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};

export type AllCategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductResponse = {
  success: boolean;
  product: Product[];
  totalPage: number;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  userId: string;
  ProductId: string;
  formData: FormData;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};

export type DeleteProductResponse = {
  userId: string;
  ProductId: string;
};

export type SearchProductResquest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};
