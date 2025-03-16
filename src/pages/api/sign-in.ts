import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface User {
  id: number
  email: string
  password: string
  role: string
}

const users: User[] = [
  {
    id: 7773257,
    email: 'kevin_putra@gmail.com',
    password: 'kevin123',
    role: 'user'
  },
  {
    id: 7773258,
    email: 'franz_kafka@gmail.com',
    password: 'metamorphosis123',
    role: 'admin'
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404).json({
      message: "Not Found"
    })
  }

  const { email, password} = req.body

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
  
    return res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: user.role,
        },
        token: process.env.NEXT_PUBLIC_PUBLIC_API_KEY
      }
    })
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user data" });
  }
}
