import transactionsData from '@/services/mockData/transactions'

let transactions = [...transactionsData]
let lastId = Math.max(...transactions.map(txn => txn.Id))

const transactionService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...transactions]
  },

  async getById(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 200))
    const transaction = transactions.find(txn => txn.Id === id)
    return transaction ? { ...transaction } : null
  },

  async create(transactionData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newTransaction = {
      ...transactionData,
      Id: ++lastId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    transactions.push(newTransaction)
    return { ...newTransaction }
  },

  async update(id, transactionData) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = transactions.findIndex(txn => txn.Id === id)
    if (index === -1) {
      throw new Error(`Transaction with ID ${id} not found`)
    }
    
    const updatedTransaction = {
      ...transactions[index],
      ...transactionData,
      Id: id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString()
    }
    
    transactions[index] = updatedTransaction
    return { ...updatedTransaction }
  },

  async delete(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = transactions.findIndex(txn => txn.Id === id)
    if (index === -1) {
      throw new Error(`Transaction with ID ${id} not found`)
    }
    
    const deletedTransaction = transactions[index]
    transactions.splice(index, 1)
    return { ...deletedTransaction }
  }
}

export default transactionService