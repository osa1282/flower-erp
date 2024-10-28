import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Flower2,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Navbar from "./Navbar";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Panel główny", path: "/dashboard" },
  { icon: Flower2, label: "Produkty", path: "/products" },
  { icon: ShoppingCart, label: "Zamówienia", path: "/orders" },
  { icon: Users, label: "Klienci", path: "/customers" },
  { icon: Package, label: "Magazyn", path: "/inventory" },
  { icon: Settings, label: "Ustawienia", path: "/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <Flower2 className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-semibold">Kwiaciarnia</span>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-base text-muted-foreground hover:text-foreground",
                    location.pathname === item.path && "bg-accent text-foreground"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="border-t p-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Wyloguj
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 pl-64">
          <Navbar />
          <main className="w-full">
            <div className="max-w-[1200px] mx-auto px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}