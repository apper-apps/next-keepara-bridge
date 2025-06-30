import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const Empty = ({ 
  title = "No data found",
  message = "Get started by adding your first item.",
  icon = "FileText",
  actionLabel = "Add New",
  onAction,
  className = ''
}) => {
  return (
    <Card className={`text-center py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-8">{message}</p>
        
        {onAction && (
          <Button
            onClick={onAction}
            icon="Plus"
            size="lg"
            className="min-w-40"
          >
            {actionLabel}
          </Button>
        )}
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="Upload" className="w-4 h-4" />
            <span>Import data</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="Download" className="w-4 h-4" />
            <span>Export templates</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="HelpCircle" className="w-4 h-4" />
            <span>Get help</span>
          </div>
        </div>
      </motion.div>
    </Card>
  )
}

export default Empty