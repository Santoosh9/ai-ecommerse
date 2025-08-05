import './App.css'
import './index.css'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import AppRoutes from './routes/index'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
