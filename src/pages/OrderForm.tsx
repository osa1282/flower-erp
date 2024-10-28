import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const orderSchema = z.object({
  customerType: z.enum(["individual", "business"]),
  customerName: z.string().min(1, "Nazwa klienta jest wymagana"),
  companyName: z.string().optional(),
  nip: z.string().optional(),
  pickupDate: z.string().min(1, "Data odbioru jest wymagana"),
  pickupTime: z.string().min(1, "Godzina odbioru jest wymagana"),
  notes: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const defaultValues: Partial<OrderFormValues> = {
  customerType: "individual",
};

// Mock products data
const products = [
  {
    id: "1",
    name: "Bukiet róż czerwonych",
    price: 129.99,
    category: "Bukiety",
  },
  {
    id: "2",
    name: "Tulipany mix",
    price: 89.99,
    category: "Bukiety",
  },
  // Add more products...
];

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues,
  });

  const customerType = form.watch("customerType");

  const addItem = (product: typeof products[0]) => {
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      setItems(items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, {
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
      }]);
    }
    setIsProductDialogOpen(false);
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item =>
      item.id === itemId
        ? { ...item, quantity }
        : item
    ));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const onSubmit = (data: OrderFormValues) => {
    const orderData = {
      ...data,
      items,
      total,
      status: "pending" as const,
      pickupDate: `${data.pickupDate}T${data.pickupTime}`,
    };
    
    console.log("Order data:", orderData);
    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edytuj zamówienie" : "Nowe zamówienie"}
        </h2>
        <p className="text-muted-foreground">
          {isEditing
            ? "Zaktualizuj szczegóły zamówienia"
            : "Wypełnij formularz, aby utworzyć nowe zamówienie"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="customerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ klienta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ klienta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="individual">Klient indywidualny</SelectItem>
                      <SelectItem value="business">Firma</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {customerType === "individual" ? "Imię i nazwisko" : "Osoba kontaktowa"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {customerType === "business" && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
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
                  control={form.control}
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
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data odbioru</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Godzina odbioru</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Produkty</h3>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button">
                    <Plus className="w-4 h-4 mr-2" />
                    Dodaj produkt
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj produkt</DialogTitle>
                  </DialogHeader>
                  <Command>
                    <CommandInput placeholder="Szukaj produktu..." />
                    <CommandEmpty>Nie znaleziono produktów</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => addItem(product)}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <div>{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.category}
                            </div>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(product.price)}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead className="w-[100px]">Ilość</TableHead>
                  <TableHead className="text-right">Cena</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Brak produktów w zamówieniu
                    </TableCell>
                  </TableRow>
                )}
                {items.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="font-medium">
                      Razem
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(total)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uwagi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dodatkowe informacje o zamówieniu..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Dodaj specjalne instrukcje lub uwagi do zamówienia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/orders")}
            >
              Anuluj
            </Button>
            <Button type="submit">
              {isEditing ? "Zapisz zmiany" : "Utwórz zamówienie"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}