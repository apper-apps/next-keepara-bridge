const bankEntries = [
  {
    Id: 1,
    date: '2024-01-15T10:30:00Z',
    description: 'ACH Credit - Client Payment ABC Corp',
    reference: 'ACH-2024-001',
    amount: 2500.00,
    balance: 15750.00,
    type: 'credit',
    status: 'cleared'
  },
  {
    Id: 2,
    date: '2024-01-14T14:22:00Z',
    description: 'Wire Transfer - Office Rent Payment',
    reference: 'WIRE-2024-003',
    amount: -1200.00,
    balance: 13250.00,
    type: 'debit',
    status: 'cleared'
  },
  {
    Id: 3,
    date: '2024-01-13T09:15:00Z',
    description: 'Check Deposit - Invoice #INV-2024-045',
    reference: 'CHK-2024-012',
    amount: 875.50,
    balance: 14450.00,
    type: 'credit',
    status: 'cleared'
  },
  {
    Id: 4,
    date: '2024-01-12T16:45:00Z',
    description: 'Online Transfer - Utility Payment',
    reference: 'OTF-2024-018',
    amount: -245.75,
    balance: 13574.50,
    type: 'debit',
    status: 'cleared'
  },
  {
    Id: 5,
    date: '2024-01-11T11:30:00Z',
    description: 'Direct Deposit - Payroll Processing',
    reference: 'DD-2024-007',
    amount: 3200.00,
    balance: 13820.25,
    type: 'credit',
    status: 'cleared'
  },
  {
    Id: 6,
    date: '2024-01-10T13:20:00Z',
    description: 'Card Payment - Office Supplies',
    reference: 'CARD-2024-029',
    amount: -127.38,
    balance: 10620.25,
    type: 'debit',
    status: 'cleared'
  },
  {
    Id: 7,
    date: '2024-01-09T08:45:00Z',
    description: 'ACH Credit - Freelance Payment',
    reference: 'ACH-2024-002',
    amount: 750.00,
    balance: 10747.63,
    type: 'credit',
    status: 'cleared'
  },
  {
    Id: 8,
    date: '2024-01-08T15:30:00Z',
    description: 'Check Payment - Software License',
    reference: 'CHK-2024-013',
    amount: -299.99,
    balance: 9997.63,
    type: 'debit',
    status: 'cleared'
  },
  {
    Id: 9,
    date: '2024-01-07T12:15:00Z',
    description: 'Wire Transfer - Equipment Purchase',
    reference: 'WIRE-2024-004',
    amount: -1850.00,
    balance: 10297.62,
    type: 'debit',
    status: 'cleared'
  },
  {
    Id: 10,
    date: '2024-01-06T10:00:00Z',
    description: 'ACH Credit - Monthly Retainer',
    reference: 'ACH-2024-003',
    amount: 1500.00,
    balance: 12147.62,
    type: 'credit',
    status: 'cleared'
  }
]

export default bankEntries