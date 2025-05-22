import Link from "next/link"
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <span className="text-xl font-bold">MediStore</span>
            </Link>
            <p className="mt-4 text-sm">
              Your trusted online pharmacy. We provide quality medicines and healthcare products delivered to your
              doorstep.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="rounded-full p-2 hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="rounded-full p-2 hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="rounded-full p-2 hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/medicine" className="hover:underline">
                  Medicine
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:underline">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/prescription" className="hover:underline">
                  Prescription Refill
                </Link>
              </li>
              <li>
                <Link href="/services/consultation" className="hover:underline">
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link href="/services/lab-tests" className="hover:underline">
                  Lab Tests
                </Link>
              </li>
              <li>
                <Link href="/services/health-packages" className="hover:underline">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link href="/services/healthcare-products" className="hover:underline">
                  Healthcare Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>123 Medical Avenue, Healthcare City, State 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <span>support@medistore.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} MediStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
