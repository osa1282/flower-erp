import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flower2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nieprawidłowe dane logowania. Spróbuj ponownie.",
      });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full mx-auto">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Flower2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Witaj w Kwiaciarni</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Zaloguj się, aby uzyskać dostęp do panelu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Nazwa użytkownika"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}