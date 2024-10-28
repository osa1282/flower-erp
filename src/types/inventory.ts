export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  unit: 'szt' | 'kg' | 'g' | 'm';
  location: string;
  lastRestocked: string;
  supplier?: string;
  price: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  notes?: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'restock' | 'usage' | 'loss' | 'adjustment';
  quantity: number;
  date: string;
  notes?: string;
  performedBy: string;
}