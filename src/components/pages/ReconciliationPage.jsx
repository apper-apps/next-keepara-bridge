import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import bankEntryService from '@/services/api/bankEntryService'
import transactionService from '@/services/api/transactionService'

const ReconciliationPage = () => {
  const [bankEntries, setBankEntries] = useState([])
  const [transactions, setTransactions] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bankFilter, setBankFilter] = useState('')
  const [transactionFilter, setTransactionFilter] = useState('')
  const [selectedBankEntry, setSelectedBankEntry] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showMatched, setShowMatched] = useState(false)

  useEffect(() => {
    loadReconciliationData()
  }, [])

const loadReconciliationData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [bankData, transactionData] = await Promise.all([
        bankEntryService.getAll(),
        transactionService.getAll()
      ])
      
      setBankEntries(bankData || [])
      setTransactions(transactionData || [])
    } catch (err) {
      setError('Failed to load reconciliation data')
      toast.error('Failed to load reconciliation data')
    } finally {
      setLoading(false)
    }
  }

  const handleMatch = () => {
    if (!selectedBankEntry || !selectedTransaction) {
      toast.warning('Please select both a bank entry and transaction to match')
      return
    }

    const newMatch = {
      Id: Date.now(),
      bankEntryId: selectedBankEntry.Id,
      transactionId: selectedTransaction.Id,
      bankEntry: selectedBankEntry,
      transaction: selectedTransaction,
      matchedAt: new Date(),
      difference: Math.abs(selectedBankEntry.amount - selectedTransaction.amount)
    }

    setMatchedPairs(prev => [...prev, newMatch])
    setBankEntries(prev => prev.filter(entry => entry.Id !== selectedBankEntry.Id))
    setTransactions(prev => prev.filter(txn => txn.Id !== selectedTransaction.Id))
    
    setSelectedBankEntry(null)
    setSelectedTransaction(null)
    
    toast.success('Entries matched successfully')
  }

  const handleUnmatch = (matchId) => {
    const match = matchedPairs.find(m => m.Id === matchId)
    if (!match) return

    setBankEntries(prev => [...prev, match.bankEntry])
    setTransactions(prev => [...prev, match.transaction])
    setMatchedPairs(prev => prev.filter(m => m.Id !== matchId))
    
    toast.info('Match removed successfully')
  }

  const filteredBankEntries = bankEntries.filter(entry =>
    entry.description.toLowerCase().includes(bankFilter.toLowerCase()) ||
    entry.reference.toLowerCase().includes(bankFilter.toLowerCase())
  )

  const filteredTransactions = transactions.filter(txn =>
    txn.description.toLowerCase().includes(transactionFilter.toLowerCase()) ||
    txn.category.toLowerCase().includes(transactionFilter.toLowerCase())
  )

  const getAmountClass = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount))
  }

  if (loading) return <Loading />
  if (error) return <Error title="Error" message={error} onRetry={loadReconciliationData} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Reconciliation</h1>
          <p className="text-gray-600 mt-1">Match bank entries with Keepara transactions</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Unmatched: {filteredBankEntries.length + filteredTransactions.length}</span>
            <span>•</span>
            <span>Matched: {matchedPairs.length}</span>
          </div>
          
          <Button
            variant={showMatched ? 'primary' : 'secondary'}
            onClick={() => setShowMatched(!showMatched)}
            icon="Eye"
          >
            {showMatched ? 'Hide Matched' : 'Show Matched'}
          </Button>
        </div>
      </div>

      {showMatched ? (
        /* Matched Entries View */
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Matched Entries</h2>
            <Badge variant="success" className="px-3 py-1">
              {matchedPairs.length} Matched
            </Badge>
          </div>

          {matchedPairs.length === 0 ? (
            <Empty
              icon="GitCompare"
              title="No matched entries"
              message="Start matching bank entries with transactions to see them here"
            />
          ) : (
            <div className="space-y-4">
              {matchedPairs.map((match) => (
                <motion.div
                  key={match.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      {/* Bank Entry */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Building2" className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">Bank Entry</span>
                        </div>
                        <p className="text-sm text-gray-800">{match.bankEntry.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{match.bankEntry.reference}</span>
                          <span className={`text-sm font-medium ${getAmountClass(match.bankEntry.amount)}`}>
                            {match.bankEntry.amount >= 0 ? '+' : '-'}{formatCurrency(match.bankEntry.amount)}
                          </span>
                        </div>
                      </div>

                      {/* Transaction */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Receipt" className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-900">Keepara Transaction</span>
                        </div>
                        <p className="text-sm text-gray-800">{match.transaction.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {match.transaction.category}
                          </Badge>
                          <span className={`text-sm font-medium ${getAmountClass(match.transaction.amount)}`}>
                            {match.transaction.amount >= 0 ? '+' : '-'}{formatCurrency(match.transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-6">
                      {match.difference > 0 && (
                        <Badge variant="warning" className="text-xs">
                          Diff: {formatCurrency(match.difference)}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnmatch(match.Id)}
                        icon="X"
                      >
                        Unmatch
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      ) : (
        /* Reconciliation Interface */
        <>
          {/* Match Controls */}
          {(selectedBankEntry || selectedTransaction) && (
            <Card className="bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ApperIcon name="GitCompare" className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      {selectedBankEntry && selectedTransaction 
                        ? 'Ready to match selected entries'
                        : 'Select entries from both sides to match'
                      }
                    </p>
                    <p className="text-xs text-blue-600">
                      {selectedBankEntry ? '✓ Bank entry selected' : 'Select a bank entry'} • {' '}
                      {selectedTransaction ? '✓ Transaction selected' : 'Select a transaction'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedBankEntry(null)
                      setSelectedTransaction(null)
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleMatch}
                    disabled={!selectedBankEntry || !selectedTransaction}
                    icon="Check"
                  >
                    Match Entries
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Side-by-side Comparison */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bank Entries */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Building2" className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Bank Entries</h2>
                  <Badge variant="secondary">{filteredBankEntries.length}</Badge>
                </div>
              </div>

              <div className="mb-4">
                <Input
                  placeholder="Search bank entries..."
                  value={bankFilter}
                  onChange={(e) => setBankFilter(e.target.value)}
                  icon="Search"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredBankEntries.length === 0 ? (
                  <Empty
                    icon="Building2"
                    title="No bank entries"
                    message="All bank entries have been matched or filtered out"
                  />
                ) : (
                  filteredBankEntries.map((entry) => (
                    <motion.div
                      key={entry.Id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        p-3 border rounded-lg cursor-pointer transition-all duration-200
                        ${selectedBankEntry?.Id === entry.Id
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setSelectedBankEntry(entry)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{entry.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{entry.reference}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {format(new Date(entry.date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${getAmountClass(entry.amount)}`}>
                            {entry.amount >= 0 ? '+' : '-'}{formatCurrency(entry.amount)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>

            {/* Keepara Transactions */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Receipt" className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Keepara Transactions</h2>
                  <Badge variant="secondary">{filteredTransactions.length}</Badge>
                </div>
              </div>

              <div className="mb-4">
                <Input
                  placeholder="Search transactions..."
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  icon="Search"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredTransactions.length === 0 ? (
                  <Empty
                    icon="Receipt"
                    title="No transactions"
                    message="All transactions have been matched or filtered out"
                  />
                ) : (
                  filteredTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.Id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        p-3 border rounded-lg cursor-pointer transition-all duration-200
                        ${selectedTransaction?.Id === transaction.Id
                          ? 'border-green-500 bg-green-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {format(new Date(transaction.date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${getAmountClass(transaction.amount)}`}>
                            {transaction.amount >= 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

export default ReconciliationPage