import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Products from '@/pages/Products';
import ProductForm from '@/pages/ProductForm';
import Orders from '@/pages/Orders';
import OrderForm from '@/pages/OrderForm';
import Customers from '@/pages/Customers';
import CustomerDetails from '@/pages/CustomerDetails';
import CustomerForm from '@/pages/CustomerForm';
import Inventory from '@/pages/Inventory';
import InventoryForm from '@/pages/InventoryForm';
import Settings from '@/pages/Settings';
import DashboardLayout from '@/components/layout/DashboardLayout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="flower-shop-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Products />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ProductForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ProductForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Orders />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/new"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrderForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/edit/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrderForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Customers />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/new"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <CustomerForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/edit/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <CustomerForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <CustomerDetails />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Inventory />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/add"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <InventoryForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/edit/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <InventoryForm />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}