"use server"
import { z } from "zod"

// Mock database for users
let users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@medistore.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "Doctor User",
    email: "doctor@medistore.com",
    password: "doctor123",
    role: "doctor",
  },
  {
    id: "3",
    name: "Customer User",
    email: "customer@medistore.com",
    password: "customer123",
    role: "customer",
  },
]

// Mock database for contact form submissions
const contactSubmissions: any[] = []

// Contact form schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

// Login schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

// Registration schema
const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Submit contact form
export async function submitContactForm(formData: any) {
  try {
    // Validate form data
    const validatedData = ContactFormSchema.parse(formData)

    // In a real app, you would save this to a database
    // For now, we'll just add it to our mock database
    const submission = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    }

    contactSubmissions.push(submission)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, data: submission }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to submit form" }
  }
}

// Login user
export async function loginUser(formData: any) {
  try {
    // Validate form data
    const validatedData = LoginSchema.parse(formData)

    // Find user by email
    const user = users.find((u) => u.email === validatedData.email)

    // Check if user exists and password matches
    if (!user || user.password !== validatedData.password) {
      return { success: false, error: "Invalid email or password" }
    }

    // In a real app, you would create a session or JWT token here
    // For now, we'll just return the user (minus the password)
    const { password, ...userWithoutPassword } = user

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, data: userWithoutPassword }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to login" }
  }
}

// Register user
export async function registerUser(formData: any) {
  try {
    // Validate form data
    const validatedData = RegisterSchema.parse(formData)

    // Check if email already exists
    if (users.some((u) => u.email === validatedData.email)) {
      return { success: false, error: "Email already in use" }
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password, // In a real app, this would be hashed
      role: "customer", // Default role for new registrations
    }

    // Add user to mock database
    users.push(newUser)

    // Return user without password
    const { password, ...userWithoutPassword } = newUser

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, data: userWithoutPassword }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to register" }
  }
}

// Get all users (admin only)
export async function getUsers() {
  // In a real app, you would check if the current user is an admin

  // Return users without passwords
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)

  return { success: true, data: usersWithoutPasswords }
}

// Get user by ID
export async function getUserById(id: string) {
  // Find user by ID
  const user = users.find((u) => u.id === id)

  if (!user) {
    return { success: false, error: "User not found" }
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user

  return { success: true, data: userWithoutPassword }
}

// Update user
export async function updateUser(id: string, userData: any) {
  // Find user index
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return { success: false, error: "User not found" }
  }

  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
  }

  // Return updated user without password
  const { password, ...userWithoutPassword } = users[userIndex]

  return { success: true, data: userWithoutPassword }
}

// Delete user
export async function deleteUser(id: string) {
  // Filter out user with matching ID
  const initialLength = users.length
  users = users.filter((u) => u.id !== id)

  if (users.length === initialLength) {
    return { success: false, error: "User not found" }
  }

  return { success: true }
}
