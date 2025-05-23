import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Stethoscope,
  FlaskRoundIcon as Flask,
  Pill,
  ShoppingBag,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-lg animate-fade-in-up">
          Our Services
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg md:text-2xl text-muted-foreground animate-fade-in delay-100">
          Comprehensive healthcare services to meet all your medical needs in one place.
        </p>
      </div>

      {/* Services Tabs */}
      <Tabs defaultValue="all" className="mb-16 animate-fade-in-up delay-200">
        <TabsList className="mb-10 w-full justify-center overflow-auto rounded-xl bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg animate-fade-in-up animate-delay-200">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
          <TabsTrigger value="consultation">Consultation</TabsTrigger>
          <TabsTrigger value="lab-tests">Lab Tests</TabsTrigger>
          <TabsTrigger value="health-products">Health Products</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Animated Service Cards */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              {/* Animated Glow */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-2xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <CardTitle className="mt-4">Prescription Refill</CardTitle>
                <CardDescription>
                  Upload your prescription and get your medications delivered to your doorstep.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Upload prescription via app or website</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Verification by licensed pharmacists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Home delivery within 45 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Automatic refill reminders</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/services/prescription">
                    Upload Prescription
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Online Consultation */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="mt-4">Online Consultation</CardTitle>
                <CardDescription>
                  Consult with licensed doctors and healthcare professionals from the comfort of your home.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Video consultations with specialists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Secure and private platform</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Digital prescriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Follow-up consultations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/services/consultation">
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Lab Tests */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-200 opacity-10 rounded-full blur-2xl group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Flask className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="mt-4">Lab Tests</CardTitle>
                <CardDescription>Book lab tests online and get your samples collected from your home.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Home sample collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Wide range of tests available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Digital reports within 24-48 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Free doctor consultation on reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/services/lab-tests">
                    Book Lab Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Health Products */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-300 opacity-20 rounded-full blur-2xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
               
                  </div>
                </div>
                <CardTitle className="mt-4">Health Products</CardTitle>
                <CardDescription>Shop for a wide range of healthcare products and wellness items.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>OTC medications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Personal care products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Vitamins and supplements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Medical devices and equipment</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/medicine">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Health Packages */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 opacity-20 rounded-full blur-2xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <Badge>New</Badge>
                </div>
                <CardTitle className="mt-4">Health Packages</CardTitle>
                <CardDescription>
                  Comprehensive health checkup packages for preventive care and wellness.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Basic health checkup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Comprehensive health assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Specialized packages (diabetes, cardiac, etc.)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Family health packages</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/services/health-packages">
                    View Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Medication Reminder */}
            <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up group relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-200 opacity-10 rounded-full blur-2xl group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 z-0" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="mt-4">Medication Reminder</CardTitle>
                <CardDescription>
                  Never miss a dose with our medication reminder and management service.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Customized medication schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>SMS and app notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Medication tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Refill alerts</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/services/medication-reminder">
                    Set Reminders
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="prescription">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Prescription Services</h2>
              <p className="mb-6 text-muted-foreground">
                Our prescription services make it easy to get your medications without the hassle of visiting a
                pharmacy. Simply upload your prescription, and we'll take care of the rest.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Prescription</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload your prescription through our website or mobile app.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Pharmacist Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Our licensed pharmacists verify your prescription for accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Medication Dispensing</h3>
                    <p className="text-sm text-muted-foreground">
                      We dispense your medications with care and precision.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Home Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Get your medications delivered to your doorstep at your convenience.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/services/prescription">Upload Prescription Now</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/prescription.jpg"
                alt="Prescription service"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="consultation">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Online Consultation</h2>
              <p className="mb-6 text-muted-foreground">
                Connect with licensed healthcare professionals from the comfort of your home. Our telemedicine service
                provides convenient access to medical advice and care.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Book Appointment</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule a consultation with a doctor of your choice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Video Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with your doctor through our secure video platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Prescription</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive digital prescriptions that can be directly fulfilled by our pharmacy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Follow-up Care</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule follow-up consultations to monitor your progress.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/services/consultation">Book a Consultation</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/consultation.jpeg"
                alt="Online consultation"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="lab-tests">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Lab Tests</h2>
              <p className="mb-6 text-muted-foreground">
                Get your lab tests done from the comfort of your home. We offer a wide range of diagnostic tests with
                home sample collection and digital reports.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Book Test</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from our comprehensive range of diagnostic tests.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Home Sample Collection</h3>
                    <p className="text-sm text-muted-foreground">
                      Our trained phlebotomists collect samples from your home at your preferred time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Flask className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Lab Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Samples are processed in our state-of-the-art laboratory facilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive your test reports digitally within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/services/lab-tests">Book a Lab Test</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/labTest.jpg"
                alt="Lab tests"
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="health-products">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Health Products</h2>
              <p className="mb-6 text-muted-foreground">
                Shop for a wide range of healthcare products and wellness items. From over-the-counter medications to
                personal care products, we have everything you need for your health and wellness.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">OTC Medications</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse our extensive range of over-the-counter medications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personal Care</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our selection of personal care and hygiene products.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vitamins & Supplements</h3>
                    <p className="text-sm text-muted-foreground">
                      Find the right vitamins and supplements for your health needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Medical Devices</h3>
                    <p className="text-sm text-muted-foreground">
                      Shop for medical devices and equipment for home healthcare.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/medicine">Shop Health Products</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/products.jpg"
                alt="Health products"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Why Choose Our Services */}
      <div className="mb-16">
        <h2 className="mb-8 text-3xl md:text-4xl font-extrabold tracking-tight text-center text-primary animate-fade-in-up">
          Why Choose Our Services
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-bold">Licensed Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  All our healthcare services are provided by licensed and experienced professionals.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-bold">Convenience</h3>
                <p className="text-sm text-muted-foreground">
                  Access healthcare services from the comfort of your home, saving time and effort.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-bold">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain the highest standards of quality in all our services and products.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-bold">Digital Records</h3>
                <p className="text-sm text-muted-foreground">
                  Access your health records, prescriptions, and test reports digitally anytime, anywhere.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-3xl bg-gradient-to-br from-primary to-blue-400 p-12 text-white shadow-2xl mt-16 animate-fade-in-up">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              Ready to get started?
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              Sign up now to access all our healthcare services and products. Get exclusive offers and discounts on your
              first order.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="secondary" className="text-lg px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform" asChild>
                <Link href="/auth/login">Sign Up Now</Link>
              </Button>

            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gradient-to-tr from-pink-300 via-blue-200 to-purple-200 blur-2xl opacity-60 animate-pulse-slow z-0" />
            <div className="relative w-64 h-64 rounded-3xl shadow-2xl overflow-hidden z-10 flex items-center justify-center bg-white/90">
              <Image
                src="/images/doctor.jpg"
                alt="Healthcare services"
                width={300}
                height={300}
                className="object-cover w-full h-full scale-110 hover:scale-125 transition-transform duration-700 ease-in-out drop-shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
