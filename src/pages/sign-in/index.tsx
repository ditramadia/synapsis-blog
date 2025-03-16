import React from 'react'
import Head from 'next/head'
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { signin } from '@/store/authSlice';
import axios from 'axios';

import { Input } from "antd";
import { Button } from "antd";
const { Password }= Input

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

function SignInPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  
  const { 
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const handleSignIn = async (data: any) => {
    const { email, password } = data
    
    try {
      const { data } = await axios.post("/api/sign-in", { email, password })

      dispatch(signin(data.data))
      reset()
      router.push('/')
    } catch (error: any) {
      if (error.code === 500) {
        setError("password", {
          type: "server",
          message: "Failed to sign in. Try again later",
        });
      } else {
        setError("password", {
          type: "server",
          message: "Invalid email or password",
        });
      }
    }
  }

  return (
    <>
      <Head>
        <title>Synapsis | Sign In</title>
      </Head>

      <main className='flex flex-col gap-8 justify-center items-center container-small h-screen'>
        <h1 className='text-3xl font-bold text-main-500'>Sign In</h1>

        <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col items-center gap-6 md:gap-12 max-w-[400px] w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <Controller 
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    size='large'
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }}
                    placeholder="Email" 
                    type='email' 
                    required
                    {...field}/>
                )}
              />
              {
                errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p> 
              }
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>
              
              <Controller 
                name="password"
                control={control}
                render={({ field }) => (
                  <Password
                    size='large'
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }} 
                    placeholder="Password"
                    required 
                    {...field}
                  />
                )}
              />
              {
                errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p> 
              }
            </div>
          </div>

          <div className='flex flex-col gap-2 items-center w-full'>
            <div className='w-full'>
              <Button type="primary" size='large' block={true} htmlType='submit'>Sign In</Button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

SignInPage.noLayout = true
export default SignInPage
