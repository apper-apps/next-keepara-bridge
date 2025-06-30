import React, { useState, useEffect } from 'react'
import MetricCard from '@/components/molecules/MetricCard'
import DataTable from '@/components/molecules/DataTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState([])
  const [users, setUsers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAdminData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Mock admin metrics
      setMetrics([
        {
          title: 'Monthly Recurring Revenue',
          value: '$127,450',
          change: '+18.2%',
          changeType: 'positive',
          icon: 'DollarSign',
          iconColor: 'text-green-500',
          trend: 92
        },
        {
          title: 'Total Users',
          value: '2,847',
          change: '+156',
          changeType: 'positive',
          icon: 'Users',
          iconColor: 'text-blue-500',
          trend: 78
        },
        {
          title: 'Active Subscriptions',
          value: '1,923',
          change: '+89',
          changeType: 'positive',
          icon: 'CreditCard',
          iconColor: 'text-purple-500',
          trend: 85
        },
        {
          title: 'Churn Rate',
          value: '2.1%',
          change: '-0.3%',
          changeType: 'positive',
          icon: 'TrendingDown',
          iconColor: 'text-red-500',
          trend: 15
        }
      ])

      // Mock users data
      setUsers([
        {
          Id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'bookkeeper',
          status: 'active',
          lastLogin: new Date(Date.now() - 86400000),
          clientCount: 24,
          revenue: 12450.00,
          joinDate: new Date(2023, 0, 15)
        },
        {
          Id: 2,
          name: 'Michael Chen',
          email: 'michael@acme.com',
          role: 'client',
          status: 'active',
          lastLogin: new Date(Date.now() - 172800000),
          clientCount: 0,
          revenue: 3450.00,
          joinDate: new Date(2023, 2, 8)
        },
        {
          Id: 3,
          name: 'Emily Rodriguez',
          email: 'emily@techsolutions.com',
          role: 'bookkeeper',
          status: 'active',
          lastLogin: new Date(Date.now() - 86400000 * 3),
          clientCount: 18,
          revenue: 8930.00,
          joinDate: new Date(2023, 1, 22)
        },
        {
          Id: 4,
          name: 'David Wilson',
          email: 'david@restaurant.com',
          role: 'client',
          status: 'inactive',
          lastLogin: new Date(Date.now() - 86400000 * 30),
          clientCount: 0,
          revenue: 1240.00,
          joinDate: new Date(2023, 4, 10)
        }
      ])

      // Mock subscriptions data
      setSubscriptions([
        {
          Id: 1,
          plan: 'Professional',
          price: 79.00,
          users: 1247,
          revenue: 98513.00,
          status: 'active'
        },
        {
          Id: 2,
          plan: 'Starter',
          price: 29.00,
          users: 576,
          revenue: 16704.00,
          status: 'active'
        },
        {
          Id: 3,
          plan: 'Enterprise',
          price: 199.00,
          users: 100,
          revenue: 19900.00,
          status: 'active'
        }
      ])
      
    } catch (err) {
      setError('Failed to load admin data')
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleUserAction = (action, user) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing ${user.name}`)
        break
      case 'edit':
        toast.info(`Editing ${user.name}`)
        break
      case 'suspend':
        toast.warning(`Suspending ${user.name}`)
        break
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          toast.success(`${user.name} deleted`)
        }
        break
      default:
        break
    }
  }

  const userColumns = [
    {
      header: 'User',
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
      header: 'Role',
      key: 'role',
      render: (value) => (
        <Badge variant={value === 'bookkeeper' ? 'primary' : 'info'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      )
    },
    {
      header: 'Clients',
      key: 'clientCount',
      render: (value) => (
        <span className="text-sm text-gray-900">{value}</span>
      )
    },
    {
      header: 'Revenue',
      key: 'revenue',
      render: (value) => (
        <span className="font-medium text-green-600">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Last Login',
      key: 'lastLogin',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {format(new Date(value), 'MMM dd, yyyy')}
        </span>
      )
    }
  ]

  const userActions = [
    {
      icon: 'Eye',
      onClick: (user) => handleUserAction('view', user)
    },
    {
      icon: 'Edit',
      onClick: (user) => handleUserAction('edit', user)
    },
    {
      icon: 'Ban',
      onClick: (user) => handleUserAction('suspend', user)
    },
    {
      icon: 'Trash2',
      onClick: (user) => handleUserAction('delete', user)
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Admin Dashboard Error" message={error} onRetry={loadAdminData} />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard 🚀</h1>
            <p className="text-purple-100">
              Manage your Keepara platform and monitor key metrics.
            </p>
          </div>
          <div className="hidden md:block">
            <ApperIcon name="Shield" className="w-16 h-16 text-white/20" />
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
          <h2 className="text-lg font-semibold text-gray-900">Admin Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" icon="UserPlus" className="h-12">
            Add User
          </Button>
          <Button variant="secondary" icon="Settings" className="h-12">
            Platform Settings
          </Button>
          <Button variant="secondary" icon="Mail" className="h-12">
            Send Announcement
          </Button>
          <Button variant="secondary" icon="BarChart3" className="h-12">
            Analytics
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Plans */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Subscription Plans</h2>
            <Button variant="ghost" size="sm" icon="ExternalLink">
              Manage
            </Button>
          </div>
          
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.Id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <h3 className="font-medium text-gray-900">{sub.plan}</h3>
                  <p className="text-sm text-gray-500">{sub.users} users</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${sub.price}/mo</div>
                  <div className="text-sm text-green-600">${sub.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            <Badge variant="success">All Systems Operational</Badge>
          </div>
          
          <div className="space-y-3">
            {[
              { service: 'API Gateway', status: 'operational', uptime: '99.9%' },
              { service: 'Database', status: 'operational', uptime: '99.8%' },
              { service: 'File Storage', status: 'operational', uptime: '100%' },
              { service: 'Email Service', status: 'degraded', uptime: '97.2%' },
              { service: 'Payment Processing', status: 'operational', uptime: '99.9%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm text-gray-900">{service.service}</span>
                </div>
                <span className="text-sm text-gray-500">{service.uptime}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm" icon="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {[
              {
                action: 'New user registered',
                description: 'Emily Rodriguez joined as bookkeeper',
                time: '2 minutes ago',
                icon: 'UserPlus',
                color: 'text-green-500'
              },
              {
                action: 'Subscription upgraded',
                description: 'Acme Corp upgraded to Enterprise',
                time: '1 hour ago',
                icon: 'ArrowUp',
                color: 'text-blue-500'
              },
              {
                action: 'Payment processed',
                description: '$79 monthly subscription',
                time: '3 hours ago',
                icon: 'CreditCard',
                color: 'text-purple-500'
              },
              {
                action: 'Support ticket resolved',
                description: 'Billing issue resolved',
                time: '5 hours ago',
                icon: 'CheckCircle',
                color: 'text-accent-500'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <ApperIcon name={activity.icon} className={`w-3 h-3 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Platform Users</h2>
          <div className="flex space-x-3">
            <Button variant="secondary" icon="Download">
              Export
            </Button>
            <Button icon="UserPlus">
              Add User
            </Button>
          </div>
        </div>
        
        <DataTable
          columns={userColumns}
          data={users}
          actions={userActions}
          onRowClick={(user) => handleUserAction('view', user)}
        />
      </Card>
    </div>
  )
}

export default AdminDashboard