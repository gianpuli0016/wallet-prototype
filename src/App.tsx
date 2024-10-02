import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
//import { RootState } from './store';
import Home from '@/components-app/Home';
import Movimientos from '@/components-app/Movimientos';
import Estadisticas from '@/components-app/Estadisticas';

/*
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
*/

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;