import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, LineChartIcon, WalletIcon, CircleUserIcon, HomeIcon, QrCodeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">C21</h1>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" className="text-sm" onClick={() => navigate('/home')}>
              <HomeIcon className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            <Button variant="ghost" className="text-sm" onClick={() => navigate('/movimientos')}>
              <WalletIcon className="w-4 h-4 mr-2" />
              Movimientos
            </Button>
            <Button variant="ghost" className="text-sm" onClick={() => navigate('/estadisticas')}>
              <LineChartIcon className="w-4 h-4 mr-2" />
              Estadísticas
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <CircleUserIcon className="h-6 w-6" />
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Balance Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Saldo disponible</h2>
            <p className="text-4xl font-bold text-primary">$1,234.56</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <ArrowUpIcon className="h-8 w-8 mb-2 text-green-600" />
            <span>Enviar</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <ArrowDownIcon className="h-8 w-8 mb-2 text-blue-600" />
            <span>Recibir</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <QrCodeIcon className="h-8 w-8 mb-2 text-purple-600" />
            <span>Escanear</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <h2 className="text-2xl font-semibold mb-4">Transacciones recientes</h2>
        <div className="space-y-4">
          {[
            { type: "ingreso", description: "Depósito", amount: 500 },
            { type: "gasto", description: "Compra en tienda", amount: 50.25 },
            { type: "ingreso", description: "Transferencia recibida", amount: 100 },
          ].map((transaction, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="flex items-center p-4">
                <div className={`rounded-full p-3 mr-4 ${
                  transaction.type === "ingreso" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {transaction.type === "ingreso" ? (
                    <ArrowDownIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <ArrowUpIcon className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <p className={`font-semibold ${
                  transaction.type === "ingreso" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "ingreso" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-2">
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/home')}>
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/movimientos')}>
            <WalletIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Movimientos</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/estadisticas')}>
            <LineChartIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Estadísticas</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <CircleUserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}