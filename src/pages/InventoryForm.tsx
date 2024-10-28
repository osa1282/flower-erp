import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const inventorySchema = z.object({
  name: z.string().min(1, 'Nazwa jest wymagana'),
  category: z.string().min(1, 'Kategoria jest wymagana'),
  sku: z.string().min(1, 'SKU jest wymagane'),
  currentStock: z.string().min(1, 'Stan magazynowy jest wymagany'),
  minimumStock: z.string().min(1, 'Minimalny stan jest wymagany'),
  unit: z.enum(['szt', 'kg', 'g', 'm']),
  location: z.string().min(1, 'Lokalizacja jest wymagana'),
  supplier: z.string().optional(),
  price: z.string().min(1, 'Cena jest wymagana'),
  notes: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

const defaultValues: Partial<InventoryFormValues> = {
  unit: 'szt',
  category: 'Kwiaty cięte',
};

export default function InventoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: isEditing
      ? {
          name: 'Róże czerwone',
          category: 'Kwiaty cięte',
          sku: 'KW-ROZ-001',
          currentStock: '150',
          minimumStock: '50',
          unit: 'szt',
          location: 'Chłodnia A1',
          supplier: 'Hurtownia Kwiatowa ABC',
          price: '3.50',
          notes: 'Premium quality',
        }
      : defaultValues,
  });

  const onSubmit = (data: InventoryFormValues) => {
    console.log('Form submitted:', data);
    navigate('/inventory');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edytuj produkt' : 'Dodaj nowy produkt'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? 'Zaktualizuj informacje o produkcie'
              : 'Wypełnij formularz, aby dodać nowy produkt do magazynu'}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa produktu</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kwiaty cięte">Kwiaty cięte</SelectItem>
                        <SelectItem value="Dodatki">Dodatki</SelectItem>
                        <SelectItem value="Doniczki">Doniczki</SelectItem>
                        <SelectItem value="Narzędzia">Narzędzia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jednostka</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz jednostkę" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="szt">Sztuka</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="g">Gram</SelectItem>
                        <SelectItem value="m">Metr</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stan magazynowy</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minimumStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimalny stan</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena jednostkowa (PLN)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokalizacja</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dostawca</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uwagi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dodatkowe informacje o produkcie..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Dodaj ważne informacje o produkcie, specyfikacje, itp.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/inventory')}
              >
                Anuluj
              </Button>
              <Button type="submit">
                {isEditing ? 'Zapisz zmiany' : 'Dodaj produkt'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}