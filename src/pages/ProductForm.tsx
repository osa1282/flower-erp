import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, X } from "lucide-react";
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

const productSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(1, "Opis jest wymagany"),
  price: z.string().min(1, "Cena jest wymagana"),
  status: z.enum(["active", "inactive", "draft"]),
  category: z.string().min(1, "Kategoria jest wymagana"),
  imageUrl: z.string().url("Nieprawidłowy URL zdjęcia").optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultValues: Partial<ProductFormValues> = {
  status: "active",
  category: "bukiety",
};

interface Subproduct {
  id: string;
  name: string;
  quantity: number;
}

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data);
    console.log("Subproducts:", subproducts);
    navigate("/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edytuj produkt" : "Dodaj nowy produkt"}
        </h2>
        <p className="text-muted-foreground">
          {isEditing
            ? "Zaktualizuj informacje o produkcie"
            : "Wypełnij formularz, aby dodać nowy produkt"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa produktu</FormLabel>
                  <FormControl>
                    <Input placeholder="Bukiet róż" {...field} />
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
                  <FormLabel>Cena (PLN)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="99.99" {...field} />
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
                      <SelectItem value="bukiety">Bukiety</SelectItem>
                      <SelectItem value="kwiaty-ciete">Kwiaty cięte</SelectItem>
                      <SelectItem value="doniczki">Doniczki</SelectItem>
                      <SelectItem value="dodatki">Dodatki</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Aktywny</SelectItem>
                      <SelectItem value="inactive">Nieaktywny</SelectItem>
                      <SelectItem value="draft">Szkic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Opisz produkt..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL zdjęcia</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  Wprowadź URL zdjęcia produktu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Półprodukty</h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button">
                    <Plus className="w-4 h-4 mr-2" />
                    Dodaj półprodukt
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj półprodukt</DialogTitle>
                  </DialogHeader>
                  {/* Dialog content for adding subproducts */}
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa</TableHead>
                  <TableHead>Ilość</TableHead>
                  <TableHead className="w-[100px]">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subproducts.map((subproduct) => (
                  <TableRow key={subproduct.id}>
                    <TableCell>{subproduct.name}</TableCell>
                    <TableCell>{subproduct.quantity}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSubproducts(
                            subproducts.filter((sp) => sp.id !== subproduct.id)
                          );
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Anuluj
            </Button>
            <Button type="submit">
              {isEditing ? "Zapisz zmiany" : "Dodaj produkt"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProductForm;