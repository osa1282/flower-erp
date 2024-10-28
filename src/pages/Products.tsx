import { useState } from "react";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ProductStatus, type Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

const products: Product[] = [
  {
    id: "1",
    name: "Bukiet róż czerwonych",
    description: "Klasyczny bukiet 12 czerwonych róż",
    price: 129.99,
    status: ProductStatus.ACTIVE,
    stock: 15,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80",
    category: "Bukiety"
  },
  {
    id: "2",
    name: "Bukiet tulipanów",
    description: "Wiosenny bukiet różnokolorowych tulipanów",
    price: 89.99,
    status: ProductStatus.ACTIVE,
    stock: 20,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80",
    category: "Bukiety"
  },
  {
    id: "3",
    name: "Storczyk biały",
    description: "Elegancki storczyk w doniczce",
    price: 159.99,
    status: ProductStatus.LOW_STOCK,
    stock: 3,
    image: "https://images.unsplash.com/photo-1566983742257-e0e8836bd75d?auto=format&fit=crop&q=80",
    category: "Doniczkowe"
  },
];

function Products() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: ProductStatus) => {
    const statusConfig = {
      [ProductStatus.ACTIVE]: { label: "Aktywny", variant: "success" },
      [ProductStatus.INACTIVE]: { label: "Nieaktywny", variant: "secondary" },
      [ProductStatus.LOW_STOCK]: { label: "Niski stan", variant: "warning" },
      [ProductStatus.OUT_OF_STOCK]: { label: "Brak w magazynie", variant: "destructive" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant as "success" | "secondary" | "warning" | "destructive"}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Produkty</h2>
          <p className="text-muted-foreground">
            Zarządzaj produktami w swojej kwiaciarni
          </p>
        </div>
        <Button onClick={() => navigate("/products/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj produkt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col h-[400px]">
            <div className="relative w-full h-48">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                loading="lazy"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(product.status)}
              </div>
            </div>
            <CardHeader className="flex-1">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 flex-1 min-w-0">
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <span className="sr-only">Otwórz menu</span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                      >
                        <path
                          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/products/edit/${product.id}`)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edytuj
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Dezaktywuj
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Usuń
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{formatCurrency(product.price)}</div>
                <div className="text-sm text-muted-foreground">
                  Dostępne: {product.stock} szt.
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;