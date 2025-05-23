import axios from "axios"

export async function registerUserApi(data: {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
}) {
  console.log("Registering user with data:", data)
  try {
    const response = await axios.post("http://localhost:3000/api/auth/register", data)
    console.log("Registration success:", response.data)
    return response
  } catch (error) {
    console.log("Registration failed:", error)
    throw error
  }
}

export async function loginUserApi(data: {
  email: string
  password: string
}) {
  console.log("Logging in user with data:", data)
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", data)
    console.log("Login success:", response.data)
    return response
  } catch (error) {
    console.log("Login failed:", error)
    throw error
  }
}
