import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CircleUserIcon, HomeIcon, LineChartIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, WalletIcon } from "lucide-react"
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement)

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Estadísticas Financieras</h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$19,400</div>
              <p className="text-xs text-muted-foreground">+20.1% del mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$16,900</div>
              <p className="text-xs text-muted-foreground">+15.2% del mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,500</div>
              <p className="text-xs text-muted-foreground">+32.5% del mes anterior</p>
            </CardContent>
          </Card>
          <Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Ingresos vs Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={balanceData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          </CardContent>
        </Card>
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