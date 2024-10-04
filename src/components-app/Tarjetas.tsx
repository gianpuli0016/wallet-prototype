import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { 
  HomeIcon, 
  CreditCardIcon, 
  PlusIcon, 
  CircleUserIcon,
  LineChartIcon,
  WalletIcon,
  InfoIcon,
  RefreshCwIcon,
  MoreHorizontalIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronRightIcon
} from "lucide-react"

export default function Tarjetas() {
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
      <aside className="w-64 bg-gray-800 p-6 hidden md:block">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-screen w-full">
        <div className="max-w-4xl mx-auto lg:max-w-3xl xl:max-w-10xl">
          {/* Header for mobile */}
          <header className="md:hidden flex justify-between items-center mb-6">
            <img src="/logoTDKpago.png" alt="TdkPago" className="h-8 " />
            <Button variant="ghost" size="icon">
              <CircleUserIcon className="h-6 w-6" />
            </Button>
          </header>

          {/* Cards Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tus tarjetas</h2>
              <Button variant="outline" size="sm" className="bg-transparent hover:bg-gray-800 text-white border-none">
                <PlusIcon className="h-4 w-4 mr-2 text-white" />
                <span className="text-sm text-white">Añadir</span>
              </Button>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold flex items-center mb-2">
                Global
                <InfoIcon className="h-4 w-4 ml-2 text-gray-400" />
              </h3>
              <Badge className="bg-gray-700 text-white">Virtual</Badge>
            </div>
            
            
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <Card className="bg-gradient-to-br from-gray-200 to-gray-700 text-gray-900 relative overflow-hidden w-full lg:w-96 h-60">
                <CardContent className="p-4">
                <img src="" alt="" className="h-6 md:h-8 mb-2 md:mb-4" />
                <p className="text-lg">UnionPay</p>
                <p className="text-sm mb-1">Balance disponible</p>
                <p className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 flex items-center">
                    {balanceVisible ? "234,56 CNY" : "••••••"}
                    <Button variant="ghost" size="sm" className="ml-2" onClick={() => setBalanceVisible(!balanceVisible)}>
                    {balanceVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                </p>
                <p className="text-sm">**** 4013</p>
                <img src="/UnionPay_logo.png" alt="UnionPay" className="absolute bottom-2 right-2 md:bottom-4 md:right-4 h-10 md:h-8" />
                </CardContent>
            </Card>

            <div className="flex justify-center lg:justify-center space-x-4 md:space-x-20 w-full md:w-auto">
                <div className="flex flex-col items-center">
                <Button variant="ghost" className="flex flex-col items-center justify-center rounded-full w-12 h-12 hover:bg-gray-800">
                    <CreditCardIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-300 mb-1" />
                </Button>
                <span className="text-xs mt-1">Detalles</span>
                </div>
                <div className="flex flex-col items-center">
                <Button variant="ghost" className="flex flex-col items-center justify-center rounded-full w-12 h-12 hover:bg-gray-800">
                    <RefreshCwIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-300 mb-1" />
                </Button>
                <span className="text-xs mt-1">Tipo de cambio</span>
                </div>
                <div className="flex flex-col items-center">
                <Button variant="ghost" className="flex flex-col items-center justify-center rounded-full w-12 h-12 hover:bg-gray-800">
                    <MoreHorizontalIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-300 mb-1" />
                </Button>
                <span className="text-xs mt-1">Más</span>
                </div>
            </div>
            </div>

          </section>

          {/* Promos Exclusivas */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Promos Exclusivas</h3>
              <Button variant="link" className="text-teal-400">
                Ver todo
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <Card className="bg-gray-800 border-none">
              <CardContent className="p-4 flex items-center">
                <img src="/casaChina.png" alt="casaChina" className="w-12 h-12 mr-4" />
                <div>
                  <h4 className="font-semibold text-white">Casa China</h4>
                  <p className="text-sm text-gray-400">30% descuento</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Últimos movimientos */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Últimos movimientos</h3>
              <Button variant="link" className="text-teal-400">
                Ver todo
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <Card className="bg-gray-800 border-none">
              <CardContent className="p-4 text-center">
                {/*<img src="/placeholder.svg?height=100&width=100" alt="No transactions" className="mx-auto mb-4" />*/}
                <p className="text-gray-400">Aún no tienes movimientos</p>
              </CardContent>
            </Card>
          </section>
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