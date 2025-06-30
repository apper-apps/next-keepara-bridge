import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Navigation from '@/components/molecules/Navigation'

const Sidebar = ({ isOpen, onClose, navigationItems, userRole = 'bookkeeper' }) => {
  const roleConfig = {
    admin: {
      title: 'Admin Portal',
      subtitle: 'Platform Management'
    },
    bookkeeper: {
      title: 'Keepara',
      subtitle: 'Professional Bookkeeping'
    },
    client: {
      title: 'Client Portal',
      subtitle: 'Financial Overview'
    }
  }

  const config = roleConfig[userRole]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className={`
          fixed top-0 left-0 h-full w-80 bg-white shadow-elevation z-50
          lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{config.title}</h1>
                <p className="text-sm text-gray-500">{config.subtitle}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Navigation items={navigationItems} />
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userRole === 'admin' ? 'Admin User' : userRole === 'client' ? 'Client User' : 'Sarah Johnson'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userRole === 'admin' ? 'Platform Administrator' : userRole === 'client' ? 'client@example.com' : 'Certified Bookkeeper'}
                </p>
              </div>
              <button className="p-1 rounded-md hover:bg-gray-200 transition-colors duration-200">
                <ApperIcon name="Settings" className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar