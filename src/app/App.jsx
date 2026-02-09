import { BrowserRouter } from 'react-router-dom'
import '../styles/components.scss'
import AppRoutes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

