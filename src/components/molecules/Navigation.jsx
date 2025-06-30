import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Navigation = ({ items, className = '' }) => {
  const location = useLocation()

  return (
    <nav className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isActive = location.pathname === item.path
        
        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative flex items-center">
                  <ApperIcon 
                    name={item.icon} 
                    className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`} 
                  />
                  <span className={`${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                </div>
                
                {item.badge && (
                  <div className="ml-auto">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                )}
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default Navigation