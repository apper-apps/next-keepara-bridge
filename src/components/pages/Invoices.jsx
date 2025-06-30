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
import { format, addDays } from 'date-fns'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const loadInvoices = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Mock invoices data
      setInvoices([
        {
          Id: 1,
          invoiceNumber: 'INV-2024-001',
          client: 'Acme Corporation',
          clientId: 1,
          amount: 3450.00,
          status: 'paid',
          issueDate: new Date(Date.now() - 86400000 * 15),
          dueDate: new Date(Date.now() - 86400000 * 5),
          paidDate: new Date(Date.now() - 86400000 * 3),
          description: 'Monthly bookkeeping services',
          items: [
            { description: 'Bookkeeping Services', quantity: 1, rate: 2500.00, amount: 2500.00 },
            { description: 'Financial Report Generation', quantity: 1, rate: 500.00, amount: 500.00 },
            { description: 'Tax Preparation Consultation', quantity: 2, rate: 225.00, amount: 450.00 }
          ],
          stripePaymentIntentId: 'pi_1234567890',
          paymentMethod: 'Credit Card'
        },
        {
          Id: 2,
          invoiceNumber: 'INV-2024-002',
          client: 'Tech Solutions Inc',
          clientId: 2,
          amount: 2890.00,
          status: 'pending',
          issueDate: new Date(Date.now() - 86400000 * 10),
          dueDate: new Date(Date.now() + 86400000 * 5),
          paidDate: null,
          description: 'Quarterly bookkeeping package',
          items: [
            { description: 'Quarterly Bookkeeping', quantity: 1, rate: 2500.00, amount: 2500.00 },
            { description: 'Expense Categorization', quantity: 1, rate: 390.00, amount: 390.00 }
          ],
          stripePaymentIntentId: null,
          paymentMethod: null
        },
        {
          Id: 3,
          invoiceNumber: 'INV-2024-003',
          client: 'Local Restaurant',
          clientId: 3,
          amount: 1240.00,
          status: 'overdue',
          issueDate: new Date(Date.now() - 86400000 * 45),
          dueDate: new Date(Date.now() - 86400000 * 15),
          paidDate: null,
          description: 'Monthly restaurant bookkeeping',
          items: [
            { description: 'Restaurant Bookkeeping', quantity: 1, rate: 800.00, amount: 800.00 },
            { description: 'Inventory Reconciliation', quantity: 1, rate: 440.00, amount: 440.00 }
          ],
          stripePaymentIntentId: null,
          paymentMethod: null
        },
        {
          Id: 4,
          invoiceNumber: 'INV-2024-004',
          client: 'Marketing Agency',
          clientId: 4,
          amount: 1890.00,
          status: 'draft',
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 86400000 * 30),
          paidDate: null,
          description: 'Marketing agency setup and first month',
          items: [
            { description: 'Initial Setup', quantity: 1, rate: 500.00, amount: 500.00 },
            { description: 'Monthly Bookkeeping', quantity: 1, rate: 1390.00, amount: 1390.00 }
          ],
          stripePaymentIntentId: null,
          paymentMethod: null
        },
        {
          Id: 5,
          invoiceNumber: 'INV-2024-005',
          client: 'Acme Corporation',
          clientId: 1,
          amount: 4200.00,
          status: 'sent',
          issueDate: new Date(Date.now() - 86400000 * 5),
          dueDate: new Date(Date.now() + 86400000 * 25),
          paidDate: null,
          description: 'Annual tax preparation services',
          items: [
            { description: 'Corporate Tax Preparation', quantity: 1, rate: 3000.00, amount: 3000.00 },
            { description: 'Tax Strategy Consulting', quantity: 4, rate: 300.00, amount: 1200.00 }
          ],
          stripePaymentIntentId: 'pi_pending_123',
          paymentMethod: null
        }
      ])
      
    } catch (err) {
      setError('Failed to load invoices')
      toast.error('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const handleInvoiceAction = (action, invoice) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing invoice ${invoice.invoiceNumber}`)
        break
      case 'edit':
        toast.info(`Editing invoice ${invoice.invoiceNumber}`)
        break
      case 'send':
        const updatedInvoices = invoices.map(inv => 
          inv.Id === invoice.Id ? { ...inv, status: 'sent' } : inv
        )
        setInvoices(updatedInvoices)
        toast.success(`Invoice ${invoice.invoiceNumber} sent to ${invoice.client}`)
        break
      case 'duplicate':
        toast.info(`Duplicating invoice ${invoice.invoiceNumber}`)
        break
      case 'download':
        toast.success(`Downloading invoice ${invoice.invoiceNumber}`)
        break
      case 'delete':
        if (window.confirm('Are you sure you want to delete this invoice?')) {
          const updatedInvoices = invoices.filter(inv => inv.Id !== invoice.Id)
          setInvoices(updatedInvoices)
          toast.success('Invoice deleted')
        }
        break
      default:
        break
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'sent': return 'info'
      case 'pending': return 'warning'
      case 'overdue': return 'error'
      case 'draft': return 'default'
      default: return 'default'
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const columns = [
    {
      header: 'Invoice',
      key: 'invoiceNumber',
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
        <span className="font-semibold text-gray-900">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (value, row) => (
        <div className="flex flex-col space-y-1">
          <Badge variant={getStatusVariant(value)}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
          {value === 'sent' && (
            <span className="text-xs text-gray-500">
              Due in {getDaysUntilDue(row.dueDate)} days
            </span>
          )}
          {value === 'overdue' && (
            <span className="text-xs text-red-600">
              {Math.abs(getDaysUntilDue(row.dueDate))} days overdue
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Issue Date',
      key: 'issueDate',
      render: (value) => format(new Date(value), 'MMM dd, yyyy')
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (value, row) => (
        <div>
          <div className="text-sm text-gray-900">{format(new Date(value), 'MMM dd, yyyy')}</div>
          {row.status === 'overdue' && (
            <div className="text-xs text-red-600">Overdue</div>
          )}
        </div>
      )
    },
    {
      header: 'Payment',
      key: 'paidDate',
      render: (value, row) => (
        <div className="text-sm">
          {value ? (
            <>
              <div className="text-green-600">Paid</div>
              <div className="text-gray-500">{format(new Date(value), 'MMM dd')}</div>
            </>
          ) : row.status === 'draft' ? (
            <span className="text-gray-500">Draft</span>
          ) : (
            <span className="text-yellow-600">Pending</span>
          )}
        </div>
      )
    }
  ]

  const actions = [
    {
      icon: 'Eye',
      onClick: (invoice) => handleInvoiceAction('view', invoice)
    },
    {
      icon: 'Edit',
      onClick: (invoice) => handleInvoiceAction('edit', invoice)
    },
    {
      icon: 'Send',
      onClick: (invoice) => handleInvoiceAction('send', invoice)
    },
    {
      icon: 'Download',
      onClick: (invoice) => handleInvoiceAction('download', invoice)
    },
    {
      icon: 'Copy',
      onClick: (invoice) => handleInvoiceAction('duplicate', invoice)
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Invoices" message={error} onRetry={loadInvoices} />
  }

  const stats = {
    total: invoices.length,
    draft: invoices.filter(inv => inv.status === 'draft').length,
    sent: invoices.filter(inv => inv.status === 'sent').length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pendingAmount: invoices.filter(inv => ['sent', 'pending', 'overdue'].includes(inv.status)).reduce((sum, inv) => sum + inv.amount, 0)
  }

  if (invoices.length === 0 && !searchTerm) {
    return (
      <Empty 
        title="No invoices yet"
        message="Create your first invoice to start billing clients"
        icon="Receipt"
        actionLabel="Create Invoice"
        onAction={() => toast.info('Invoice creation form would open here')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Create, send, and track your client invoices</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon="Upload">
            Import
          </Button>
          <Button icon="Plus" onClick={() => toast.info('Invoice creation form would open here')}>
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Receipt" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Invoices</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">${stats.paidAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Paid ({stats.paid})</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">${stats.pendingAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Pending ({stats.sent})</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">{stats.overdue}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Edit" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-600 mb-1">{stats.draft}</div>
          <div className="text-sm text-gray-600">Drafts</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" icon="Plus" className="h-12">
            New Invoice
          </Button>
          <Button variant="secondary" icon="Send" className="h-12">
            Send Reminders
          </Button>
          <Button variant="secondary" icon="Download" className="h-12">
            Export Data
          </Button>
          <Button variant="secondary" icon="Settings" className="h-12">
            Invoice Settings
          </Button>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="Search"
              />
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="secondary" icon="Filter">
              More Filters
            </Button>
            <Button variant="secondary" icon="Download">
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Overdue Alerts */}
      {stats.overdue > 0 && (
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Overdue Invoices Alert</h3>
              <p className="text-sm text-gray-600 mb-3">
                You have {stats.overdue} overdue invoice{stats.overdue > 1 ? 's' : ''} that need immediate attention.
              </p>
              <div className="flex space-x-3">
                <Button size="sm" onClick={() => toast.info('Sending overdue reminders...')}>
                  Send Reminders
                </Button>
                <Button variant="secondary" size="sm">
                  View Overdue
                </Button>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        </Card>
      )}

      {/* Invoices Table */}
      {filteredInvoices.length === 0 ? (
        <Empty 
          title="No invoices found"
          message={searchTerm ? `No invoices match "${searchTerm}"` : "No invoices match your current filters"}
          icon="Receipt"
          actionLabel="Create Invoice"
          onAction={() => toast.info('Invoice creation form would open here')}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredInvoices}
          actions={actions}
          onRowClick={(invoice) => handleInvoiceAction('view', invoice)}
        />
      )}
    </div>
  )
}

export default Invoices