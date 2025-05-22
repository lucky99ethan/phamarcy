import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, MapPin, Truck, ShieldCheck, Calendar, Search, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function DeliveryPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Medicine Delivery</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Fast, reliable delivery of your medications and healthcare products right to your doorstep.
        </p>
      </div>

      {/* Delivery Hero */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="mr-1 h-3 w-3" />
              Fast Delivery
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Secure Packaging
            </Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get your medicines delivered in 45 minutes</h2>
          <p className="text-muted-foreground">
            We understand the urgency of medication needs. Our express delivery service ensures you receive your
            prescriptions and healthcare products quickly and safely.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label htmlFor="delivery-address" className="sr-only">
                Delivery Address
              </Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="delivery-address" placeholder="Enter your delivery address" className="pl-8" />
              </div>
            </div>
            <Button>Check Availability</Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Free delivery on orders above $50</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Medicine delivery"
              width={400}
              height={400}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Delivery Options</h2>
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="express">Express</TabsTrigger>
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          <TabsContent value="express" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Express Delivery</CardTitle>
                    <CardDescription>Get your medicines within 45 minutes</CardDescription>
                  </div>
                  <Badge className="bg-primary">Fastest</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Time</h3>
                      <p className="text-sm text-muted-foreground">Within 45 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Area</h3>
                      <p className="text-sm text-muted-foreground">Within 5 miles of our stores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Fee</h3>
                      <p className="text-sm text-muted-foreground">$5.99 (Free on orders above $50)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Packaging</h3>
                      <p className="text-sm text-muted-foreground">Tamper-proof sealed packaging</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">Choose Express Delivery</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="standard" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Standard Delivery</CardTitle>
                    <CardDescription>Get your medicines within 24 hours</CardDescription>
                  </div>
                  <Badge variant="outline">Recommended</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Time</h3>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Area</h3>
                      <p className="text-sm text-muted-foreground">Citywide coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Fee</h3>
                      <p className="text-sm text-muted-foreground">$2.99 (Free on orders above $30)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Packaging</h3>
                      <p className="text-sm text-muted-foreground">Tamper-proof sealed packaging</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">Choose Standard Delivery</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scheduled" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scheduled Delivery</CardTitle>
                    <CardDescription>Choose your preferred delivery time</CardDescription>
                  </div>
                  <Badge variant="secondary">Flexible</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Time</h3>
                      <p className="text-sm text-muted-foreground">Choose your preferred time slot</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Area</h3>
                      <p className="text-sm text-muted-foreground">Citywide coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Fee</h3>
                      <p className="text-sm text-muted-foreground">$3.99 (Free on orders above $40)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Packaging</h3>
                      <p className="text-sm text-muted-foreground">Tamper-proof sealed packaging</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">Choose Scheduled Delivery</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delivery Zones */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Delivery Zones</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Check Delivery Availability</CardTitle>
              <CardDescription>Enter your zip code to check if we deliver to your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Enter your zip code" className="pl-8" />
                </div>
                <Button>Check</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivery Coverage</CardTitle>
              <CardDescription>Areas where we currently provide delivery services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border p-3">
                  <h3 className="font-medium">Zone A</h3>
                  <p className="text-sm text-muted-foreground">Downtown, Central Business District</p>
                </div>
                <div className="rounded-md border p-3">
                  <h3 className="font-medium">Zone B</h3>
                  <p className="text-sm text-muted-foreground">North Side, University Area</p>
                </div>
                <div className="rounded-md border p-3">
                  <h3 className="font-medium">Zone C</h3>
                  <p className="text-sm text-muted-foreground">East Side, Riverside</p>
                </div>
                <div className="rounded-md border p-3">
                  <h3 className="font-medium">Zone D</h3>
                  <p className="text-sm text-muted-foreground">South Side, Industrial Area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delivery FAQ */}
      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I track my delivery?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your
                delivery in real-time through your account dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What if I'm not home during delivery?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our delivery personnel will call you before arriving. If you're not available, you can reschedule or
                request to leave the package with a neighbor or in a safe place.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How are medicines kept safe during delivery?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All medications are packed in tamper-proof containers and temperature-controlled packaging when
                necessary. Our delivery personnel are trained to handle medications properly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change my delivery address after ordering?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can change your delivery address before the order is dispatched. Please contact our customer
                service as soon as possible to update your delivery information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
