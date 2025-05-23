import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, Filter } from "lucide-react"
import Image from "next/image"
import AddToCartButton from "@/components/add-to-cart-button"

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
      image: "/placeholder.svg?height=200&width=200",
      prescription: true,
    },
    {
      id: 3,
      name: "Loratadine 10mg",
      category: "Allergy",
      description: "Provides 24-hour relief from allergy symptoms",
      price: 8.99,
      discountPrice: 7.5,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
    },
    {
      id: 4,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      description: "Reduces inflammation and relieves pain",
      price: 6.99,
      discountPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      description: "Decreases stomach acid production",
      price: 14.99,
      discountPrice: 12.99,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
    },
    {
      id: 6,
      name: "Lisinopril 10mg",
      category: "Blood Pressure",
      description: "Treats high blood pressure",
      price: 18.99,
      discountPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      prescription: true,
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Medicines</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search medicines..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      {/* Medicine Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-auto">
          <TabsTrigger value="all">All Medicines</TabsTrigger>
          <TabsTrigger value="otc">Over the Counter</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
          <TabsTrigger value="discounted">Discounted</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {medicines.map((medicine) => (
              <Card key={medicine.id} className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={medicine.image || "/placeholder.svg"}
                      alt={medicine.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  {medicine.prescription && (
                    <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                      Prescription
                    </div>
                  )}
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
                        <span className="mr-2 font-bold text-primary">${medicine.discountPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${medicine.price}</span>
                      </>
                    ) : (
                      <span className="font-bold text-primary">${medicine.price}</span>
                    )}
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
        <TabsContent value="otc" className="m-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {medicines
              .filter((medicine) => !medicine.prescription)
              .map((medicine) => (
                <Card key={medicine.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
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
                          <span className="mr-2 font-bold text-primary">${medicine.discountPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">${medicine.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-primary">${medicine.price}</span>
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
            {medicines
              .filter((medicine) => medicine.prescription)
              .map((medicine) => (
                <Card key={medicine.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
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
                          <span className="mr-2 font-bold text-primary">${medicine.discountPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">${medicine.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-primary">${medicine.price}</span>
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
            {medicines
              .filter((medicine) => medicine.discountPrice)
              .map((medicine) => (
                <Card key={medicine.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={medicine.image || "/placeholder.svg"}
                        alt={medicine.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
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
                      <span className="mr-2 font-bold text-primary">${medicine.discountPrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${medicine.price}</span>
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
      <div className="mt-8 flex justify-center">
        <div className="flex gap-1">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="default" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
