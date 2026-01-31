'use client'

import Link from 'next/link'
import { Mail, MessageSquare, Calendar, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      // Send to Web3Forms (free, no API key visible in client)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // Replace with actual key
          subject: `TrustScope Contact: ${formData.topic}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          topic: formData.topic,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          topic: '',
          message: ''
        })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Whether you're evaluating TrustScope for your team or have questions
            about AI governance, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Sales */}
            <div className="card text-center p-8">
              <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Book a Demo</h3>
              <p className="text-slate-400 text-sm mb-6">
                See TrustScope in action. 30-minute walkthrough tailored to your use case.
              </p>
              <a
                href="https://calendly.com/trustscope/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Schedule Demo <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Support */}
            <div className="card text-center p-8">
              <MessageSquare className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Technical Support</h3>
              <p className="text-slate-400 text-sm mb-6">
                Questions about integration, SDKs, or technical implementation.
              </p>
              <a
                href="mailto:support@trustscope.ai"
                className="btn-secondary inline-flex items-center gap-2"
              >
                support@trustscope.ai
              </a>
            </div>

            {/* General */}
            <div className="card text-center p-8">
              <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">General Inquiries</h3>
              <p className="text-slate-400 text-sm mb-6">
                Partnerships, press, or anything else. We read every email.
              </p>
              <a
                href="mailto:hello@trustscope.ai"
                className="btn-secondary inline-flex items-center gap-2"
              >
                hello@trustscope.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Send us a message</h2>

            {formState === 'success' ? (
              <div className="card p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-6">
                  Thanks for reaching out. We typically respond within 24 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    What can we help with?
                  </label>
                  <select
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="demo">Request a demo</option>
                    <option value="pricing">Pricing question</option>
                    <option value="technical">Technical question</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Tell us about your AI governance needs..."
                  />
                </div>

                {formState === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    Something went wrong. Please try again or email us directly at hello@trustscope.ai
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-slate-500 text-sm text-center">
                  We typically respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold mb-4">Based in New York City</h2>
          <p className="text-slate-400">
            Building the future of AI governance from NYC.
          </p>
        </div>
      </section>
    </div>
  )
}
