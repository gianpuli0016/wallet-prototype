import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { 
  HomeIcon, 
  CreditCardIcon, 
  PlusIcon, 
  ArrowUpIcon, 
  EyeIcon, 
  EyeOffIcon,
  CircleUserIcon,
  ArrowDownIcon,
  LineChartIcon,
  WalletIcon
} from "lucide-react"

export default function Inicio() {
  const navigate = useNavigate()
  const [balanceVisible, setBalanceVisible] = useState(true)

  const SidebarContent = () => (
    <>
      <img src="/logoTDKpago.png" alt="TdkPago" className="h-8 mb-6" />
      <nav className="space-y-4">
        <Button variant="ghost" className="w-full justify-start text-white" onClick={() => navigate('/home')}>
          <HomeIcon className="mr-2 h-5 w-5" />
          Inicio
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white" onClick={() => navigate('/movimientos')}>
          <WalletIcon className="mr-2 h-5 w-5" />
          Movimientos
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white" onClick={() => navigate('/estadisticas')}>
          <LineChartIcon className="mr-2 h-5 w-5" />
          Estadísticas
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white" onClick={() => navigate('/tarjetas')}>
          <CreditCardIcon className="mr-2 h-5 w-5" />
          Tarjetas
        </Button>
      </nav>
    </>
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar for larger screens */}
      <aside className="w-64 bg-gray-800 p-6 hidden md:block md:fixed md:h-screen md:overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 overflow-y-auto min-h-screen w-full">
        <div className="max-w-4xl mx-auto lg:max-w-3xl xl:max-w-10xl">
          {/* Header for mobile */}
          <header className="md:hidden flex justify-between items-center mb-6">
            <img src="/logoTDKpago.png" alt="TdkPago" className="h-8 " />
            <Button variant="ghost" size="icon">
              <CircleUserIcon className="h-6 w-6" />
            </Button>
          </header>

          {/* User Level */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold">
                GP
              </div>
              <div>
                <h2 className="text-xl font-semibold">Standard 100</h2>
                <p className="text-gray-400 text-sm">2900 Puntos para Silver</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? <EyeOffIcon className="mb-0 h-5 w-5" /> : <EyeIcon className="mb-0 h-5 w-5" />}
            </Button>
          </div>

          {/* Total Balance */}
          <Card className="bg-transparent mb-8 border-none">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">Saldo Total</h3>
              <p className="text-4xl font-bold text-white">
                {balanceVisible ? "$33,459.35" : "••••••"}
              </p>
            </CardContent>
          </Card>

          {/* Accounts */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Cuentas</h3>
            <Button variant="outline" size="sm" className="bg-transparent hover:bg-gray-800 transition-colors duration-200 text-white border-none">
              <PlusIcon className="h-4 w-4 mr-2 text-white" />
              <span className="text-sm text-white">Añadir</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card className="bg-gray-800 border-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src="/argentina.png" alt="ARS" className="mr-2" height="24" width="24" />
                    <span className="font-semibold text-white">ARS</span>
                  </div>
                  <span className="text-gray-400">Disponible</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {balanceVisible ? "$1,000.00" : "••••••"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src="/porcelana.png" alt="CNY" className="mr-2" height="24" width="24"  />
                    <span className="font-semibold text-white">CNY</span>
                  </div>
                  <span className="text-gray-400">Disponible</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {balanceVisible ? "$234.56" : "••••••"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
         
          <div className="flex justify-evenly mb-10">
            <div className="flex flex-col items-center">
              <Button className="flex items-center justify-center rounded-full w-12 h-12 bg-teal-500 hover:bg-teal-600">
                <ArrowDownIcon className="h-6 w-6 text-white" />
              </Button>
              <span className="text-sm text-white mt-1">Ingresar</span>
            </div>
            <div className="flex flex-col items-center">
              <Button className="flex items-center justify-center rounded-full w-12 h-12 bg-teal-500 hover:bg-teal-600">
                <ArrowUpIcon className="h-6 w-6 text-white" />
              </Button>
              <span className="text-sm text-white mt-1">Enviar</span>
            </div>
            <div className="flex flex-col items-center">
              <Button className="flex items-center justify-center rounded-full w-12 h-12 bg-teal-500 hover:bg-teal-600">
                <PlusIcon className="h-6 w-6 text-white" />
              </Button>
              <span className="text-sm text-white mt-1">Más</span>
            </div>
          </div>

          {/* Recent Transactions */}
          <h3 className="text-xl font-semibold mb-4">Transacciones recientes</h3>
          <div className="space-y-4 mb-8">
            {[
              { type: "ingreso", description: "Depósito", amount: 500, date: "2023-05-01" },
              { type: "gasto", description: "Compra en tienda", amount: 50.25, date: "2023-05-03" },
              { type: "ingreso", description: "Transferencia recibida", amount: 100, date: "2023-05-05" },
            ].map((transaction, index) => (
              <Card key={index} className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-none">
                <CardContent className="flex items-center p-4">
                  <div className={`rounded-full p-3 mr-4 ${
                    transaction.type === "ingreso" ? "bg-teal-200" : "bg-pink-200"
                  }`}>
                    {transaction.type === "ingreso" ? (
                      <ArrowDownIcon className="h-6 w-6 text-teal-500" />
                    ) : (
                      <ArrowUpIcon className="h-6 w-6 text-pink-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-200">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === "ingreso" ? "text-teal-300" : "text-pink-500"
                  }`}>
                    {transaction.type === "ingreso" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Promotions and News */}
          <h3 className="text-xl font-semibold mb-4">Promociones y Noticias</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Tus vacaciones ganan puntos", image: "/undraw_travel_mode_re_2lxo.svg", link: "¡Empieza ahora!" },
              { title: "40% de Descuento con tu tarjeta", image: "/undraw_online_payments_re_y8f2.svg", link: "Solo con este link" },
              { title: "Hacé rendir tu dinero más fácil", image: "/undraw_mobile_analytics_twab.svg", link: "Pruébalo ahora" },
              { title: "Pagá tus cuentas y servicios", image: "/undraw_mobile_payments_re_7udl.svg", link: "Pruébalo ahora" },
            ].map((promo, index) => (
              <Card key={index} className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-none text-white">
                <CardContent className="p-4">
                  <img src={promo.image} alt={promo.title} className="w-full h-32 object-cover mb-4 rounded" />
                  <h4 className="font-semibold mb-2">{promo.title}</h4>
                  <Button variant="link" className="text-teal-400 p-0">
                    {promo.link}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around p-2">
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/home')}>
            
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/movimientos')}>
            
            <span className="text-xs mt-1">Movimientos</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/estadisticas')}>
            
            <span className="text-xs mt-1">Estadísticas</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate('/tarjetas')}>
            
            <span className="text-xs mt-1">Tarjetas</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}