import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Routes.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
   <RouterProvider router={Router}></RouterProvider>
   </QueryClientProvider>
  </React.StrictMode>
  </AuthProvider>
)
