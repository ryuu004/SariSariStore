import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import MobileTabBar from './components/MobileTabBar.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="container py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-900">SariSari IMS</Link>
            <nav className="flex items-center gap-2">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-gray-900  rounded-md transition">Home</Link>
              <Link to="/inventory" className="px-3 py-2 text-gray-700 hover:text-gray-900 rounded-md transition">Inventory</Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 sm:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>

        {/* Mobile bottom tabs */}
        <MobileTabBar />
      </div>
    </Router>
  );
}

export default App;

