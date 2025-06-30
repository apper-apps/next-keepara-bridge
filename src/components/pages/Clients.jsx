import React, { useState, useEffect } from 'react'
import DataTable from '@/components/molecules/DataTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'

const loadClients = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock clients data (will be replaced with client service when available)
      setClients([
        {
          Id: 1,
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          phone: '+1 (555) 123-4567',
          companyName: 'Acme Corporation',
          status: 'active',
          monthlyRevenue: 3450.00,
          totalRevenue: 48230.50,
          transactionCount: 234,
          lastActivity: new Date(),
          joinDate: new Date(2023, 0, 15),
          address: '123 Business Ave, Suite 100, New York, NY 10001'
        },
        {
          Id: 2,
          name: 'Tech Solutions Inc',
          email: 'hello@techsolutions.com',
          phone: '+1 (555) 987-6543',
          companyName: 'Tech Solutions Inc',
          status: 'active',
          monthlyRevenue: 2890.00,
          totalRevenue: 34560.75,
          transactionCount: 187,
          lastActivity: new Date(Date.now() - 172800000),
          joinDate: new Date(2023, 2, 8),
          address: '456 Innovation Blvd, Austin, TX 78701'
        },
        {
          Id: 3,
          name: 'Local Restaurant',
          email: 'owner@localrestaurant.com',
          phone: '+1 (555) 456-7890',
          companyName: 'Local Restaurant LLC',
          status: 'active',
          monthlyRevenue: 1240.00,
          totalRevenue: 18675.25,
          transactionCount: 156,
          lastActivity: new Date(Date.now() - 86400000),
          joinDate: new Date(2023, 4, 22),
          address: '789 Main Street, Portland, OR 97201'
        },
        {
          Id: 4,
          name: 'Marketing Agency',
          email: 'info@marketingpro.com',
          phone: '+1 (555) 321-0987',
          companyName: 'Marketing Pro Agency',
          status: 'pending',
          monthlyRevenue: 0,
          totalRevenue: 0,
          transactionCount: 0,
          lastActivity: new Date(Date.now() - 604800000),
          joinDate: new Date(2024, 0, 5),
          address: '321 Creative Lane, Los Angeles, CA 90210'
        },
        {
          Id: 5,
          name: 'Retail Store',
          email: 'manager@retailstore.com',
          phone: '+1 (555) 654-3210',
          companyName: 'Downtown Retail Store',
          status: 'inactive',
          monthlyRevenue: 0,
          totalRevenue: 12450.00,
          transactionCount: 89,
          lastActivity: new Date(Date.now() - 2592000000),
          joinDate: new Date(2022, 8, 12),
          address: '654 Commerce St, Chicago, IL 60601'
        }
      ])
      
    } catch (err) {
      setError('Failed to load clients')
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClientAction = (action, client) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing ${client.name}`)
        break
      case 'edit':
        toast.info(`Editing ${client.name}`)
        break
      case 'transactions':
        toast.info(`Viewing transactions for ${client.name}`)
        break
      case 'reports':
        toast.info(`Generating reports for ${client.name}`)
        break
      default:
        break
    }
  }

  const columns = [
    {
      header: 'Client',
      key: 'name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
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
      header: 'Company',
      key: 'companyName',
      render: (value) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      header: 'Monthly Revenue',
      key: 'monthlyRevenue',
      render: (value) => (
        <span className="font-medium text-gray-900">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Total Revenue',
      key: 'totalRevenue',
      render: (value) => (
        <span className="font-medium text-green-600">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Transactions',
      key: 'transactionCount',
      render: (value) => (
        <span className="text-sm text-gray-600">{value}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (value) => {
        const variants = {
          active: 'success',
          pending: 'warning',
          inactive: 'error'
        }
        return <Badge variant={variants[value]}>{value}</Badge>
      }
    },
    {
      header: 'Last Activity',
      key: 'lastActivity',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {format(new Date(value), 'MMM dd, yyyy')}
        </span>
      )
    }
  ]

  const actions = [
    {
      icon: 'Eye',
      onClick: (client) => handleClientAction('view', client)
    },
    {
      icon: 'Edit',
      onClick: (client) => handleClientAction('edit', client)
    },
    {
      icon: 'CreditCard',
      onClick: (client) => handleClientAction('transactions', client)
    },
    {
      icon: 'FileText',
      onClick: (client) => handleClientAction('reports', client)
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Clients" message={error} onRetry={loadClients} />
  }

  if (clients.length === 0 && !searchTerm) {
    return (
      <Empty 
        title="No clients yet"
        message="Add your first client to start managing their bookkeeping"
        icon="Users"
        actionLabel="Add First Client"
        onAction={() => toast.info('Add client form would open here')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your bookkeeping clients and their financial data</p>
        </div>
        <Button icon="Plus" onClick={() => toast.info('Add client form would open here')}>
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Users" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {clients.length}
          </div>
          <div className="text-sm text-gray-600">Total Clients</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {clients.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {clients.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Setup</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="DollarSign" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ${clients.reduce((sum, c) => sum + c.monthlyRevenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Monthly Revenue</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ApperIcon name="Table" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ApperIcon name="Grid3X3" className="w-4 h-4" />
              </button>
            </div>
            
            <Button variant="secondary" icon="Filter">
              Filter
            </Button>
            
            <Button variant="secondary" icon="Download">
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <Empty 
          title="No clients found"
          message={searchTerm ? `No clients match "${searchTerm}"` : "No clients to display"}
          icon="Users"
          actionLabel="Add Client"
          onAction={() => toast.info('Add client form would open here')}
        />
      ) : viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredClients}
          actions={actions}
          onRowClick={(client) => handleClientAction('view', client)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.Id} className="hover:shadow-card-hover cursor-pointer" onClick={() => handleClientAction('view', client)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.companyName}</p>
                  </div>
                </div>
                <Badge variant={client.status === 'active' ? 'success' : client.status === 'pending' ? 'warning' : 'error'}>
                  {client.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="text-sm font-medium text-gray-900">${client.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-sm font-medium text-green-600">${client.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transactions</span>
                  <span className="text-sm font-medium text-gray-900">{client.transactionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm text-gray-500">{format(new Date(client.lastActivity), 'MMM dd')}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <Button variant="ghost" size="sm" icon="Eye" className="flex-1">
                  View
                </Button>
                <Button variant="ghost" size="sm" icon="CreditCard" className="flex-1">
                  Transactions
                </Button>
                <Button variant="ghost" size="sm" icon="FileText" className="flex-1">
                  Reports
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Clients