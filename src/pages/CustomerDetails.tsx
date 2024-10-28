import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  Tag,
  User,
  MapPin,
  Calendar,
  Package,
  FileText,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import type { Customer, CustomerOrder } from '@/types/customer';

// Mock data
const mockCustomer: Customer = {
  id: '1',
  type: 'individual',
  name: 'Anna Kowalska',
  email: 'anna.kowalska@example.com',
  phone: '+48 123 456 789',
  address: 'ul. Kwiatowa 1, Warszawa',
  tags: ['VIP', 'Stały klient'],
  notes: 'Preferuje róże w kompozycjach. Zawsze zamawia na specjalne okazje. Lubi klasyczne kompozycje w stonowanych kolorach.',
  createdAt: '2024-01-15',
  totalOrders: 12,
  totalSpent: 2500,
  status: 'active',
};

const mockOrders: CustomerOrder[] = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'completed',
    total: 250,
    products: [
      { name: 'Bukiet róż', quantity: 1, price: 150 },
      { name: 'Wazon szklany', quantity: 1, price: 100 },
    ],
  },
  {
    id: '2',
    date: '2024-02-28',
    status: 'completed',
    total: 180,
    products: [
      { name: 'Kompozycja wiosenna', quantity: 1, price: 180 },
    ],
  },
];

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {mockCustomer.type === 'individual' ? (
              <User className="h-6 w-6" />
            ) : (
              <Building2 className="h-6 w-6" />
            )}
            {mockCustomer.name}
          </h1>
          {mockCustomer.companyName && (
            <p className="text-muted-foreground">{mockCustomer.companyName}</p>
          )}
        </div>
        <Button onClick={() => navigate(`/customers/edit/${id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edytuj
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Informacje
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Zamówienia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dane kontaktowe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{mockCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockCustomer.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Klient od: {new Date(mockCustomer.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tagi i notatki</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {mockCustomer.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Notatki</h4>
                  <p className="text-sm text-muted-foreground">{mockCustomer.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Historia zamówień</CardTitle>
              <CardDescription>
                Łączna wartość zamówień: {formatCurrency(mockCustomer.totalSpent)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produkty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Wartość</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.products.map((product, index) => (
                            <div key={index} className="text-sm">
                              {product.quantity}x {product.name}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(order.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}