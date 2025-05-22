import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck, Truck, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="container py-12 md:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Medication for
                <br />
                The best substance
              </h1>
              <p className="max-w-[600px] text-muted-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Despite strong objection from its main independent advisory panel, the FDA approved Aduhelm for all
                patients with Alzheimer.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Find what you need..."
                    className="w-full bg-white pl-8 text-black"
                  />
                </div>
                <Button className="bg-white text-primary hover:bg-white/90">Search</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-80 md:h-96 md:w-96">
                <Image
                  src="/images/pharmacy-hero.jpg"
                  alt="Medication illustration"
                  width={400}
                  height={400}
                  className="object-cover animate-fade-in"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex justify-center">
              <div className="relative h-80 w-80 rounded-full border-8 border-muted lg:h-96 lg:w-96">
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-lg border bg-background p-4 shadow-lg">
                  <div className="flex items-center space-x-2 rounded bg-primary/10 px-3 py-1 text-primary">
                    <Truck className="h-4 w-4" />
                    <span className="text-xs font-semibold">Delivery within 45 minutes</span>
                  </div>
                </div>
                <Image
                  src="/images/pharmacy-delivery.jpg"
                  alt="Delivery person"
                  width={400}
                  height={400}
                  className="rounded-full object-cover animate-fade-in"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Why should you
                <br />
                choose us
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                MediStore is a patient-centric platform in English with EHR, portable profiles and an ecosystem to
                improve your medicine. It specially defines vocabulary in English. There are many items of clothing
                that.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <ShieldCheck className="h-12 w-12 text-primary" />
                    <div className="mt-3 text-center">
                      <p className="text-lg font-bold">100%</p>
                      <p className="text-sm text-muted-foreground">Delivery Success</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Star className="h-12 w-12 text-primary" />
                    <div className="mt-3 text-center">
                      <p className="text-lg font-bold">4.69</p>
                      <p className="text-sm text-muted-foreground">Customer Reviews</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              All the service you will get
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              MediStore is a multi-featured platform in English with EHR, portable profiles and an ecosystem to improve
              your medicine. It specially defines vocabulary in English. There are many items of clothing that.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full">
                <Image
                  src="/images/pharmacy-service.jpg"
                  alt="Healthcare products"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover animate-fade-in"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">Healthcare Product</h3>
                <p className="mb-4 text-muted-foreground">
                  Browse our wide range of healthcare products for your everyday needs.
                </p>
                <Button variant="outline" className="w-full">
                  Order Now
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video w-full">
                <Image
                  src="/images/pharmacy-order.jpg"
                  alt="Order medicine"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover animate-fade-in"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">Order Medicine</h3>
                <p className="mb-4 text-muted-foreground">
                  Upload your prescription and get medicines delivered to your doorstep.
                </p>
                <Button variant="outline" className="w-full">
                  Order Now
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video w-full">
                <Image
                  src="/images/pharmacy-lab.jpg"
                  alt="Lab test"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover animate-fade-in"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">Booking Lab Test</h3>
                <p className="mb-4 text-muted-foreground">
                  Book lab tests online and get your reports delivered digitally.
                </p>
                <Button variant="outline" className="w-full">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="bg-primary rounded-lg p-8 text-white">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Download our mobile app</h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the MediStore app for a better experience. Order medicine, book lab tests, and more.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="secondary">Google Play</Button>
                  <Button variant="secondary">App Store</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Mobile app"
                  width={300}
                  height={300}
                  className="max-h-[250px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
