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

const Messages = () => {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const loadConversations = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock conversations data
      setConversations([
        {
          Id: 1,
          client: 'Acme Corporation',
          clientId: 1,
          lastMessage: "Thanks for the updated financial reports. Everything looks good!",
          lastMessageAt: new Date(Date.now() - 86400000),
          unreadCount: 2,
          avatar: 'AC',
          online: true
        },
        {
          Id: 2,
          client: 'Tech Solutions Inc',
          clientId: 2,
          lastMessage: "Can you help me understand the expense categorization for last month?",
          lastMessageAt: new Date(Date.now() - 86400000 * 2),
          unreadCount: 0,
          avatar: 'TS',
          online: false
        },
        {
          Id: 3,
          client: 'Local Restaurant',
          clientId: 3,
          lastMessage: "I've uploaded the receipts from last week. Please review when you get a chance.",
          lastMessageAt: new Date(Date.now() - 86400000 * 3),
          unreadCount: 1,
          avatar: 'LR',
          online: true
        },
        {
          Id: 4,
          client: 'Marketing Agency',
          clientId: 4,
          lastMessage: "Great work on the tax preparation! The documents are perfect.",
          lastMessageAt: new Date(Date.now() - 86400000 * 5),
          unreadCount: 0,
          avatar: 'MA',
          online: false
        }
      ])

      // Mock messages for first conversation
      setMessages([
        {
          Id: 1,
          conversationId: 1,
          sender: 'client',
          senderName: 'John Smith',
          content: "Hi Sarah, I wanted to follow up on the financial reports you sent last week.",
          timestamp: new Date(Date.now() - 86400000 * 2),
          read: true,
          attachments: []
        },
        {
          Id: 2,
          conversationId: 1,
          sender: 'bookkeeper',
          senderName: 'Sarah Johnson',
          content: "Hi John! Yes, I sent the Q4 reports. Did you have any specific questions about them?",
          timestamp: new Date(Date.now() - 86400000 * 2 + 3600000),
          read: true,
          attachments: []
        },
        {
          Id: 3,
          conversationId: 1,
          sender: 'client',
          senderName: 'John Smith',
          content: "The revenue projections look great. Can you also send me the expense breakdown by category?",
          timestamp: new Date(Date.now() - 86400000 * 1),
          read: true,
          attachments: []
        },
        {
          Id: 4,
          conversationId: 1,
          sender: 'bookkeeper',
          senderName: 'Sarah Johnson',
          content: "Absolutely! I'll prepare the detailed expense analysis and send it over today.",
          timestamp: new Date(Date.now() - 86400000 * 1 + 1800000),
          read: true,
          attachments: [
            { name: 'Expense_Analysis_Q4.pdf', size: '2.4 MB', type: 'pdf' }
          ]
        },
        {
          Id: 5,
          conversationId: 1,
          sender: 'client',
          senderName: 'John Smith',
          content: "Thanks for the updated financial reports. Everything looks good!",
          timestamp: new Date(Date.now() - 86400000),
          read: false,
          attachments: []
        },
        {
          Id: 6,
          conversationId: 1,
          sender: 'client',
          senderName: 'John Smith',
          content: "One quick question - should we schedule a call to discuss the tax strategy for next quarter?",
          timestamp: new Date(Date.now() - 86400000 + 3600000),
          read: false,
          attachments: []
        }
      ])

      // Set first conversation as selected by default
      setSelectedConversation(1)
      
    } catch (err) {
      setError('Failed to load messages')
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConversations()
  }, [])

  const filteredConversations = conversations.filter(conv =>
    conv.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedConvMessages = messages.filter(msg => 
    msg.conversationId === selectedConversation
  ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      Id: messages.length + 1,
      conversationId: selectedConversation,
      sender: 'bookkeeper',
      senderName: 'Sarah Johnson',
      content: newMessage,
      timestamp: new Date(),
      read: true,
      attachments: []
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Update conversation last message
    const updatedConversations = conversations.map(conv =>
      conv.Id === selectedConversation
        ? { ...conv, lastMessage: newMessage, lastMessageAt: new Date() }
        : conv
    )
    setConversations(updatedConversations)

    toast.success('Message sent!')
  }

  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      toast.info(`Attaching ${files.length} file${files.length > 1 ? 's' : ''}...`)
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Failed to Load Messages" message={error} onRetry={loadConversations} />
  }

  if (conversations.length === 0) {
    return (
      <Empty 
        title="No conversations yet"
        message="Start a conversation with your clients to discuss their bookkeeping needs"
        icon="MessageSquare"
        actionLabel="New Conversation"
        onAction={() => toast.info('New conversation feature coming soon')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate securely with your clients</p>
        </div>
        <div className="flex items-center space-x-3">
          {totalUnread > 0 && (
            <Badge variant="primary" className="px-3 py-1">
              {totalUnread} unread
            </Badge>
          )}
          <Button icon="Plus">New Conversation</Button>
        </div>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
              className="w-full"
            />
          </div>
          
          <div className="overflow-y-auto h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.Id}
                onClick={() => setSelectedConversation(conversation.Id)}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200 ${
                  selectedConversation === conversation.Id 
                    ? 'bg-primary-50 border-primary-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {conversation.avatar}
                      </span>
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.client}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 truncate mb-1">
                      {conversation.lastMessage}
                    </p>
                    
                    <p className="text-xs text-gray-400">
                      {format(new Date(conversation.lastMessageAt), 'MMM dd, h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Messages Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {conversations.find(c => c.Id === selectedConversation)?.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {conversations.find(c => c.Id === selectedConversation)?.client}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {conversations.find(c => c.Id === selectedConversation)?.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" icon="Phone" />
                    <Button variant="ghost" size="sm" icon="Video" />
                    <Button variant="ghost" size="sm" icon="MoreHorizontal" />
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConvMessages.map((message) => (
                  <div
                    key={message.Id}
                    className={`flex ${message.sender === 'bookkeeper' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'bookkeeper' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'bookkeeper'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {message.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-primary-400 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ApperIcon name="Paperclip" className="w-3 h-3" />
                                <span>{attachment.name}</span>
                                <span className="text-primary-200">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <p className={`text-xs text-gray-500 mt-1 ${
                        message.sender === 'bookkeeper' ? 'text-right' : 'text-left'
                      }`}>
                        {format(new Date(message.timestamp), 'MMM dd, h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileAttachment}
                        className="hidden"
                      />
                      <Button variant="ghost" size="sm" icon="Paperclip" as="span" />
                    </label>
                    
                    <Button
                      type="submit"
                      size="sm"
                      icon="Send"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="MessageSquare" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a client from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" icon="UserPlus" className="h-12">
            Add Client
          </Button>
          <Button variant="secondary" icon="Calendar" className="h-12">
            Schedule Call
          </Button>
          <Button variant="secondary" icon="FileText" className="h-12">
            Share Report
          </Button>
          <Button variant="secondary" icon="Settings" className="h-12">
            Message Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Messages