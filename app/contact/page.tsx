"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { sendContactForm } from "@/lib/utils/contact"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Map frontend fields to backend expected fields
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      subject: formData.subject,
      message: formData.message,
    }

    try {
      // Send data to backend API via utils controller
      await sendContactForm(payload)

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary drop-shadow-lg">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
          Welcome to MediStore! We are here to help you. Please contact us with any questions or feedback about our
          services.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form Card */}
        <div>
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below and we will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* ...existing code for form fields... */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0712 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Contact Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Reach out to us directly through any of the following channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">Masaki, Dar es Salaam, Tanzania</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">Customer Service: +255 712 345 678</p>
                  <p className="text-muted-foreground">Main Store: +255 713 456 789</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@medistore.co.tz</p>
                  <p className="text-muted-foreground">support@medistore.co.tz</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Hours of Operation</h3>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 9:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Our Location (Masaki, Dar es Salaam)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-xl border-2 border-primary shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.017073289889!2d39.24943431477244!3d-6.747233667857998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c7e2e2e2e2b%3A0x7e2e2e2e2e2e2e2e!2sMasaki%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1716460000000!5m2!1sen!2stz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-2">
                <p className="font-medium">MediStore Masaki</p>
                <p className="text-sm text-muted-foreground">Masaki, Dar es Salaam, Tanzania</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-primary">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How can I track my order?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once your order is confirmed, you will receive a tracking link via SMS and email. You can also track your
                order in real-time through your account dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer international shipping?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Currently, we only offer shipping within Tanzania. We are working on expanding our services
                internationally and will update our customers when this becomes available.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I request a refund?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To request a refund, please contact our customer service team with your order number and reason for the
                refund. We process most refund requests within 3-5 business days.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change or cancel my order?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can change or cancel your order within 30 minutes of placing it, provided it has not been dispatched
                yet. Please contact our customer service team immediately for assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary to-blue-400 p-10 text-white shadow-2xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-3xl font-extrabold">Stay Updated</h2>
          <p className="mb-6 text-lg">
            Subscribe to our newsletter to receive updates on new products, special offers, and health tips.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input type="email" placeholder="Enter your email" className="bg-white text-primary" />
            <Button variant="secondary" className="font-bold">
              Subscribe
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-300" />
            <span>We respect your privacy and will never share your information.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
