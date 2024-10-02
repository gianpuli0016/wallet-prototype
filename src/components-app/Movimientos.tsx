import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, CircleUserIcon, HomeIcon, LineChartIcon, SearchIcon, WalletIcon } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker"
import { parseISO, isWithinInterval } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Simulación de datos de transacciones
const transactionsData = [
  { id: 1, type: "ingreso", description: "Depósito de salario", amount: 2500, date: "2023-05-01" },
  { id: 2, type: "gasto", description: "Compra en supermercado", amount: 150.75, date: "2023-05-03" },
  { id: 3, type: "ingreso", description: "Reembolso", amount: 50, date: "2023-05-05" },
  { id: 4, type: "gasto", description: "Pago de alquiler", amount: 1000, date: "2023-05-07" },
  { id: 5, type: "gasto", description: "Cena en restaurante", amount: 85.50, date: "2023-05-10" },
  // ... más transacciones
]



export default function Movimientos() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 5

  // Filtrar y ordenar transacciones
  const filteredTransactions = transactionsData
  .filter(transaction => {
    const transactionDate = parseISO(transaction.date)
    const isInDateRange = dateRange && dateRange.from && dateRange.to
      ? isWithinInterval(transactionDate, { start: dateRange.from, end: dateRange.to })
      : true

    return (
      (searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)) &&
      (typeFilter === "todos" || transaction.type === typeFilter) &&
      isInDateRange
    )
  })
  .sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return b.amount - a.amount
    }
  })

  // Calcular páginas
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Calcular totales
  const totalIngresos = filteredTransactions.reduce((sum, transaction) => 
    transaction.type === "ingreso" ? sum + transaction.amount : sum, 0
  )
  const totalGastos = filteredTransactions.reduce((sum, transaction) => 
    transaction.type === "gasto" ? sum + transaction.amount : sum, 0
  )

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
                <DropdownMenuItem onClick={() => navigate('/perfil')}>Configuración</DropdownMenuItem>
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
        <h1 className="text-2xl font-bold mb-6">Detalle de Transacciones</h1>
        
        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de transacción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ingreso">Ingresos</SelectItem>
                  <SelectItem value="gasto">Gastos</SelectItem>
                </SelectContent>
              </Select>

              <DatePickerWithRange date={dateRange} setDate={setDateRange} />

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Fecha</SelectItem>
                  <SelectItem value="amount">Monto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex">
              <Input
                type="text"
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button variant="outline">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumen */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Resumen</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Ingresos</p>
                <p className="text-lg font-bold text-green-600">${totalIngresos.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Gastos</p>
                <p className="text-lg font-bold text-red-600">${totalGastos.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de transacciones */}
        <div className="space-y-4 mb-6">
          {currentTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow duration-200">
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
                  <p className="text-sm text-gray-500">{transaction.date}</p>
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

        {/* Paginación */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Siguiente
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
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
          <Button variant="ghost" className="flex flex-col items-center">
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}