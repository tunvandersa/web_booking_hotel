import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/hook/AuthContext.jsx'
import { HotelProvider } from './components/hook/HotelContext.jsx'
createRoot(document.getElementById('root')).render(

    <AuthProvider>  
        <HotelProvider>
            <App />
        </HotelProvider>
    </AuthProvider>

)
