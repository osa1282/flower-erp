import { useState } from 'react';
import {
  Building2,
  Bell,
  Package,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const companySchema = z.object({
  name: z.string().min(1, 'Nazwa firmy jest wymagana'),
  address: z.string().min(1, 'Adres jest wymagany'),
  nip: z.string().min(10, 'Nieprawidłowy NIP'),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().min(9, 'Nieprawidłowy numer telefonu'),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  orderConfirmation: z.boolean(),
  lowStockAlerts: z.boolean(),
  marketingEmails: z.boolean(),
});

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('company');

  const companyForm = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: 'Kwiaciarnia Przykładowa',
      address: 'ul. Kwiatowa 1, 00-001 Warszawa',
      nip: '1234567890',
      email: 'kontakt@kwiaciarnia.pl',
      phone: '+48 123 456 789',
    },
  });

  const notificationForm = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      orderConfirmation: true,
      lowStockAlerts: true,
      marketingEmails: false,
    },
  });

  const onCompanySubmit = (data: z.infer<typeof companySchema>) => {
    toast({
      title: 'Sukces',
      description: 'Ustawienia firmy zostały zaktualizowane',
    });
  };

  const onNotificationSubmit = (data: z.infer<typeof notificationSchema>) => {
    toast({
      title: 'Sukces',
      description: 'Ustawienia powiadomień zostały zaktualizowane',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ustawienia</h1>
        <p className="text-muted-foreground">
          Zarządzaj ustawieniami aplikacji
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Firma
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Powiadomienia
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produkty
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Zamówienia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Dane firmy</CardTitle>
              <CardDescription>
                Podstawowe informacje o Twojej firmie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nazwa firmy</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adres</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="nip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Zapisz zmiany</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Powiadomienia</CardTitle>
              <CardDescription>
                Zarządzaj ustawieniami powiadomień
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Powiadomienia email</FormLabel>
                          <FormDescription>
                            Otrzymuj powiadomienia na adres email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="orderConfirmation"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Potwierdzenia zamówień</FormLabel>
                          <FormDescription>
                            Powiadomienia o nowych zamówieniach
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="lowStockAlerts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Alerty o niskim stanie</FormLabel>
                          <FormDescription>
                            Powiadomienia gdy stan magazynowy jest niski
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Zapisz zmiany</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kategorie produktów</CardTitle>
                <CardDescription>
                  Zarządzaj kategoriami produktów
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Domyślne kategorie</h4>
                      <p className="text-sm text-muted-foreground">
                        Bukiety, Kwiaty cięte, Doniczki, Dodatki
                      </p>
                    </div>
                    <Button variant="outline">Zarządzaj</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Magazyn</CardTitle>
                <CardDescription>
                  Ustawienia magazynu i stanów minimalnych
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Próg alertów</h4>
                      <p className="text-sm text-muted-foreground">
                        Powiadomienia o niskim stanie magazynowym
                      </p>
                    </div>
                    <Input
                      type="number"
                      className="w-24"
                      defaultValue="10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statusy zamówień</CardTitle>
                <CardDescription>
                  Zarządzaj statusami zamówień
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Domyślne statusy</h4>
                      <p className="text-sm text-muted-foreground">
                        Oczekujące, W realizacji, Do wydania, Zakończone
                      </p>
                    </div>
                    <Button variant="outline">Zarządzaj</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metody płatności</CardTitle>
                <CardDescription>
                  Zarządzaj dostępnymi metodami płatności
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Płatność gotówką</h4>
                      <p className="text-sm text-muted-foreground">
                        Przyjmowanie płatności gotówkowych
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Płatność kartą</h4>
                      <p className="text-sm text-muted-foreground">
                        Przyjmowanie płatności kartą
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Przelew bankowy</h4>
                      <p className="text-sm text-muted-foreground">
                        Przyjmowanie przelewów bankowych
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}