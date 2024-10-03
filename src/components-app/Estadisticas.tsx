import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { 
  HomeIcon, 
  CreditCardIcon, 
  CircleUserIcon,
  LineChartIcon,
  WalletIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
} from "lucide-react"
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement)

// Datos de ejemplo
const monthlyData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ingresos',
      data: [3000, 3200, 2800, 3500, 3100, 3800],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Gastos',
      data: [2500, 2700, 2600, 2900, 3000, 3200],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
}

const categoryData = {
  labels: ['Comida', 'Transporte', 'Entretenimiento', 'Servicios', 'Otros'],
  datasets: [
    {
      data: [30, 20, 15, 25, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: 'rgba(0, 0, 0, 0.6)'
    },
  ],
}

const balanceData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Balance',
      data: [500, 1000, 1200, 1800, 1900, 2500],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}

export default function Estadisticas() {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 fixed h-screen overflow-y-auto hidden md:block">
        <h1 className="text-2xl font-bold mb-10">C21</h1>
        <nav className="space-y-6">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/home')}>
            <HomeIcon className="mr-2 h-5 w-5" />
            Inicio
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/movimientos')}>
            <WalletIcon className="mr-2 h-5 w-5" />
            Movimientos
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/estadisticas')}>
            <LineChartIcon className="mr-2 h-5 w-5" />
            Estadísticas
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCardIcon className="mr-2 h-5 w-5" />
            Tarjetas
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 md:ml-64 overflow-y-auto min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header for mobile */}
          <header className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">C21</h1>
            <Button variant="ghost" size="icon">
              <CircleUserIcon className="h-6 w-6" />
            </Button>
          </header>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Estadísticas Financieras</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-none text-white">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mes</SelectItem>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="1y">Último año</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$19,400</div>
                <p className="text-xs text-muted-foreground">+20.1% del mes anterior</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$16,900</div>
                <p className="text-xs text-muted-foreground">+15.2% del mes anterior</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,500</div>
                <p className="text-xs text-muted-foreground">+32.5% del mes anterior</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mayor Gasto</CardTitle>
                <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Comida</div>
                <p className="text-xs text-muted-foreground">30% del total de gastos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader>
                <CardTitle>Ingresos vs Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={monthlyData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    x: { ticks: { color: 'white' } },
                    y: { ticks: { color: 'white' } }
                  },
                  plugins: {
                    legend: { labels: { color: 'white' } }
                  }
                }} height={300} />
              </CardContent>
            </Card>
            <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
              </CardHeader>
              <CardContent >
                <Doughnut data={categoryData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: 'white' } }
                  }
                }} height={300} />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 border-neutral-800 text-white">
            <CardHeader>
              <CardTitle>Tendencia de Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={balanceData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  x: { ticks: { color: 'white' } },
                  y: { ticks: { color: 'white' } }
                },
                plugins: {
                  legend: { labels: { color: 'white' } }
                }
              }} height={300} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
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