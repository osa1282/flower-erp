export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export interface Subproduct {
  id: string;
  name: string;
  quantity: number;
  unit: "szt" | "cm" | "m";
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  stock: number;
  image: string;
  category: string;
  subproducts?: Subproduct[];
}