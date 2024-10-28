import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Package, PackageCheck, Plus, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

type OrderStatus = 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';
type CustomerType = 'all' | 'individual' | 'company';

interface Order {
  id: string;
  customerName: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  status: OrderStatus;
  pickupDate: string;
  totalAmount: number;
  isCompany: boolean;
  tags?: string[];
}

const statusConfig = {
  pending: { 
    label: "Oczekujące", 
    variant: "warning",
    Icon: Clock
  },
  processing: { 
    label: "W realizacji", 
    variant: "secondary",
    Icon: Package
  },
  ready: { 
    label: "Do wydania", 
    variant: "info",
    Icon: PackageCheck
  },
  completed: { 
    label: "Zakończone", 
    variant: "success",
    Icon: CheckCircle2
  },
  cancelled: { 
    label: "Anulowane", 
    variant: "destructive",
    Icon: AlertCircle
  }
} as const;

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Jan Kowalski',
    products: [
      { id: '1', name: 'Bukiet róż', quantity: 1 },
      { id: '2', name: 'Wazon szklany', quantity: 1 }
    ],
    status: 'pending',
    pickupDate: '2024-03-20',
    totalAmount: 250,
    isCompany: false,
    tags: ['Stały klient']
  },
  {
    id: '2',
    customerName: 'Firma ABC',
    products: [
      { id: '3', name: 'Kompozycja kwiatowa', quantity: 5 }
    ],
    status: 'processing',
    pickupDate: '2024-03-21',
    totalAmount: 1500,
    isCompany: true,
    tags: ['VIP', 'Umowa kwartalna']
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [customerFilter, setCustomerFilter] = useState<CustomerType>('all');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesCustomerType = customerFilter === 'all' || 
      (customerFilter === 'company' && order.isCompany) || 
      (customerFilter === 'individual' && !order.isCompany);
    return matchesStatus && matchesCustomerType;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zamówienia</h1>
        <Button onClick={() => navigate('/orders/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nowe zamówienie
        </Button>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
          >
            Wszystkie statusy
          </Button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              onClick={() => setStatusFilter(status as OrderStatus)}
            >
              <config.Icon className="mr-2 h-4 w-4" />
              {config.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            variant={customerFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setCustomerFilter('all')}
          >
            Wszyscy klienci
          </Button>
          <Button
            variant={customerFilter === 'individual' ? 'default' : 'outline'}
            onClick={() => setCustomerFilter('individual')}
          >
            <Users className="mr-2 h-4 w-4" />
            Klienci indywidualni
          </Button>
          <Button
            variant={customerFilter === 'company' ? 'default' : 'outline'}
            onClick={() => setCustomerFilter('company')}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Firmy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{order.customerName}</h3>
                <p className="text-sm text-muted-foreground">
                  Odbiór: {new Date(order.pickupDate).toLocaleDateString()}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {statusConfig[order.status].label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup 
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                  >
                    {(Object.keys(statusConfig) as OrderStatus[]).map((status) => {
                      const { Icon } = statusConfig[status];
                      return (
                        <DropdownMenuRadioItem key={status} value={status}>
                          <Icon className="mr-2 h-4 w-4" />
                          {statusConfig[status].label}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 mb-4">
              {order.products.map((product) => (
                <div key={product.id} className="text-sm">
                  {product.quantity}x {product.name}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              {order.isCompany && (
                <Badge variant="secondary">Firma</Badge>
              )}
              {order.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowDetails(true);
                }}
              >
                Szczegóły
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Szczegóły zamówienia</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Klient</h4>
                <p>{selectedOrder.customerName}</p>
                {selectedOrder.isCompany && <Badge className="mt-1">Firma</Badge>}
              </div>
              <div>
                <h4 className="font-semibold">Produkty</h4>
                {selectedOrder.products.map((product) => (
                  <p key={product.id}>
                    {product.quantity}x {product.name}
                  </p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold">Data odbioru</h4>
                <p>{new Date(selectedOrder.pickupDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Wartość zamówienia</h4>
                <p>{formatCurrency(selectedOrder.totalAmount)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;