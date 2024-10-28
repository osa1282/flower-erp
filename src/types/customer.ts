export interface Customer {
  id: string;
  type: 'individual' | 'company';
  name: string;
  email: string;
  phone: string;
  address?: string;
  companyName?: string;
  nip?: string;
  tags: string[];
  notes: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface CustomerOrder {
  id: string;
  date: string;
  status: string;
  total: number;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}