import './App.css'
import './index.css'
import Navbar from './layouts/Navbar'
import AppRoutes from './routes/index'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <AppRoutes />
    </div>
  )
}

export default App
