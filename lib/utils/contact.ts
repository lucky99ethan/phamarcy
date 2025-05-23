import axios from "axios"

export async function sendContactForm(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  // Use the backend contact API endpoint
  return axios.post("http://localhost:3000/api/contact", data)
}
