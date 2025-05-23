"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { Camera, Mail, MapPin, Phone, User } from "lucide-react"
import axios from "axios"
import { AlertCircle, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (!user?.id) return
    setIsLoading(true)
    setError("")
    axios.get(`http://localhost:3000/api/contact/${user.id}`)
      .then(res => {
        setProfile(res.data.contact)
        setIsLoading(false)
      })
      .catch(err => {
        setError("Failed to load profile. Please try again later.")
        setIsLoading(false)
      })
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the user's profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <span className="text-lg font-medium text-muted-foreground">Loading profile...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <span className="text-lg font-medium text-destructive">{error}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="relative h-36 w-36 rounded-full shadow-xl border-4 border-primary bg-gradient-to-br from-primary/80 to-blue-400 flex items-center justify-center">
            <span className="text-5xl font-extrabold text-white">
              {profile?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg">{profile?.fullName || user?.name}</h1>
            <p className="text-lg text-muted-foreground">{profile?.email || user?.email}</p>
          </div>
        </div>
        <Card className="shadow-2xl border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Profile Details</CardTitle>
            <CardDescription className="text-muted-foreground">Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <span className="font-medium">Full Name:</span>
                <span>{profile?.fullName || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <span className="font-medium">Email:</span>
                <span>{profile?.email || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-medium">Phone:</span>
                <span>{profile?.phoneNumber || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-medium">Address:</span>
                <span>{profile?.address || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Subject:</span>
                <span>{profile?.subject || "-"}</span>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <span className="font-medium">Message:</span>
                <span>{profile?.message || "-"}</span>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button variant="outline" onClick={() => window.location.reload()}>Refresh</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}