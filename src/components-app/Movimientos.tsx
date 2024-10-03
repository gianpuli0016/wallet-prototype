import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  HomeIcon, 
  CreditCardIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  CircleUserIcon,
  LineChartIcon,
  WalletIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { DateRange } from "react-day-picker"

// Simulación de datos de transacciones
const transactionsData = [
  { id: 1, type: "ingreso", description: "Depósito de salario", amount: 2500, date: "2023-05-01" },
  { id: 2, type: "gasto", description: "Compra en supermercado", amount: 150.75, date: "2023-05-03" },
  { id: 3, type: "ingreso", description: "Reembolso", amount: 50, date: "2023-05-05" },
  { id: 4, type: "gasto", description: "Pago de alquiler", amount: 1000, date: "2023-05-07" },
  { id: 5, type: "gasto", description: "Cena en restaurante", amount: 85.50, date: "2023-05-10" },
]

export default function Movimientos() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 5

  // Filtrar y ordenar transacciones
  const filteredTransactions = transactionsData.filter(transaction => 
    (searchTerm === "" || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)) &&
    (typeFilter === "todos" || transaction.type === typeFilter)
  ).sort((a, b) => {
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

          <h1 className="text-2xl font-bold mb-6">Detalle de Transacciones</h1>
          
          {/* Filtros y búsqueda */}
          <Card className="bg-gray-800 mb-6 border-none">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-gray-700 border-none text-white">
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
                  <SelectTrigger className="bg-gray-700 border-none text-white">
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
                  className="flex-grow mr-2 bg-gray-700 border-none text-white placeholder-gray-400"
                />
                <Button variant="outline" className="bg-gray-700 border-none text-white">
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="bg-transparent hover:bg-gray-800 transition-colors duration-200 mb-6 border-none">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-white">Resumen</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Total Ingresos</p>
                  <p className="text-lg font-bold text-teal-500">${totalIngresos.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Gastos</p>
                  <p className="text-lg font-bold text-pink-600">${totalGastos.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de transacciones */}
          <div className="space-y-4 mb-6">
            {currentTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-transparent hover:bg-gray-800 transition-colors duration-200 mb-6 border-none">
                <CardContent className="flex items-center p-4">
                  <div className={`rounded-full p-3 mr-4 ${
                    transaction.type === "ingreso" ? "bg-teal-200" : "bg-pink-200"
                  }`}>
                    {transaction.type === "ingreso" ? (
                      <ArrowDownIcon className="h-6 w-6 text-teal-600" />
                    ) : (
                      <ArrowUpIcon className="h-6 w-6 text-pink-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === "ingreso" ? "text-teal-500" : "text-pink-600"
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
              className="bg-gray-800 border-none text-white"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <span>Página {currentPage} de {totalPages}</span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="bg-gray-800 border-none text-white"
            >
              Siguiente
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
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
          <Button variant="ghost" className="flex flex-col items-center">
            
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}