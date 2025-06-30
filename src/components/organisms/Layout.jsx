import React, { useState, useEffect, useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/components/organisms/Sidebar'
import MobileNavigation from '@/components/molecules/MobileNavigation'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { AuthContext } from '@/App'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  // Determine user role from path
  const getUserRole = () => {
    if (location.pathname.includes('/admin')) return 'admin'
    if (location.pathname.includes('/client')) return 'client'
    return 'bookkeeper'
  }

  const userRole = getUserRole()

  // Navigation items based on role
  const getNavigationItems = (role) => {
    switch (role) {
      case 'admin':
        return [
          { path: '/app/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
          { path: '/app/admin/users', label: 'Users', icon: 'Users' },
          { path: '/app/admin/subscriptions', label: 'Subscriptions', icon: 'CreditCard' },
          { path: '/app/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
          { path: '/app/admin/settings', label: 'Settings', icon: 'Settings' }
        ]
      case 'client':
        return [
          { path: '/app/client', label: 'Overview', icon: 'LayoutDashboard' },
          { path: '/app/client/reports', label: 'Reports', icon: 'FileText' },
          { path: '/app/client/documents', label: 'Documents', icon: 'FolderOpen' },
          { path: '/app/client/invoices', label: 'Invoices', icon: 'Receipt' },
          { path: '/app/client/messages', label: 'Messages', icon: 'MessageSquare', badge: '3' }
        ]
      default: // bookkeeper
        return [
          { path: '/app', label: 'Dashboard', icon: 'LayoutDashboard' },
          { path: '/app/clients', label: 'Clients', icon: 'Users' },
          { path: '/app/transactions', label: 'Transactions', icon: 'CreditCard' },
          { path: '/app/reports', label: 'Reports', icon: 'FileText' },
          { path: '/app/invoices', label: 'Invoices', icon: 'Receipt' },
          { path: '/app/documents', label: 'Documents', icon: 'FolderOpen' },
          { path: '/app/messages', label: 'Messages', icon: 'MessageSquare', badge: '5' }
        ]
    }
  }

  const navigationItems = getNavigationItems(userRole)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        navigationItems={navigationItems}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                icon="Menu"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              />
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

<div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" icon="Bell" className="relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="sm" icon="Search" className="hidden sm:flex" />
              
              <Button 
                variant="ghost" 
                size="sm" 
                icon="LogOut"
                onClick={() => {
                  const { logout } = useContext(AuthContext)
                  logout()
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation 
          items={navigationItems}
          className="lg:hidden"
        />
      )}
    </div>
  )
}

export default Layout