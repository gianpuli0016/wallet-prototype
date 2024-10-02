import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, CreditCardIcon, HomeIcon, PieChartIcon, QrCodeIcon, UserIcon } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Encabezado */}
      <header className="bg-white p-4 shadow">
        <h1 className="text-2xl font-bold text-center">C21</h1>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Saldo disponible</p>
          <p className="text-3xl font-bold">$1,234.56</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow overflow-auto p-4">
        {/* Acciones rápidas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button variant="outline" className="flex flex-col items-center p-4">
            <ArrowUpIcon className="h-6 w-6 mb-2" />
            <span>Enviar</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4">
            <ArrowDownIcon className="h-6 w-6 mb-2" />
            <span>Recibir</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4">
            <QrCodeIcon className="h-6 w-6 mb-2" />
            <span>Escanear</span>
          </Button>
        </div>

        {/* Transacciones recientes */}
        <h2 className="text-xl font-semibold mb-4">Transacciones recientes</h2>
        <div className="space-y-4">
          {[
            { type: "ingreso", description: "Depósito", amount: 500 },
            { type: "gasto", description: "Compra en tienda", amount: 50.25 },
            { type: "ingreso", description: "Transferencia recibida", amount: 100 },
          ].map((transaction, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-4">
                <div className={`rounded-full p-2 mr-4 ${
                  transaction.type === "ingreso" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {transaction.type === "ingreso" ? (
                    <ArrowDownIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <ArrowUpIcon className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">{transaction.description}</p>
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

      {/* Barra de navegación inferior */}
      <nav className="bg-white border-t">
        <div className="flex justify-around p-2">
          <Button variant="ghost" className="flex flex-col items-center">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/movimientos')}>
            <CreditCardIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Movimientos</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <PieChartIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Estadísticas</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}