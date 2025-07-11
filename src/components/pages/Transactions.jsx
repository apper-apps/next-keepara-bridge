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
import transactionService from '@/services/api/transactionService'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTransactions, setSelectedTransactions] = useState([])

const loadTransactions = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await transactionService.getAll()
      setTransactions(data || [])
      
    } catch (err) {
      setError('Failed to load transactions')
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'reconciled' && transaction.reconciled) ||
                         (filterStatus === 'pending' && !transaction.reconciled) ||
                         (filterStatus === 'income' && transaction.type === 'income') ||
                         (filterStatus === 'expense' && transaction.type === 'expense')
    
    return matchesSearch && matchesFilter
  })

  const handleTransactionAction = (action, transaction) => {
    switch (action) {
      case 'edit':
        toast.info(`Editing transaction: ${transaction.description}`)
        break
      case 'reconcile':
        const updatedTransactions = transactions.map(t => 
          t.Id === transaction.Id ? { ...t, reconciled: !t.reconciled } : t
        )
        setTransactions(updatedTransactions)
        toast.success(`Transaction ${transaction.reconciled ? 'unreconciled' : 'reconciled'}`)
        break
      case 'duplicate':
        toast.info(`Duplicating transaction: ${transaction.description}`)
        break
      case 'delete':
        if (window.confirm('Are you sure you want to delete this transaction?')) {
          const updatedTransactions = transactions.filter(t => t.Id !== transaction.Id)
          setTransactions(updatedTransactions)
          toast.success('Transaction deleted')
        }
        break
      default:
        break
    }
  }

  const handleBulkAction = (action) => {
    if (selectedTransactions.length === 0) {
      toast.warning('Please select transactions first')
      return
    }

    switch (action) {
      case 'reconcile':
        const reconcileCount = selectedTransactions.filter(id => 
          !transactions.find(t => t.Id === id)?.reconciled
        ).length
        
        const updatedTransactions = transactions.map(t => 
          selectedTransactions.includes(t.Id) ? { ...t, reconciled: true } : t
        )
        setTransactions(updatedTransactions)
        setSelectedTransactions([])
        toast.success(`${reconcileCount} transactions reconciled`)
        break
      case 'categorize':
        toast.info(`Bulk categorization for ${selectedTransactions.length} transactions`)
        break
      case 'export':
        toast.info(`Exporting ${selectedTransactions.length} transactions`)
        break
      default:
        break
    }
  }

  const columns = [
    {
      header: 'Transaction',
      key: 'description',
      render: (value, row) => (
        <div className="flex items-start space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            row.type === 'income' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            <ApperIcon 
              name={row.type === 'income' ? 'TrendingUp' : 'TrendingDown'} 
              className="w-4 h-4" 
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">
              {row.client} • {row.reference}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (value, row) => (
        <div className="text-right">
          <div className={`font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value >= 0 ? '+' : ''}${Math.abs(value).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">{row.paymentMethod}</div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      render: (value, row) => (
        <div>
          <Badge variant="default">{value}</Badge>
          {row.aiConfidence && (
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <ApperIcon name="Brain" className="w-3 h-3 mr-1" />
              {Math.round(row.aiConfidence * 100)}% AI
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Date',
      key: 'date',
      render: (value) => (
        <div className="text-sm">
          <div className="text-gray-900">{format(new Date(value), 'MMM dd, yyyy')}</div>
          <div className="text-gray-500">{format(new Date(value), 'h:mm a')}</div>
        </div>
      )
    },
{
      header: 'Status',
      key: 'reconciled',
      render: (value, row) => {
        // Safely get attachment count
        const getAttachmentCount = (attachments) => {
          if (!attachments) return 0;
          if (Array.isArray(attachments)) return attachments.length;
          if (typeof attachments === 'string') {
            try {
              const parsed = JSON.parse(attachments);
              return Array.isArray(parsed) ? parsed.length : 0;
            } catch {
              return attachments.trim() ? 1 : 0;
            }
          }
          return 0;
        };

        const attachmentCount = getAttachmentCount(row.attachments);

        return (
          <div className="flex flex-col items-start space-y-1">
            <Badge variant={value ? 'success' : 'warning'}>
              {value ? 'Reconciled' : 'Pending'}
            </Badge>
            {attachmentCount > 0 && (
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon name="Paperclip" className="w-3 h-3 mr-1" />
                {attachmentCount}
              </div>
            )}
          </div>
        );
      }
    }
  ]

  const actions = [
    {
      icon: 'Edit',
      onClick: (transaction) => handleTransactionAction('edit', transaction)
    },
    {
      icon: transaction => transaction.reconciled ? 'X' : 'Check',
      onClick: (transaction) => handleTransactionAction('reconcile', transaction)
    },
    {
      icon: 'Copy',
      onClick: (transaction) => handleTransactionAction('duplicate', transaction)
    },
    {
      icon: 'Trash2',
      onClick: (transaction) => handleTransactionAction('delete', transaction)
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Transactions" message={error} onRetry={loadTransactions} />
  }

  const stats = {
    total: transactions.length,
    reconciled: transactions.filter(t => t.reconciled).length,
    pending: transactions.filter(t => !t.reconciled).length,
    income: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    expenses: Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))
  }

  if (transactions.length === 0 && !searchTerm) {
    return (
      <Empty 
        title="No transactions yet"
        message="Start by adding your first transaction or importing bank data"
        icon="CreditCard"
        actionLabel="Add Transaction"
        onAction={() => toast.info('Add transaction form would open here')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage and reconcile your financial transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon="Upload">
            Import
          </Button>
          <Button icon="Plus" onClick={() => toast.info('Add transaction form would open here')}>
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="CreditCard" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.reconciled}</div>
          <div className="text-sm text-gray-600">Reconciled</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">${stats.income.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Income</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="TrendingDown" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">${stats.expenses.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Expenses</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search transactions..."
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
              <option value="reconciled">Reconciled</option>
              <option value="pending">Pending</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedTransactions.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleBulkAction('reconcile')}
                >
                  Reconcile ({selectedTransactions.length})
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleBulkAction('categorize')}
                >
                  Categorize
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleBulkAction('export')}
                  icon="Download"
                />
              </div>
            )}
            
            <Button variant="secondary" icon="Filter">
              Filter
            </Button>
            
            <Button variant="secondary" icon="Download">
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Suggestions */}
      {transactions.some(t => !t.reconciled) && (
        <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Brain" className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">AI Reconciliation Suggestions</h3>
              <p className="text-sm text-gray-600 mb-3">
                We found {transactions.filter(t => !t.reconciled).length} transactions that can be auto-reconciled based on similar patterns.
              </p>
              <div className="flex space-x-3">
                <Button size="sm" onClick={() => toast.info('Auto-reconciling transactions...')}>
                  Auto-Reconcile All
                </Button>
                <Button variant="secondary" size="sm">
                  Review Suggestions
                </Button>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        </Card>
      )}

      {/* Transactions Table */}
      {filteredTransactions.length === 0 ? (
        <Empty 
          title="No transactions found"
          message={searchTerm ? `No transactions match "${searchTerm}"` : "No transactions match your current filters"}
          icon="CreditCard"
          actionLabel="Add Transaction"
          onAction={() => toast.info('Add transaction form would open here')}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredTransactions}
          actions={actions}
          onRowClick={(transaction) => toast.info(`Viewing details for: ${transaction.description}`)}
        />
      )}
    </div>
  )
}

export default Transactions