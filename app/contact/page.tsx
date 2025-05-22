"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "@/lib/actions"

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

    try {
      await submitContactForm(formData)

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "success",
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          We're here to help. Reach out to us with any questions or concerns.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
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
                      placeholder="john.doe@example.com"
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
                      placeholder="(123) 456-7890"
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
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly through any of the following channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">123 Medical Avenue, Healthcare City, State 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">Customer Service: (123) 456-7890</p>
                  <p className="text-muted-foreground">Pharmacy Direct: (123) 456-7891</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">General Inquiries: info@medistore.com</p>
                  <p className="text-muted-foreground">Customer Support: support@medistore.com</p>
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

          <Card>
            <CardHeader>
              <CardTitle>Store Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="main">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="main">Main Store</TabsTrigger>
                  <TabsTrigger value="north">North Branch</TabsTrigger>
                  <TabsTrigger value="east">East Branch</TabsTrigger>
                </TabsList>
                <TabsContent value="main" className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-md border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s123%20Broadway%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1652813115288!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">MediStore Main Branch</p>
                    <p className="text-sm text-muted-foreground">123 Medical Avenue, Healthcare City, State 12345</p>
                  </div>
                </TabsContent>
                <TabsContent value="north" className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-md border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343016!2d-74.04323708400485!3d40.74076737932919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af44f80507%3A0xca62cc0665f68640!2s456%20Main%20St%2C%20New%20York%2C%20NY%2010044%2C%20USA!5e0!3m2!1sen!2sus!4v1652813115288!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">MediStore North Branch</p>
                    <p className="text-sm text-muted-foreground">456 North Street, Uptown District, State 12345</p>
                  </div>
                </TabsContent>
                <TabsContent value="east" className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-md border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9126654996037!2d-73.95583428400552!3d40.71933937933132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c2f476a5ef9%3A0x3b8ee6d435a7f3d0!2s789%20East%20St%2C%20Brooklyn%2C%20NY%2011211%2C%20USA!5e0!3m2!1sen!2sus!4v1652813115288!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">MediStore East Branch</p>
                    <p className="text-sm text-muted-foreground">789 East Boulevard, Riverside Area, State 12345</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How can I track my order?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your
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
                Currently, we only offer shipping within the country. We're working on expanding our services
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
                You can change or cancel your order within 30 minutes of placing it, provided it hasn't been dispatched
                yet. Please contact our customer service team immediately for assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-2xl font-bold">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter to receive updates on new products, special offers, and health tips.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-primary" />
            <Button variant="secondary">Subscribe</Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>We respect your privacy and will never share your information.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
