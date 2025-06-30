import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const MetricCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  iconColor = 'text-primary-500',
  trend,
  className = ''
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <Card className={`metric-card ${className}`} hover={true}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center space-x-1">
              <ApperIcon 
                name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                className={`w-4 h-4 ${changeColors[changeType]}`} 
              />
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100`}>
            <ApperIcon name={icon} className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Trend</span>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${trend}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-xs">{trend}%</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default MetricCard