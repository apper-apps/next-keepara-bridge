import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import * as clientService from "@/services/api/clientService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import DataTable from "@/components/molecules/DataTable";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState({
    Name: '',
    Tags: '',
    Owner: null
  })
const loadClients = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await clientService.getAll()
      setClients(data)
      
    } catch (err) {
      setError('Failed to load clients')
      console.error('Error loading clients:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClient = async () => {
    try {
      setFormLoading(true)
      const newClient = await clientService.create(formData)
      
      if (newClient) {
        await loadClients()
        setShowCreateModal(false)
        setFormData({ Name: '', Tags: '', Owner: null })
      }
    } catch (err) {
      console.error('Error creating client:', err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditClient = async () => {
    try {
      setFormLoading(true)
      const updatedClient = await clientService.update(selectedClient.Id, formData)
      
      if (updatedClient) {
        await loadClients()
        setShowEditModal(false)
        setSelectedClient(null)
        setFormData({ Name: '', Tags: '', Owner: null })
      }
    } catch (err) {
      console.error('Error updating client:', err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteClient = async (client) => {
    if (window.confirm(`Are you sure you want to delete "${client.Name}"?`)) {
      const success = await clientService.delete(client.Id)
      if (success) {
        await loadClients()
      }
    }
  }

  const openCreateModal = () => {
    setFormData({ Name: '', Tags: '', Owner: null })
    setShowCreateModal(true)
  }

  const openEditModal = (client) => {
    setSelectedClient(client)
    setFormData({
      Name: client.Name || '',
      Tags: client.Tags || '',
      Owner: client.Owner || null
    })
    setShowEditModal(true)
  }

  const openDetailModal = (client) => {
    setSelectedClient(client)
    setShowDetailModal(true)
  }

  useEffect(() => {
    loadClients()
  }, [])

const filteredClients = clients.filter(client =>
    client.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.Tags?.toLowerCase().includes(searchTerm.toLowerCase())
  )

const handleClientAction = (action, client) => {
    switch (action) {
      case 'view':
        openDetailModal(client)
        break
      case 'edit':
        openEditModal(client)
        break
      case 'delete':
        handleDeleteClient(client)
        break
      case 'transactions':
        toast.info(`Viewing transactions for ${client.Name}`)
        break
      case 'reports':
        toast.info(`Generating reports for ${client.Name}`)
        break
      default:
        break
    }
  }

const columns = [
    {
      header: 'Client',
      key: 'Name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {value ? value.split(' ').map(n => n[0]).join('').toUpperCase() : 'C'}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value || 'Unnamed Client'}</div>
            <div className="text-sm text-gray-500">ID: {row.Id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Tags',
      key: 'Tags',
      render: (value) => (
        <div className="text-sm text-gray-900">{value || 'No tags'}</div>
      )
    },
    {
      header: 'Owner',
      key: 'Owner',
      render: (value) => (
        <span className="font-medium text-gray-900">
          {value?.Name || 'Unassigned'}
        </span>
      )
    },
    {
      header: 'Created',
      key: 'CreatedOn',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {value ? format(new Date(value), 'MMM dd, yyyy') : 'Unknown'}
        </span>
      )
    },
    {
      header: 'Modified',
      key: 'ModifiedOn',
      render: (value) => (
        <span className="text-sm text-gray-500">
          {value ? format(new Date(value), 'MMM dd, yyyy') : 'Never'}
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
      icon: 'Trash2',
      onClick: (client) => handleClientAction('delete', client)
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
        onAction={openCreateModal}
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
<Button icon="Plus" onClick={openCreateModal}>
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
          onAction={openCreateModal}
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
                      {client.Name ? client.Name.split(' ').map(n => n[0]).join('').toUpperCase() : 'C'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.Name || 'Unnamed Client'}</h3>
                    <p className="text-sm text-gray-500">ID: {client.Id}</p>
                  </div>
                </div>
                <Badge variant="info">
                  Client
                </Badge>
              </div>
              
<div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tags</span>
                  <span className="text-sm font-medium text-gray-900">{client.Tags || 'No tags'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Owner</span>
                  <span className="text-sm font-medium text-gray-900">{client.Owner?.Name || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm text-gray-500">
                    {client.CreatedOn ? format(new Date(client.CreatedOn), 'MMM dd, yyyy') : 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Modified</span>
                  <span className="text-sm text-gray-500">
                    {client.ModifiedOn ? format(new Date(client.ModifiedOn), 'MMM dd') : 'Never'}
                  </span>
                </div>
              </div>
              
<div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon="Eye" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClientAction('view', client)
                  }}
                >
                  View
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon="Edit" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClientAction('edit', client)
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon="Trash2" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClientAction('delete', client)
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
)}

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create New Client</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                icon="X" 
                onClick={() => setShowCreateModal(false)}
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Client Name"
                value={formData.Name}
                onChange={(e) => setFormData({...formData, Name: e.target.value})}
                placeholder="Enter client name"
                required
              />
              
              <Input
                label="Tags"
                value={formData.Tags}
                onChange={(e) => setFormData({...formData, Tags: e.target.value})}
                placeholder="Enter tags (comma separated)"
              />
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleCreateClient}
                  disabled={formLoading || !formData.Name.trim()}
                  loading={formLoading}
                >
                  Create Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Client</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                icon="X" 
                onClick={() => setShowEditModal(false)}
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Client Name"
                value={formData.Name}
                onChange={(e) => setFormData({...formData, Name: e.target.value})}
                placeholder="Enter client name"
                required
              />
              
              <Input
                label="Tags"
                value={formData.Tags}
                onChange={(e) => setFormData({...formData, Tags: e.target.value})}
                placeholder="Enter tags (comma separated)"
              />
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowEditModal(false)}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleEditClient}
                  disabled={formLoading || !formData.Name.trim()}
                  loading={formLoading}
                >
                  Update Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {showDetailModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Client Details</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                icon="X" 
                onClick={() => setShowDetailModal(false)}
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {selectedClient.Name ? selectedClient.Name.split(' ').map(n => n[0]).join('').toUpperCase() : 'C'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedClient.Name || 'Unnamed Client'}</h3>
                  <p className="text-gray-600">Client ID: {selectedClient.Id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedClient.Name || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tags:</span>
                      <span className="font-medium">{selectedClient.Tags || 'No tags'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-medium">{selectedClient.Owner?.Name || 'Unassigned'}</span>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-3">Timestamps</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">
                        {selectedClient.CreatedOn ? format(new Date(selectedClient.CreatedOn), 'MMM dd, yyyy HH:mm') : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created By:</span>
                      <span className="font-medium">{selectedClient.CreatedBy?.Name || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modified:</span>
                      <span className="font-medium">
                        {selectedClient.ModifiedOn ? format(new Date(selectedClient.ModifiedOn), 'MMM dd, yyyy HH:mm') : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modified By:</span>
                      <span className="font-medium">{selectedClient.ModifiedBy?.Name || 'None'}</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="secondary"
                  icon="Edit"
                  onClick={() => {
                    setShowDetailModal(false)
                    openEditModal(selectedClient)
                  }}
                  className="flex-1"
                >
                  Edit Client
                </Button>
                <Button 
                  variant="danger"
                  icon="Trash2"
                  onClick={() => {
                    setShowDetailModal(false)
                    handleDeleteClient(selectedClient)
                  }}
                  className="flex-1"
                >
                  Delete Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients