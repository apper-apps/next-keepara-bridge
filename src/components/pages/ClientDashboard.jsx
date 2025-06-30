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

const ClientDashboard = () => {
  const [data, setData] = useState({
    metrics: {
      activeProjects: 0,
      pendingInvoices: 0,
      totalSpent: 0,
      supportTickets: 0
    },
    recentTransactions: [],
    projectStatus: [],
    invoiceHistory: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load client dashboard data
  async function loadClientDashboardData() {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call - replace with actual API endpoints
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setData({
        metrics: {
          activeProjects: 3,
          pendingInvoices: 2,
          totalSpent: 12500,
          supportTickets: 1
        },
        recentTransactions: [
          {
            id: 1,
            description: 'Project payment - Website Development',
            amount: -2500,
            date: new Date(),
            status: 'completed'
          },
          {
            id: 2,
            description: 'Monthly retainer',
            amount: -1200,
            date: new Date(Date.now() - 86400000),
            status: 'completed'
          }
        ],
        projectStatus: [
          {
            id: 1,
            name: 'Website Redesign',
            progress: 75,
            status: 'in-progress',
            dueDate: new Date(Date.now() + 86400000 * 7)
          },
          {
            id: 2,
            name: 'Mobile App',
            progress: 30,
            status: 'in-progress',
            dueDate: new Date(Date.now() + 86400000 * 14)
          }
        ],
        invoiceHistory: [
          {
            id: 1,
            number: 'INV-001',
            amount: 2500,
            status: 'paid',
            dueDate: new Date(Date.now() - 86400000 * 3)
          },
          {
            id: 2,
            number: 'INV-002',
            amount: 1800,
            status: 'pending',
            dueDate: new Date(Date.now() + 86400000 * 5)
          }
        ]
      })
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data')
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClientDashboardData()
  }, [])

  // Table column definitions
  const transactionColumns = [
    {
      header: 'Transaction',
      key: 'description',
      render: (transaction) => (
        <div className="flex items-center space-x-3">
          <ApperIcon 
            name={transaction.amount < 0 ? 'CreditCard' : 'ArrowUpRight'} 
            className="h-4 w-4 text-gray-500" 
          />
          <span className="font-medium">{transaction.description}</span>
        </div>
      )
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (transaction) => (
        <span className={`font-semibold ${
          transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
        </span>
      )
    },
    {
      header: 'Date',
      key: 'date',
      render: (transaction) => format(transaction.date, 'MMM dd, yyyy')
    },
    {
      header: 'Status',
      key: 'status',
      render: (transaction) => (
        <Badge 
          variant={transaction.status === 'completed' ? 'success' : 'warning'}
        >
          {transaction.status}
        </Badge>
      )
    }
  ]

  const projectColumns = [
    {
      header: 'Project',
      key: 'name',
      render: (project) => (
        <div className="flex items-center space-x-3">
          <ApperIcon name="Folder" className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{project.name}</span>
        </div>
      )
    },
    {
      header: 'Progress',
      key: 'progress',
      render: (project) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{project.progress}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (project) => (
        <Badge 
          variant={project.status === 'completed' ? 'success' : 'info'}
        >
          {project.status.replace('-', ' ')}
        </Badge>
      )
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (project) => format(project.dueDate, 'MMM dd, yyyy')
    }
  ]

  const invoiceColumns = [
    {
      header: 'Invoice',
      key: 'number',
      render: (invoice) => (
        <div className="flex items-center space-x-3">
          <ApperIcon name="FileText" className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{invoice.number}</span>
        </div>
      )
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (invoice) => (
        <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (invoice) => (
        <Badge 
          variant={invoice.status === 'paid' ? 'success' : 'warning'}
        >
          {invoice.status}
        </Badge>
      )
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (invoice) => format(invoice.dueDate, 'MMM dd, yyyy')
    }
  ]

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadClientDashboardData} />

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your projects and account</p>
        </div>
        <Button onClick={loadClientDashboardData} disabled={loading}>
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Projects"
          value={data.metrics.activeProjects}
          icon="Folder"
          color="blue"
        />
        <MetricCard
          title="Pending Invoices"
          value={data.metrics.pendingInvoices}
          icon="FileText"
          color="orange"
        />
        <MetricCard
          title="Total Spent"
          value={`$${data.metrics.totalSpent.toLocaleString()}`}
          icon="DollarSign"
          color="green"
        />
        <MetricCard
          title="Support Tickets"
          value={data.metrics.supportTickets}
          icon="MessageCircle"
          color="purple"
        />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            {data.recentTransactions.length > 0 ? (
              <DataTable 
                data={data.recentTransactions} 
                columns={transactionColumns}
                className="border-0"
              />
            ) : (
              <Empty message="No recent transactions" />
            )}
          </div>
        </Card>

        {/* Project Status */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Project Status</h2>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            {data.projectStatus.length > 0 ? (
              <DataTable 
                data={data.projectStatus} 
                columns={projectColumns}
                className="border-0"
              />
            ) : (
              <Empty message="No active projects" />
            )}
          </div>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
          {data.invoiceHistory.length > 0 ? (
            <DataTable 
              data={data.invoiceHistory} 
              columns={invoiceColumns}
            />
          ) : (
            <Empty message="No invoice history" />
          )}
        </div>
      </Card>
    </div>
  )
}

export default ClientDashboard