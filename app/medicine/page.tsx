"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, Filter } from "lucide-react"
import Image from "next/image"
import AddToCartButton from "@/components/add-to-cart-button"
import { useState } from "react"

export default function MedicineListPage() {
  // Dummy medicine data
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      description: "For relief of mild pain and fever",
      price: 5.99,
      discountPrice: 4.99,
      image: "/images/paracetamol.jpg",
      prescription: false,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      description: "Treats bacterial infections",
      price: 12.99,
      discountPrice: null,
      image: "/images/amoxicillin.webp",
      prescription: true,
    },
    {
      id: 3,
      name: "Loratadine 10mg",
      category: "Allergy",
      description: "Provides 24-hour relief from allergy symptoms",
      price: 8.99,
      discountPrice: 7.5,
      image: "/images/loratadine.jpeg",
      prescription: false,
    },
    {
      id: 4,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      description: "Reduces inflammation and relieves pain",
      price: 6.99,
      discountPrice: null,
      image: "/images/ibuprofen.jpeg",
      prescription: false,
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      description: "Decreases stomach acid production",
      price: 14.99,
      discountPrice: 12.99,
      image: "/images/omeprazole.jpeg",
      prescription: false,
    },
    {
      id: 6,
      name: "Lisinopril 10mg",
      category: "Blood Pressure",
      description: "Treats high blood pressure",
      price: 18.99,
      discountPrice: null,
      image: "/images/lisinopril.png",
      prescription: true,
    },
  ]

  // State for search, category, and pagination
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  // Filtered medicines
  const filtered = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(search.toLowerCase()) || medicine.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      category === "all" ||
      (category === "pain-relief" && medicine.category === "Pain Relief") ||
      (category === "antibiotics" && medicine.category === "Antibiotics") ||
      (category === "allergy" && medicine.category === "Allergy") ||
      (category === "digestive-health" && medicine.category === "Digestive Health") ||
      (category === "blood-pressure" && medicine.category === "Blood Pressure")
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="container py-8 animate-fade-in-up animate-duration-1000 animate-ease-in-out">
      <h1 className="mb-6 text-3xl font-bold text-blue-700 drop-shadow-lg animate-slide-in-left animate-duration-1000 animate-ease-in-out">Medicines</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row animate-fade-in-up animate-delay-200 animate-duration-1000 animate-ease-in-out">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400 animate-bounce animate-infinite animate-duration-1500" />
          <Input
            type="search"
            placeholder="Search medicines..."
            className="w-full pl-8 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all animate-fade-in animate-duration-1000"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </div>
        <div className="flex gap-2">
          <Select value={category} onValueChange={val => { setCategory(val); setPage(1) }}>
            <SelectTrigger className="w-[180px] border-blue-300 focus:border-blue-500 animate-fade-in animate-delay-100 animate-duration-1000">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pain-relief">Pain Relief</SelectItem>
              <SelectItem value="antibiotics">Antibiotics</SelectItem>
              <SelectItem value="allergy">Allergy</SelectItem>
              <SelectItem value="digestive-health">Digestive Health</SelectItem>
              <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" disabled className="animate-fade-in animate-delay-200 animate-duration-1000">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      {/* Medicine Tabs */}
      <Tabs defaultValue="all" className="w-full animate-fade-in-up animate-delay-200 animate-duration-1000 animate-ease-in-out">
        <TabsList className="mb-6 w-full justify-start overflow-auto bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg rounded-xl animate-fade-in-up animate-delay-300 animate-duration-1000">
          <TabsTrigger value="all" className="transition-all hover:scale-105">All Medicines</TabsTrigger>
          <TabsTrigger value="otc" className="transition-all hover:scale-105">Over the Counter</TabsTrigger>
          <TabsTrigger value="prescription" className="transition-all hover:scale-105">Prescription</TabsTrigger>
          <TabsTrigger value="discounted" className="transition-all hover:scale-105">Discounted</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((medicine, idx) => (
              <Card key={medicine.id} className={`overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up animate-delay-${idx * 100}` }>
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={medicine.image || "/placeholder.svg"}
                      alt={medicine.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  {medicine.prescription && (
                    <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white animate-bounce animate-infinite animate-duration-2000">
                      Prescription
                    </div>
                  )}
                  {medicine.discountPrice && (
                    <div className="absolute left-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white animate-pulse animate-infinite animate-duration-2000">
                      Sale
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 text-sm text-blue-500 font-semibold animate-fade-in animate-delay-200">{medicine.category}</div>
                  <h3 className="mb-1 font-semibold text-blue-700 animate-fade-in animate-delay-300">{medicine.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground animate-fade-in animate-delay-400">{medicine.description}</p>
                  <div className="flex items-center animate-fade-in animate-delay-500">
                    {medicine.discountPrice ? (
                      <>
                        <span className="mr-2 font-bold text-green-600">Tsh {medicine.discountPrice ? medicine.discountPrice.toLocaleString() : ""}</span>
                        <span className="text-sm text-muted-foreground line-through">Tsh {medicine.price.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="font-bold text-primary">Tsh {medicine.price.toLocaleString()}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-4 pt-0 animate-fade-in animate-delay-600">
                  {medicine.prescription ? (
                    <Button className="w-full animate-bounce animate-infinite animate-duration-2000" size="sm">
                      Upload Prescription
                    </Button>
                  ) : (
                    <AddToCartButton
                      product={{
                        id: medicine.id,
                        name: medicine.name,
                        price: medicine.discountPrice || medicine.price,
                        image: medicine.image,
                        category: medicine.category,
                        description: medicine.description,
                        prescription: medicine.prescription,
                      }}
                      size="sm"
                      className="w-full animate-bounce animate-infinite animate-duration-2000"
                    />
                  )}
                  <Button variant="outline" size="icon" className="hover:bg-blue-100 animate-fade-in animate-delay-700">
                    <Heart className="h-4 w-4 text-blue-500" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="otc" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered
              .filter((medicine) => !medicine.prescription)
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((medicine, idx) => (
                <Card key={medicine.id} className={`overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up animate-delay-${idx * 100}` }>
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </div>
                    {medicine.discountPrice && (
                      <div className="absolute left-2 top-2 rounded bg-success px-2 py-1 text-xs font-medium text-white">
                        Sale
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{medicine.category}</div>
                    <h3 className="mb-1 font-semibold">{medicine.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{medicine.description}</p>
                    <div className="flex items-center">
                      {medicine.discountPrice ? (
                        <>
                          <span className="mr-2 font-bold text-primary">Tsh {medicine.discountPrice ? medicine.discountPrice.toLocaleString() : ""}</span>
                          <span className="text-sm text-muted-foreground line-through">Tsh {medicine.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="font-bold text-primary">Tsh {medicine.price.toLocaleString()}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 p-4 pt-0">
                    <AddToCartButton
                      product={{
                        id: medicine.id,
                        name: medicine.name,
                        price: medicine.discountPrice || medicine.price,
                        image: medicine.image,
                        category: medicine.category,
                        description: medicine.description,
                        prescription: medicine.prescription,
                      }}
                      size="sm"
                      className="w-full"
                    />
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="prescription" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered
              .filter((medicine) => medicine.prescription)
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((medicine, idx) => (
                <Card key={medicine.id} className={`overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up animate-delay-${idx * 100}` }>
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </div>
                    <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                      Prescription
                    </div>
                    {medicine.discountPrice && (
                      <div className="absolute left-2 top-2 rounded bg-success px-2 py-1 text-xs font-medium text-white">
                        Sale
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{medicine.category}</div>
                    <h3 className="mb-1 font-semibold">{medicine.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{medicine.description}</p>
                    <div className="flex items-center">
                      {medicine.discountPrice ? (
                        <>
                          <span className="mr-2 font-bold text-primary">Tsh {medicine.discountPrice ? medicine.discountPrice.toLocaleString() : ""}</span>
                          <span className="text-sm text-muted-foreground line-through">Tsh {medicine.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="font-bold text-primary">Tsh {medicine.price.toLocaleString()}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 p-4 pt-0">
                    <Button className="w-full" size="sm">
                      Upload Prescription
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="discounted" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered
              .filter((medicine) => medicine.discountPrice)
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((medicine, idx) => (
                <Card key={medicine.id} className={`overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-fade-in-up animate-delay-${idx * 100}` }>
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </div>
                    {medicine.prescription && (
                      <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                        Prescription
                      </div>
                    )}
                    <div className="absolute left-2 top-2 rounded bg-success px-2 py-1 text-xs font-medium text-white">
                      Sale
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{medicine.category}</div>
                    <h3 className="mb-1 font-semibold">{medicine.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{medicine.description}</p>
                    <div className="flex items-center">
                      <span className="mr-2 font-bold text-primary">Tsh {medicine.discountPrice.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">Tsh {medicine.price.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 p-4 pt-0">
                    {medicine.prescription ? (
                      <Button className="w-full" size="sm">
                        Upload Prescription
                      </Button>
                    ) : (
                      <AddToCartButton
                        product={{
                          id: medicine.id,
                          name: medicine.name,
                          price: medicine.discountPrice || medicine.price,
                          image: medicine.image,
                          category: medicine.category,
                          description: medicine.description,
                          prescription: medicine.prescription,
                        }}
                        size="sm"
                        className="w-full"
                      />
                    )}
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center animate-fade-in-up animate-delay-200 animate-duration-1000 animate-ease-in-out">
          <div className="flex gap-1 bg-white/80 rounded-xl shadow p-2">
            <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page === 1} className="hover:bg-blue-100 transition-all">
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page === totalPages} className="hover:bg-blue-100 transition-all">
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
