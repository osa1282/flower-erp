import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Flower2,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

const stats = [
  {
    title: "Całkowita sprzedaż",
    value: "12 345 zł",
    description: "↗️ 12% więcej niż w zeszłym miesiącu",
    icon: TrendingUp,
  },
  {
    title: "Aktywne zamówienia",
    value: "25",
    description: "4 oczekuje na dostawę",
    icon: ShoppingCart,
  },
  {
    title: "Produkty",
    value: "156",
    description: "12 na wyczerpaniu",
    icon: Flower2,
  },
  {
    title: "Klienci",
    value: "1 234",
    description: "↗️ 48 nowych w tym miesiącu",
    icon: Users,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Panel główny</h2>
        <p className="text-muted-foreground">
          Witaj z powrotem! Oto przegląd Twojej kwiaciarni.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ostatnie zamówienia</CardTitle>
            <CardDescription>
              Najnowsze zamówienia od klientów
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Pakiet ślubny</p>
                  <p className="text-sm text-muted-foreground">
                    Zamówienie #1234 - Anna Kowalska
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Bukiet urodzinowy</p>
                  <p className="text-sm text-muted-foreground">
                    Zamówienie #1233 - Jan Nowak
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nadchodzące dostawy</CardTitle>
            <CardDescription>
              Zaplanowane dostawy na dziś
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Bukiet róż</p>
                  <p className="text-sm text-muted-foreground">
                    14:00 - ul. Główna 123
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Bukiet rocznicowy</p>
                  <p className="text-sm text-muted-foreground">
                    16:30 - ul. Dębowa 456
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}