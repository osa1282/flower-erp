import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  MoreHorizontal,
  History,
  PackagePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import type { InventoryItem } from '@/types/inventory';

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Róże czerwone',
    category: 'Kwiaty cięte',
    sku: 'KW-ROZ-001',
    currentStock: 150,
    minimumStock: 50,
    unit: 'szt',
    location: 'Chłodnia A1',
    lastRestocked: '2024-03-15',
    supplier: 'Hurtownia Kwiatowa ABC',
    price: 3.50,
    status: 'in_stock',
    notes: 'Premium quality'
  },
  {
    id: '2',
    name: 'Wstążka satynowa biała',
    category: 'Dodatki',
    sku: 'DOD-WST-002',
    currentStock: 25,
    minimumStock: 30,
    unit: 'm',
    location: 'Magazyn B2',
    lastRestocked: '2024-03-10',
    supplier: 'Dekoracje Sp. z o.o.',
    price: 1.20,
    status: 'low_stock',
    notes: 'Szerokość 2.5cm'
  },
  {
    id: '3',
    name: 'Tulipany mix',
    category: 'Kwiaty cięte',
    sku: 'KW-TUL-003',
    currentStock: 0,
    minimumStock: 40,
    unit: 'szt',
    location: 'Chłodnia A2',
    lastRestocked: '2024-03-01',
    supplier: 'Hurtownia Kwiatowa ABC',
    price: 2.80,
    status: 'out_of_stock',
    notes: 'Sezonowe'
  },
];

const statusConfig = {
  in_stock: {
    label: 'Dostępny',
    variant: 'success',
    icon: CheckCircle2,
  },
  low_stock: {
    label: 'Niski stan',
    variant: 'warning',
    icon: AlertTriangle,
  },
  out_of_stock: {
    label: 'Brak',
    variant: 'destructive',
    icon: XCircle,
  },
} as const;

export default function Inventory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(
    new Set(mockInventory.map((item) => item.category))
  );

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Magazyn</h1>
          <p className="text-muted-foreground">
            Zarządzaj stanem magazynowym produktów
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/inventory/restock')}>
            <PackagePlus className="mr-2 h-4 w-4" />
            Dostawa
          </Button>
          <Button onClick={() => navigate('/inventory/add')}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj produkt
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj po nazwie lub SKU..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" className="w-[400px]" onValueChange={(value) => setCategoryFilter(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Wszystkie</TabsTrigger>
              <TabsTrigger value="Kwiaty cięte">Kwiaty</TabsTrigger>
              <TabsTrigger value="Dodatki">Dodatki</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((item) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{item.sku}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/inventory/edit/${item.id}`)}>
                        Edytuj
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/inventory/history/${item.id}`)}>
                        <History className="mr-2 h-4 w-4" />
                        Historia
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant={statusConfig[item.status].variant as "success" | "warning" | "destructive"}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[item.status].label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.location}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Stan magazynowy:</span>
                        <span className="font-medium">
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Minimum:</span>
                        <span className="font-medium">
                          {item.minimumStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cena jednostkowa:</span>
                        <span className="font-medium">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ostatnia dostawa:</span>
                        <span>{new Date(item.lastRestocked).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}