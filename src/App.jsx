import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import LandingPage from '@/components/pages/LandingPage'
import Dashboard from '@/components/pages/Dashboard'
import Clients from '@/components/pages/Clients'
import Transactions from '@/components/pages/Transactions'
import Reports from '@/components/pages/Reports'
import Invoices from '@/components/pages/Invoices'
import Documents from '@/components/pages/Documents'
import Messages from '@/components/pages/Messages'
import AdminDashboard from '@/components/pages/AdminDashboard'
import ClientDashboard from '@/components/pages/ClientDashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="documents" element={<Documents />} />
            <Route path="messages" element={<Messages />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="client" element={<ClientDashboard />} />
          </Route>
        </Routes>
      </Router>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App