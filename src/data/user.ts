interface User {
  id: number
  email: string
  password: string
}

const users: User[] = [
  {
    id: Number(process.env.NEXT_PUBLIC_USER_ID),
    email: 'franz_kafka@gmail.com',
    password: 'metamorphosis123',
  }
]

export default users