import bankEntriesData from '@/services/mockData/bankEntries'

let bankEntries = [...bankEntriesData]
let lastId = Math.max(...bankEntries.map(entry => entry.Id))

const bankEntryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...bankEntries]
  },

  async getById(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 200))
    const entry = bankEntries.find(entry => entry.Id === id)
    return entry ? { ...entry } : null
  },

  async create(entryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newEntry = {
      ...entryData,
      Id: ++lastId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    bankEntries.push(newEntry)
    return { ...newEntry }
  },

  async update(id, entryData) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = bankEntries.findIndex(entry => entry.Id === id)
    if (index === -1) {
      throw new Error(`Bank entry with ID ${id} not found`)
    }
    
    const updatedEntry = {
      ...bankEntries[index],
      ...entryData,
      Id: id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString()
    }
    
    bankEntries[index] = updatedEntry
    return { ...updatedEntry }
  },

  async delete(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer')
    }
    
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = bankEntries.findIndex(entry => entry.Id === id)
    if (index === -1) {
      throw new Error(`Bank entry with ID ${id} not found`)
    }
    
    const deletedEntry = bankEntries[index]
    bankEntries.splice(index, 1)
    return { ...deletedEntry }
  }
}

export default bankEntryService