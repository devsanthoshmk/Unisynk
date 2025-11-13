'use client'

import { useState } from 'react'
import { MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface Event {
  id: string
  name: string
  organizer: {
    name: string
    email?: string
    phone?: string
    whatsapp?: string
  }
}

interface HelpSupportProps {
  event: Event
}

const faqs = [
  {
    question: "How do I register for the event?",
    answer: "Click the 'Register Now' button on this page and fill out the registration form. You'll receive a confirmation email once your registration is complete."
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration details including any fees will be clearly mentioned in the registration form. Most of our events are free for students."
  },
  {
    question: "Can I register as a team?",
    answer: "Yes! If team registration is enabled for this event, you'll see the option to add team members during the registration process."
  },
  {
    question: "What should I bring to the event?",
    answer: "Bring a valid student ID, notebook, and any specific items mentioned in the event details. We'll provide refreshments and materials as specified."
  },
  {
    question: "How do I get my participation certificate?",
    answer: "Certificates are typically sent via email within 48 hours after the event. You can also download them from the Certificate Portal on this page."
  },
  {
    question: "Can I cancel my registration?",
    answer: "Yes, you can cancel your registration by contacting the organizers. Please do so at least 24 hours before the event."
  }
]

export function HelpSupport({ event }: HelpSupportProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock API call - replace with actual implementation
    setTimeout(() => {
      alert('Message sent successfully! We\'ll get back to you soon.')
      setContactForm({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Help & Support</h2>
            <p className="text-muted-foreground">
              Need help? Check our FAQ or get in touch with the organizers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Section */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <Collapsible 
                      open={openFAQ === index} 
                      onOpenChange={() => handleFAQToggle(index)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-left">
                              {faq.question}
                            </CardTitle>
                            {openFAQ === index ? (
                              <ChevronUp className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {event.organizer.email && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`mailto:${event.organizer.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          {event.organizer.email}
                        </a>
                      </Button>
                    )}
                    
                    {event.organizer.phone && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`tel:${event.organizer.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          {event.organizer.phone}
                        </a>
                      </Button>
                    )}
                    
                    {event.organizer.whatsapp && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a 
                          href={`https://wa.me/${event.organizer.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp Support
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        rows={4}
                        placeholder="How can we help you?"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}