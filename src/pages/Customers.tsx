import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  Plus,
  Search,
  Tag,
  User,
  MoreHorizontal,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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
import type { Customer } from '@/types/customer';

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    type: 'individual',
    name: 'Anna Kowalska',
    email: 'anna.kowalska@example.com',
    phone: '+48 123 456 789',
    address: 'ul. Kwiatowa 1, Warszawa',
    tags: ['VIP', 'Stały klient'],
    notes: 'Preferuje róże w kompozycjach',
    createdAt: '2024-01-15',
    totalOrders: 12,
    totalSpent: 2500,
    status: 'active',
  },
  {
    id: '2',
    type: 'company',
    name: 'Jan Nowak',
    companyName: 'Biuro Kwiatowe Sp. z o.o.',
    email: 'jan.nowak@biurokwiatowe.pl',
    phone: '+48 987 654 321',
    address: 'ul. Biznesowa 10, Kraków',
    nip: '1234567890',
    tags: ['Umowa kwartalna', 'Duże zamówienia'],
    notes: 'Zamówienia głównie na eventy firmowe',
    createdAt: '2023-12-01',
    totalOrders: 25,
    totalSpent: 15000,
    status: 'active',
  },
];

export default function Customers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [customerType, setCustomerType] = useState<'all' | 'individual' | 'company'>('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.companyName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = customerType === 'all' || customer.type === customerType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Klienci</h1>
          <p className="text-muted-foreground">
            Zarządzaj bazą klientów i ich zamówieniami
          </p>
        </div>
        <Button onClick={() => navigate('/customers/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj klienta
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj klientów..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" className="w-[400px]" onValueChange={(value) => setCustomerType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Wszyscy</TabsTrigger>
              <TabsTrigger value="individual">Indywidualni</TabsTrigger>
              <TabsTrigger value="company">Firmy</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {customer.type === 'individual' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Building2 className="h-4 w-4" />
                      )}
                      {customer.name}
                    </CardTitle>
                    {customer.companyName && (
                      <CardDescription>{customer.companyName}</CardDescription>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
                        Szczegóły
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/customers/edit/${customer.id}`)}>
                        Edytuj
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {customer.phone}
                  </div>
                  {customer.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {customer.address}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {customer.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Zamówienia</p>
                    <p className="text-lg font-semibold">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wartość zamówień</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(customer.totalSpent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}