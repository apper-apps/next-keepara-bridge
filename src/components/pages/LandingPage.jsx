import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const LandingPage = () => {
  const features = [
    {
      icon: 'Calculator',
      title: 'Smart Bookkeeping',
      description: 'AI-powered transaction categorization and reconciliation for accurate financial records.'
    },
    {
      icon: 'Users',
      title: 'Client Management',
      description: 'Seamlessly manage multiple clients with dedicated dashboards and secure communication.'
    },
    {
      icon: 'Receipt',
      title: 'Automated Invoicing',
      description: 'Create professional invoices with integrated Stripe payments and automated reminders.'
    },
    {
      icon: 'FileText',
      title: 'Financial Reports',
      description: 'Generate comprehensive P&L, Balance Sheet, and Cash Flow reports with one click.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile-First Design',
      description: 'Access your bookkeeping tools anywhere with our responsive PWA design.'
    },
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade security and encryption.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Certified Bookkeeper',
      content: 'Keepara has transformed how I manage my clients. The AI categorization saves me hours every week.',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      content: 'The client portal gives me real-time visibility into my finances. It\'s like having a CFO on demand.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Accounting Firm Owner',
      content: 'We\'ve scaled our practice 3x since adopting Keepara. The efficiency gains are incredible.',
      avatar: 'ER'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      features: [
        'Up to 5 clients',
        'Basic reporting',
        'Mobile app access',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      features: [
        'Up to 25 clients',
        'Advanced AI features',
        'Custom reports',
        'Priority support',
        'Stripe integration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      features: [
        'Unlimited clients',
        'White-label solution',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Keepara</h1>
                <p className="text-xs text-gray-500">Professional Bookkeeping</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/app" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Button as={Link} to="/app" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Professional Bookkeeping
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Streamline your bookkeeping workflows with AI-powered insights, seamless client collaboration, 
              and professional financial reporting tools designed for modern accounting practices.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button as={Link} to="/app" size="lg" className="min-w-48">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" icon="Play" className="min-w-48">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make bookkeeping efficient, accurate, and profitable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Keepara is helping bookkeepers and businesses achieve better financial outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your practice size and grow as you scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <Card className={`text-center h-full ${plan.popular ? 'border-2 border-primary-500' : ''}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center text-gray-600">
                        <ApperIcon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? 'primary' : 'secondary'} 
                    size="lg" 
                    className="w-full"
                    as={Link}
                    to="/app"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to transform your bookkeeping practice?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of professionals who trust Keepara for their financial operations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="min-w-48 bg-white text-primary-600 hover:bg-gray-50"
                as={Link}
                to="/app"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="min-w-48 text-white border-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Keepara</h3>
                  <p className="text-sm text-gray-400">Professional Bookkeeping</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering bookkeepers and businesses with intelligent financial management tools 
                for the modern economy.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Keepara. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage