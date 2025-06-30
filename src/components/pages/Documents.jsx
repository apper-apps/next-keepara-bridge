import React, { useState, useEffect } from 'react'
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

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [dragActive, setDragActive] = useState(false)

  const loadDocuments = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock documents data
      setDocuments([
        {
          Id: 1,
          name: 'Office_Supplies_Receipt_001.pdf',
          type: 'receipt',
          client: 'Acme Corporation',
          clientId: 1,
          size: '2.4 MB',
          uploadedAt: new Date(Date.now() - 86400000),
          uploadedBy: 'Sarah Johnson',
          category: 'Office Expenses',
          status: 'processed',
          ocrData: {
            vendor: 'Staples Inc.',
            amount: 245.67,
            date: '2024-01-15',
            confidence: 0.95
          },
          url: '/documents/receipt-001.pdf',
          thumbnail: '/thumbnails/receipt-001.jpg'
        },
        {
          Id: 2,
          name: 'Monthly_Invoice_Tech_Solutions.pdf',
          type: 'invoice',
          client: 'Tech Solutions Inc',
          clientId: 2,
          size: '1.8 MB',
          uploadedAt: new Date(Date.now() - 86400000 * 3),
          uploadedBy: 'Sarah Johnson',
          category: 'Professional Services',
          status: 'processed',
          ocrData: {
            vendor: 'Tech Solutions Inc',
            amount: 2500.00,
            date: '2024-01-12',
            confidence: 0.88
          },
          url: '/documents/invoice-002.pdf',
          thumbnail: '/thumbnails/invoice-002.jpg'
        },
        {
          Id: 3,
          name: 'Bank_Statement_January_2024.pdf',
          type: 'statement',
          client: 'Local Restaurant',
          clientId: 3,
          size: '5.2 MB',
          uploadedAt: new Date(Date.now() - 86400000 * 7),
          uploadedBy: 'Client Upload',
          category: 'Banking',
          status: 'processing',
          ocrData: null,
          url: '/documents/statement-003.pdf',
          thumbnail: '/thumbnails/statement-003.jpg'
        },
        {
          Id: 4,
          name: 'Equipment_Purchase_Laptop.pdf',
          type: 'receipt',
          client: 'Marketing Agency',
          clientId: 4,
          size: '3.1 MB',
          uploadedAt: new Date(Date.now() - 86400000 * 2),
          uploadedBy: 'Client Upload',
          category: 'Equipment',
          status: 'processed',
          ocrData: {
            vendor: 'Best Buy',
            amount: 1299.99,
            date: '2024-01-13',
            confidence: 0.92
          },
          url: '/documents/receipt-004.pdf',
          thumbnail: '/thumbnails/receipt-004.jpg'
        },
        {
          Id: 5,
          name: 'Utility_Bill_Electricity.pdf',
          type: 'bill',
          client: 'Acme Corporation',
          clientId: 1,
          size: '1.5 MB',
          uploadedAt: new Date(Date.now() - 86400000 * 5),
          uploadedBy: 'Sarah Johnson',
          category: 'Utilities',
          status: 'error',
          ocrData: null,
          url: '/documents/bill-005.pdf',
          thumbnail: '/thumbnails/bill-005.jpg'
        },
        {
          Id: 6,
          name: 'Tax_Document_W9_Form.pdf',
          type: 'tax',
          client: 'Tech Solutions Inc',
          clientId: 2,
          size: '800 KB',
          uploadedAt: new Date(Date.now() - 86400000 * 10),
          uploadedBy: 'Client Upload',
          category: 'Tax Documents',
          status: 'processed',
          ocrData: {
            vendor: 'IRS',
            amount: null,
            date: '2024-01-05',
            confidence: 0.98
          },
          url: '/documents/tax-006.pdf',
          thumbnail: '/thumbnails/tax-006.jpg'
        }
      ])
      
    } catch (err) {
      setError('Failed to load documents')
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || doc.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      toast.info(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`)
      // Simulate upload
      setTimeout(() => {
        toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`)
      }, 2000)
    }
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      toast.info(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`)
      // Simulate upload
      setTimeout(() => {
        toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`)
      }, 2000)
    }
  }

  const handleDocumentAction = (action, document) => {
    switch (action) {
      case 'view':
        toast.info(`Opening ${document.name}`)
        break
      case 'download':
        toast.success(`Downloading ${document.name}`)
        break
      case 'process':
        toast.info(`Processing ${document.name} with OCR...`)
        setTimeout(() => {
          toast.success(`${document.name} processed successfully!`)
        }, 3000)
        break
      case 'categorize':
        toast.info(`Categorizing ${document.name}`)
        break
      case 'delete':
        if (window.confirm('Are you sure you want to delete this document?')) {
          const updatedDocuments = documents.filter(doc => doc.Id !== document.Id)
          setDocuments(updatedDocuments)
          toast.success('Document deleted')
        }
        break
      default:
        break
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'success'
      case 'processing': return 'warning'
      case 'error': return 'error'
      default: return 'default'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'receipt': return 'Receipt'
      case 'invoice': return 'FileText'
      case 'statement': return 'CreditCard'
      case 'bill': return 'Zap'
      case 'tax': return 'Calculator'
      case 'contract': return 'FileSignature'
      default: return 'File'
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Documents" message={error} onRetry={loadDocuments} />
  }

  const stats = {
    total: documents.length,
    processed: documents.filter(doc => doc.status === 'processed').length,
    processing: documents.filter(doc => doc.status === 'processing').length,
    errors: documents.filter(doc => doc.status === 'error').length,
    totalSize: documents.reduce((sum, doc) => {
      const size = parseFloat(doc.size.replace(/[^\d.]/g, ''))
      const unit = doc.size.includes('MB') ? 1 : 0.001
      return sum + (size * unit)
    }, 0).toFixed(1)
  }

  if (documents.length === 0 && !searchTerm) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">Upload and organize your financial documents</p>
          </div>
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors duration-200">
          <div
            className="text-center py-12"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Upload" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload your first document</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Drag and drop files here, or click the button below to select files from your computer
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button as="span" icon="Upload" className="min-w-32">
                  Choose Files
                </Button>
              </label>
              <Button variant="secondary" icon="Camera" className="min-w-32">
                Take Photo
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Upload, organize, and process your financial documents</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon="Camera">
            Scan
          </Button>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button as="span" icon="Upload">
              Upload Files
            </Button>
          </label>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="FolderOpen" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.processed}</div>
          <div className="text-sm text-gray-600">Processed</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.processing}</div>
          <div className="text-sm text-gray-600">Processing</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.errors}</div>
          <div className="text-sm text-gray-600">Errors</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="HardDrive" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalSize}</div>
          <div className="text-sm text-gray-600">MB Storage</div>
        </Card>
      </div>

      {/* Upload Zone */}
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center py-8">
          <ApperIcon name="Upload" className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-3">
            Drag and drop files here, or{' '}
            <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
              browse to upload
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            PDF, JPG, PNG, DOC, DOCX up to 10MB each
          </p>
        </div>
      </Card>

      {/* Filters and View Controls */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="Search"
              />
            </div>
            
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Types</option>
              <option value="receipt">Receipts</option>
              <option value="invoice">Invoices</option>
              <option value="statement">Statements</option>
              <option value="bill">Bills</option>
              <option value="tax">Tax Documents</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ApperIcon name="Grid3X3" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ApperIcon name="List" className="w-4 h-4" />
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

      {/* AI Processing Status */}
      {stats.processing > 0 && (
        <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Brain" className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">AI Processing in Progress</h3>
              <p className="text-sm text-gray-600 mb-3">
                {stats.processing} document{stats.processing > 1 ? 's are' : ' is'} being processed with OCR technology for automatic data extraction.
              </p>
              <div className="flex space-x-3">
                <Button size="sm" onClick={() => toast.info('Checking processing status...')}>
                  Check Status
                </Button>
                <Button variant="secondary" size="sm">
                  View Queue
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Documents Grid/List */}
      {filteredDocuments.length === 0 ? (
        <Empty 
          title="No documents found"
          message={searchTerm ? `No documents match "${searchTerm}"` : "No documents match your current filters"}
          icon="FolderOpen"
          actionLabel="Upload Documents"
          onAction={() => document.querySelector('input[type="file"]').click()}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.Id} className="hover:shadow-card-hover transition-all duration-200">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <ApperIcon name={getTypeIcon(document.type)} className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant={getStatusColor(document.status)} size="sm">
                    {document.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 truncate" title={document.name}>
                    {document.name}
                  </h3>
                  <p className="text-sm text-gray-500">{document.client}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{document.size}</span>
                  <span>{format(new Date(document.uploadedAt), 'MMM dd')}</span>
                </div>

                {document.ocrData && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium text-gray-900">
                        ${document.ocrData.amount?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>AI Confidence:</span>
                      <span>{Math.round(document.ocrData.confidence * 100)}%</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon="Eye" 
                    className="flex-1"
                    onClick={() => handleDocumentAction('view', document)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon="Download"
                    onClick={() => handleDocumentAction('download', document)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon="MoreHorizontal"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.Id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <ApperIcon name={getTypeIcon(document.type)} className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{document.name}</h3>
                    <div className="text-sm text-gray-500">
                      {document.client} • {document.size} • {format(new Date(document.uploadedAt), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                  
                  {document.ocrData && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${document.ocrData.amount?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round(document.ocrData.confidence * 100)}% confidence
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="Eye"
                      onClick={() => handleDocumentAction('view', document)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="Download"
                      onClick={() => handleDocumentAction('download', document)}
                    />
                    {document.status === 'error' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon="RefreshCw"
                        onClick={() => handleDocumentAction('process', document)}
                      />
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="MoreHorizontal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Documents