import axios from "axios"

export async function sendContactForm(data: {
  fullName: string
  email: string
  phoneNumber: string
  subject: string
  message: string
}) {
  // Map frontend fields to backend expected fields
  const payload = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    subject: data.subject,
    message: data.message,
  }
  // Use the backend contact API endpoint
  return axios.post("http://localhost:3000/api/contact", payload)
}
