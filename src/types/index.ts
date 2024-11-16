import {
  CollectionEntity,
  OrderEntity,
  OrderItemEntity,
  ProductEntity,
  UserEntity,
} from "@/db/schema";

export type Product = ProductEntity;

export type Collection = CollectionEntity;

export type User = Pick<
  UserEntity,
  | "id"
  | "first_name"
  | "last_name"
  | "email"
  | "phone_number"
  | "address"
  | "city"
  | "country_code"
>;

export interface CreateUserAccountInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country_code?: string;
}

export interface CreateUserAccountResponse {
  user: User;
}

export interface LoginUserResponse {
  user: User;
}

export interface ApiError {
  error: string;
}

export interface AppSession {
  user: User | null;
  cart: Cart;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type CreateOrderRequest = {
  guest_email?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country_code: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_phone_number: string;
};

export type CreateOrderResponse = {
  jsonResponse: any;
  httpStatusCode: number;
};

export type CaptureOrderResponse = {
  order: Order;
  jsonResponse: any;
  httpStatusCode: number;
};

export type Order = OrderEntity;
export type OrderItem = OrderItemEntity;
