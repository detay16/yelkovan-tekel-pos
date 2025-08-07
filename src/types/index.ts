export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'cashier';
  created_at: string;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  description?: string;
  price: number;
  cost: number;
  stock: number;
  critical_stock: number;
  category_id?: string;
  supplier_id?: string;
  tax_rate: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  tax_number?: string;
  is_active: boolean;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  tax_number?: string;
  discount_rate: number;
  total_purchases: number;
  created_at: string;
}

export interface SaleItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  discount: number;
  tax_amount: number;
  total: number;
}

export interface Sale {
  id: string;
  sale_number: string;
  customer_id?: string;
  customer?: Customer;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  payment_method: 'cash' | 'card' | 'bank_transfer' | 'mixed';
  status: 'completed' | 'cancelled' | 'refunded';
  items: SaleItem[];
  cashier_id: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  supplier_id: string;
  supplier: Supplier;
  total_amount: number;
  tax_amount: number;
  status: 'pending' | 'approved' | 'processed';
  pdf_url?: string;
  items: InvoiceItem[];
  processed_by?: string;
  created_at: string;
  processed_at?: string;
}

export interface InvoiceItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  previous_cost?: number;
  new_average_cost?: number;
}

export interface Report {
  period: string;
  total_sales: number;
  total_transactions: number;
  total_profit: number;
  top_products: Array<{
    product: Product;
    quantity_sold: number;
    revenue: number;
  }>;
  low_stock_products: Product[];
  daily_sales: Array<{
    date: string;
    sales: number;
    profit: number;
  }>;
}
