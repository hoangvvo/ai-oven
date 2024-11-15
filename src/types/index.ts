import { CollectionEntity, ProductEntity, UserEntity } from "@/db/schema";

export type Product = ProductEntity;

export type Collection = CollectionEntity;

export type User = Pick<
  UserEntity,
  "id" | "name" | "email" | "phone_number" | "address" | "city" | "country"
>;

export interface CreateUserAccountInput {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
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
