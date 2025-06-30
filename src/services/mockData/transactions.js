const transactions = [
  {
    Id: 1,
    date: '2024-01-15T10:30:00Z',
    description: 'Client Payment - ABC Corp Project',
    category: 'Revenue',
    amount: 2500.00,
    type: 'income',
    status: 'completed',
    clientId: 1,
    invoiceId: 'INV-2024-045'
  },
  {
    Id: 2,
    date: '2024-01-14T14:22:00Z',
    description: 'Office Rent - January 2024',
    category: 'Office Expenses',
    amount: -1200.00,
    type: 'expense',
    status: 'completed',
    vendorId: 12,
    reference: 'RENT-JAN-2024'
  },
  {
    Id: 3,
    date: '2024-01-13T09:15:00Z',
    description: 'Web Development Services',
    category: 'Revenue',
    amount: 875.50,
    type: 'income',
    status: 'completed',
    clientId: 3,
    invoiceId: 'INV-2024-046'
  },
  {
    Id: 4,
    date: '2024-01-12T16:45:00Z',
    description: 'Electricity Bill - December',
    category: 'Utilities',
    amount: -245.75,
    type: 'expense',
    status: 'completed',
    vendorId: 8,
    reference: 'ELEC-DEC-2023'
  },
  {
    Id: 5,
    date: '2024-01-11T11:30:00Z',
    description: 'Employee Salaries - January',
    category: 'Payroll',
    amount: -3200.00,
    type: 'expense',
    status: 'completed',
    departmentId: 1,
    reference: 'PAY-JAN-2024'
  },
  {
    Id: 6,
    date: '2024-01-10T13:20:00Z',
    description: 'Office Supplies Purchase',
    category: 'Office Expenses',
    amount: -127.38,
    type: 'expense',
    status: 'completed',
    vendorId: 15,
    reference: 'SUP-2024-003'
  },
  {
    Id: 7,
    date: '2024-01-09T08:45:00Z',
    description: 'Freelance Design Work',
    category: 'Revenue',
    amount: 750.00,
    type: 'income',
    status: 'completed',
    clientId: 5,
    invoiceId: 'INV-2024-047'
  },
  {
    Id: 8,
    date: '2024-01-08T15:30:00Z',
    description: 'Software License - Adobe Creative',
    category: 'Software',
    amount: -299.99,
    type: 'expense',
    status: 'completed',
    vendorId: 22,
    reference: 'LIC-ADOBE-2024'
  },
  {
    Id: 9,
    date: '2024-01-07T12:15:00Z',
    description: 'Equipment Purchase - Laptop',
    category: 'Equipment',
    amount: -1850.00,
    type: 'expense',
    status: 'completed',
    vendorId: 18,
    reference: 'EQP-2024-001'
  },
  {
    Id: 10,
    date: '2024-01-06T10:00:00Z',
    description: 'Monthly Retainer - XYZ Company',
    category: 'Revenue',
    amount: 1500.00,
    type: 'income',
    status: 'completed',
    clientId: 2,
    invoiceId: 'INV-2024-048'
  },
  {
    Id: 11,
    date: '2024-01-05T14:30:00Z',
    description: 'Marketing Campaign - Google Ads',
    category: 'Marketing',
    amount: -450.00,
    type: 'expense',
    status: 'completed',
    vendorId: 25,
    reference: 'ADS-JAN-2024'
  },
  {
    Id: 12,
    date: '2024-01-04T09:20:00Z',
    description: 'Consulting Services - Tax Prep',
    category: 'Professional Services',
    amount: -500.00,
    type: 'expense',
    status: 'completed',
    vendorId: 30,
    reference: 'TAX-PREP-2024'
  }
]

export default transactions