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
import { format, subDays, subMonths } from 'date-fns'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [savedReports, setSavedReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedClient, setSelectedClient] = useState('all')
  const [dateRange, setDateRange] = useState('last-30-days')

  const loadReports = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock report templates
      setReports([
        {
          Id: 1,
          name: 'Profit & Loss Statement',
          description: 'Comprehensive income and expense summary',
          icon: 'TrendingUp',
          category: 'Financial',
          frequency: 'Monthly',
          clients: 'All',
          estimatedTime: '2 minutes',
          popularity: 95
        },
        {
          Id: 2,
          name: 'Balance Sheet',
          description: 'Assets, liabilities, and equity snapshot',
          icon: 'Scale',
          category: 'Financial',
          frequency: 'Quarterly',
          clients: 'All',
          estimatedTime: '3 minutes',
          popularity: 88
        },
        {
          Id: 3,
          name: 'Cash Flow Statement',
          description: 'Cash inflows and outflows analysis',
          icon: 'Waves',
          category: 'Financial',
          frequency: 'Monthly',
          clients: 'All',
          estimatedTime: '2 minutes',
          popularity: 92
        },
        {
          Id: 4,
          name: 'Expense Analysis',
          description: 'Detailed breakdown of business expenses',
          icon: 'PieChart',
          category: 'Analysis',
          frequency: 'Monthly',
          clients: 'Individual',
          estimatedTime: '1 minute',
          popularity: 78
        },
        {
          Id: 5,
          name: 'Revenue Trends',
          description: 'Revenue growth and trend analysis',
          icon: 'BarChart3',
          category: 'Analysis',
          frequency: 'Monthly',
          clients: 'Individual',
          estimatedTime: '2 minutes',
          popularity: 85
        },
        {
          Id: 6,
          name: 'Tax Preparation Summary',
          description: 'Annual tax preparation documentation',
          icon: 'FileText',
          category: 'Tax',
          frequency: 'Annual',
          clients: 'All',
          estimatedTime: '5 minutes',
          popularity: 96
        },
        {
          Id: 7,
          name: 'Budget vs Actual',
          description: 'Compare planned vs actual performance',
          icon: 'Target',
          category: 'Analysis',
          frequency: 'Monthly',
          clients: 'Individual',
          estimatedTime: '3 minutes',
          popularity: 72
        },
        {
          Id: 8,
          name: 'Account Reconciliation',
          description: 'Bank and credit card reconciliation status',
          icon: 'CheckCircle',
          category: 'Reconciliation',
          frequency: 'Monthly',
          clients: 'Individual',
          estimatedTime: '1 minute',
          popularity: 89
        }
      ])

      // Mock saved reports
      setSavedReports([
        {
          Id: 1,
          name: 'Q4 2023 P&L - Acme Corp',
          type: 'Profit & Loss Statement',
          client: 'Acme Corporation',
          dateRange: 'Oct 1 - Dec 31, 2023',
          createdAt: new Date(Date.now() - 86400000 * 7),
          size: '2.4 MB',
          format: 'PDF'
        },
        {
          Id: 2,
          name: 'Monthly Expenses - Tech Solutions',
          type: 'Expense Analysis',
          client: 'Tech Solutions Inc',
          dateRange: 'January 2024',
          createdAt: new Date(Date.now() - 86400000 * 3),
          size: '1.8 MB',
          format: 'Excel'
        },
        {
          Id: 3,
          name: 'Cash Flow - Local Restaurant',
          type: 'Cash Flow Statement',
          client: 'Local Restaurant',
          dateRange: 'Q1 2024',
          createdAt: new Date(Date.now() - 86400000 * 1),
          size: '3.1 MB',
          format: 'PDF'
        }
      ])
      
    } catch (err) {
      setError('Failed to load reports')
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [])

  const handleGenerateReport = (report) => {
    toast.info(`Generating ${report.name}...`)
    // Simulate report generation
    setTimeout(() => {
      toast.success(`${report.name} generated successfully!`)
    }, 2000)
  }

  const handleDownloadReport = (report) => {
    toast.success(`Downloading ${report.name}`)
  }

  const handleShareReport = (report) => {
    toast.info(`Sharing ${report.name} with client`)
  }

  const clients = [
    { value: 'all', label: 'All Clients' },
    { value: '1', label: 'Acme Corporation' },
    { value: '2', label: 'Tech Solutions Inc' },
    { value: '3', label: 'Local Restaurant' },
    { value: '4', label: 'Marketing Agency' }
  ]

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-quarter', label: 'Last quarter' },
    { value: 'last-year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Reports" message={error} onRetry={loadReports} />
  }

  if (reports.length === 0) {
    return (
      <Empty 
        title="No report templates available"
        message="Contact support to set up your report templates"
        icon="FileText"
        actionLabel="Contact Support"
        onAction={() => toast.info('Opening support chat...')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Generate comprehensive financial reports for your clients</p>
        </div>
        <Button icon="Plus" onClick={() => toast.info('Custom report builder would open here')}>
          Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="FileText" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{reports.length}</div>
          <div className="text-sm text-gray-600">Report Templates</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Download" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{savedReports.length}</div>
          <div className="text-sm text-gray-600">Generated Reports</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Share" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
          <div className="text-sm text-gray-600">Reports Shared</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">2.5</div>
          <div className="text-sm text-gray-600">Avg. Gen Time (min)</div>
        </Card>
      </div>

      {/* Report Generation Form */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client
            </label>
            <select 
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {clients.map(client => (
                <option key={client.value} value={client.value}>{client.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button className="w-full" icon="Play">
              Quick Generate
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Templates */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.Id} className="hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={report.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500">{report.popularity}%</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <Badge variant="default">{report.category}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Frequency</span>
                  <span className="text-gray-900">{report.frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Est. Time</span>
                  <span className="text-gray-900">{report.estimatedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Clients</span>
                  <span className="text-gray-900">{report.clients}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleGenerateReport(report)}
                >
                  Generate
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon="Settings"
                  onClick={() => toast.info(`Customizing ${report.name}...`)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          <Button variant="ghost" size="sm" icon="ExternalLink">
            View All
          </Button>
        </div>

        {savedReports.length === 0 ? (
          <Empty 
            title="No reports generated yet"
            message="Generate your first report using the templates above"
            icon="FileText"
            actionLabel="Generate Report"
          />
        ) : (
          <div className="space-y-3">
            {savedReports.map((report) => (
              <div key={report.Id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileText" className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <div className="text-sm text-gray-500">
                      {report.client} • {report.dateRange} • {report.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="info">{report.format}</Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(report.createdAt), 'MMM dd')}
                  </span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="Download"
                      onClick={() => handleDownloadReport(report)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="Share"
                      onClick={() => handleShareReport(report)}
                    />
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
        )}
      </Card>
    </div>
  )
}

export default Reports