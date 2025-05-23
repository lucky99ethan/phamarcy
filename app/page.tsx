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
              <div className="relative w-[28rem] h-[28rem] flex items-center justify-center">
                {/* Glowing animated background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-blue-200 to-purple-200 blur-2xl opacity-70 animate-pulse-slow z-0" />
                {/* Main image with a soft border and shadow */}
                <div className="relative w-[22rem] h-[22rem] rounded-full border-8 border-white shadow-2xl overflow-hidden z-10 flex items-center justify-center">
                  <Image
                    src="/images/love.jpg"
                    alt="Medication illustration"
                    width={352}
                    height={352}
                    className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
                    priority
                  />
                  {/* Decorative floating icons */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg animate-bounce-slow z-20">
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg animate-bounce-slow2 z-20">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg animate-spin-slow z-20">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned for visual appeal */}
      <section className="py-16 md:py-28 bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col items-center justify-center">
              {/* Delivery Info Box - floating above image */}
              <div className="-mb-60 mr-80 z-20">
                <div className="rounded-xl border-2 border-primary bg-white/90 p-4 shadow-2xl flex items-center space-x-3 backdrop-blur-md">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-base font-bold text-primary">Delivery within 45 minutes</span>
                </div>
              </div>
              {/* Main Circle Image with gradient ring and subtle shadow */}
              <div className="relative h-80 w-80 lg:h-[28rem] lg:w-[28rem] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-blue-200 to-white blur-xl scale-110 z-0" />
                <div className="relative h-full w-full rounded-full border-8 border-white shadow-xl overflow-hidden z-10">
                  <Image
                    src="/images/quation.jpg"
                    alt="Question"
                    width={448}
                    height={448}
                    className="rounded-full object-cover w-full h-full transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    priority
                  />
                  {/* Decorative floating icons */}
                  <div className="absolute -top-6 -left-6 bg-white rounded-full p-2 shadow-md animate-bounce-slow">
                    <Star className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-2 shadow-md animate-bounce-slow2">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm md:text-5xl">
                Why should you <br /> choose us
              </h2>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed">
                MediStore is a patient-centric platform with EHR, portable profiles, and a modern ecosystem to improve
                your medicine experience. Enjoy fast delivery, trusted service, and a seamless digital journey.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-white/80 shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <ShieldCheck className="h-12 w-12 text-primary mb-2" />
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-base text-muted-foreground">Delivery Success</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Star className="h-12 w-12 text-yellow-400 mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">4.69</p>
                    <p className="text-base text-muted-foreground">Customer Reviews</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - visually enhanced */}
      <section className="bg-gradient-to-b from-blue-100 via-white to-blue-50 py-16 md:py-28">
        <div className="container">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm sm:text-5xl md:text-6xl">
              All the services you will get
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
              MediStore is a multi-featured platform with EHR, portable profiles, and a modern ecosystem to improve your
              medicine experience. Discover our top services below.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white/90">
              <div className="relative aspect-video w-full group">
                <Image
                  src="/images/pharmacy-service.jpg"
                  alt="Healthcare products"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary/90 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
                  Popular
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="mb-3 text-2xl font-bold text-primary">Healthcare Product</h3>
                <p className="mb-6 text-muted-foreground text-base">
                  Browse our wide range of healthcare products for your everyday needs.
                </p>
                <Button variant="outline" className="w-full font-semibold text-primary border-primary hover:bg-primary/10">
                  Order Now
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white/90">
              <div className="relative aspect-video w-full group">
                <Image
                  src="/images/handMedicine.jpg"
                  alt="Order medicine"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-green-500/90 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
                  Fastest
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="mb-3 text-2xl font-bold text-primary">Order Medicine</h3>
                <p className="mb-6 text-muted-foreground text-base">
                  Upload your prescription and get medicines delivered to your doorstep.
                </p>
                <Button variant="outline" className="w-full font-semibold text-primary border-primary hover:bg-primary/10">
                  Order Now
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white/90">
              <div className="relative aspect-video w-full group">
                <Image
                  src="/images/medicineLab.jpg"
                  alt="Lab test"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-blue-500/90 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
                  New
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="mb-3 text-2xl font-bold text-primary">Booking Lab Test</h3>
                <p className="mb-6 text-muted-foreground text-base">
                  Book lab tests online and get your reports delivered digitally.
                </p>
                <Button variant="outline" className="w-full font-semibold text-primary border-primary hover:bg-primary/10">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-32 bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="container">
          <div className="relative bg-primary rounded-3xl p-10 md:p-16 text-white overflow-hidden shadow-2xl">
            {/* Decorative blurred background shapes */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 opacity-30 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl z-0" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 relative z-10">
              <div className="space-y-6 flex flex-col justify-center">
                <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl drop-shadow-lg">Download our mobile app</h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white/90">
                  Get the MediStore app for a better experience. Order medicine, book lab tests, and more.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button variant="secondary" className="text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">Google Play</Button>
                  <Button variant="secondary" className="text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">App Store</Button>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                {/* Glowing animated ring */}
                <div className="absolute inset-0 m-auto w-80 h-80 rounded-full bg-gradient-to-tr from-pink-300 via-blue-200 to-purple-200 blur-2xl opacity-60 animate-pulse-slow z-0" />
                {/* Main app image with floating effect */}
                <div className="relative w-64 h-64 rounded-3xl shadow-2xl overflow-hidden z-10 flex items-center justify-center bg-white/90">
                  <Image
                    src="/images/mobileApp.jpg"
                    alt="Mobile app"
                    width={300}
                    height={300}
                    className="object-contain w-full h-full scale-110 hover:scale-125 transition-transform duration-700 ease-in-out drop-shadow-2xl"
                    priority
                  />
                  {/* Decorative floating icon */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-full p-3 shadow-lg animate-bounce-slow z-20">
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white rounded-full p-3 shadow-lg animate-bounce-slow2 z-20">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
