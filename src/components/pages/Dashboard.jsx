import React, { useState, useEffect } from 'react'
import MetricCard from '@/components/molecules/MetricCard'
import DataTable from '@/components/molecules/DataTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const Dashboard = () => {
  const [metrics, setMetrics] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [recentClients, setRecentClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Mock metrics data
      setMetrics([
        {
          title: 'Total Revenue',
          value: '$47,283',
          change: '+12.3%',
          changeType: 'positive',
          icon: 'DollarSign',
          iconColor: 'text-green-500',
          trend: 85
        },
        {
          title: 'Active Clients',
          value: '24',
          change: '+3',
          changeType: 'positive',
          icon: 'Users',
          iconColor: 'text-blue-500',
          trend: 72
        },
        {
          title: 'Pending Invoices',
          value: '$8,450',
          change: '-2.1%',
          changeType: 'negative',
          icon: 'Receipt',
          iconColor: 'text-orange-500',
          trend: 45
        },
        {
          title: 'Reconciled Today',
          value: '156',
          change: '+24',
          changeType: 'positive',
          icon: 'CheckCircle',
          iconColor: 'text-accent-500',
          trend: 95
        }
      ])

      // Mock recent transactions
      setRecentTransactions([
        {
          Id: 1,
          description: 'Office Supplies - Staples',
          amount: -245.67,
          category: 'Office Expenses',
          client: 'Acme Corp',
          date: new Date(),
          reconciled: true
        },
        {
          Id: 2,
          description: 'Monthly Consulting Fee',
          amount: 2500.00,
          category: 'Revenue',
          client: 'Tech Solutions Inc',
          date: new Date(Date.now() - 86400000),
          reconciled: false
        },
        {
          Id: 3,
          description: 'Internet Service',
          amount: -89.99,
          category: 'Utilities',
          client: 'Local Business',
          date: new Date(Date.now() - 172800000),
          reconciled: true
        },
        {
          Id: 4,
          description: 'Client Retainer',
          amount: 1200.00,
          category: 'Revenue',
          client: 'Marketing Agency',
          date: new Date(Date.now() - 259200000),
          reconciled: false
        }
      ])

      // Mock recent clients
      setRecentClients([
        {
          Id: 1,
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          lastActivity: 'Today',
          status: 'active',
          revenue: '$12,450'
        },
        {
          Id: 2,
          name: 'Tech Solutions Inc',
          email: 'hello@techsolutions.com',
          lastActivity: '2 days ago',
          status: 'active',
          revenue: '$8,230'
        },
        {
          Id: 3,
          name: 'Local Business',
          email: 'info@localbiz.com',
          lastActivity: '1 week ago',
          status: 'inactive',
          revenue: '$3,450'
        }
      ])
      
    } catch (err) {
      setError('Failed to load dashboard data')
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const transactionColumns = [
    {
      header: 'Transaction',
      key: 'description',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.client}</div>
        </div>
      )
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (value) => (
        <span className={`font-medium ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value >= 0 ? '+' : ''}${Math.abs(value).toLocaleString()}
        </span>
      )
    },
    {
      header: 'Category',
      key: 'category',
      render: (value) => (
        <Badge variant="default">{value}</Badge>
      )
    },
    {
      header: 'Date',
      key: 'date',
      render: (value) => format(new Date(value), 'MMM dd, yyyy')
    },
    {
      header: 'Status',
      key: 'reconciled',
      render: (value) => (
        <Badge variant={value ? 'success' : 'warning'}>
          {value ? 'Reconciled' : 'Pending'}
        </Badge>
      )
    }
  ]

  const clientColumns = [
    {
      header: 'Client',
      key: 'name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {value.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Revenue',
      key: 'revenue',
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      header: 'Last Activity',
      key: 'lastActivity'
    },
    {
      header: 'Status',
      key: 'status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Dashboard Error" message={error} onRetry={loadDashboardData} />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Good morning, Sarah! 👋</h1>
            <p className="text-primary-100">
              Here's what's happening with your bookkeeping practice today.
            </p>
          </div>
          <div className="hidden md:block">
            <ApperIcon name="TrendingUp" className="w-16 h-16 text-white/20" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" icon="Plus" className="h-12">
            Add Transaction
          </Button>
          <Button variant="secondary" icon="Receipt" className="h-12">
            Create Invoice
          </Button>
          <Button variant="secondary" icon="Upload" className="h-12">
            Upload Document
          </Button>
          <Button variant="secondary" icon="FileText" className="h-12">
            Generate Report
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Button variant="ghost" size="sm" icon="ExternalLink">
              View All
            </Button>
          </div>
          
          {recentTransactions.length === 0 ? (
            <Empty 
              title="No transactions yet"
              message="Start by adding your first transaction"
              icon="CreditCard"
              actionLabel="Add Transaction"
            />
          ) : (
            <DataTable
              columns={transactionColumns}
              data={recentTransactions.slice(0, 5)}
              className="shadow-none border-0"
            />
          )}
        </Card>

        {/* Recent Clients */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
            <Button variant="ghost" size="sm" icon="ExternalLink">
              View All
            </Button>
          </div>
          
          {recentClients.length === 0 ? (
            <Empty 
              title="No clients yet"
              message="Add your first client to get started"
              icon="Users"
              actionLabel="Add Client"
            />
          ) : (
            <DataTable
              columns={clientColumns}
              data={recentClients.slice(0, 5)}
              className="shadow-none border-0"
            />
          )}
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Button variant="ghost" size="sm" icon="MoreHorizontal" />
        </div>
        
        <div className="space-y-4">
          {[
            {
              action: 'Transaction reconciled',
              description: 'Office Supplies - Staples for Acme Corp',
              time: '2 minutes ago',
              icon: 'CheckCircle',
              color: 'text-green-500'
            },
            {
              action: 'Invoice sent',
              description: 'Monthly consulting fee to Tech Solutions Inc',
              time: '1 hour ago',
              icon: 'Send',
              color: 'text-blue-500'
            },
            {
              action: 'Document uploaded',
              description: 'Receipt for office supplies',
              time: '3 hours ago',
              icon: 'Upload',
              color: 'text-purple-500'
            },
            {
              action: 'New client added',
              description: 'Marketing Agency joined your practice',
              time: 'Yesterday',
              icon: 'UserPlus',
              color: 'text-accent-500'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                <ApperIcon name={activity.icon} className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500 truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard