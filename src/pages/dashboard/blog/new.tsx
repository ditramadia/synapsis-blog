import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useAuthRedirect from '@/hooks/useAuthRedirect'

import { Button, Input } from 'antd'
const { TextArea } = Input;

const blogSchema = z.object({
  author_id: z.number(),
  title: z.string().nonempty("Title is required"),
  body: z.string().nonempty("Body is required")
})

function BlogCreatePage() {
  useAuthRedirect()
  
  const router = useRouter()

  const user_id = useSelector((state: RootState) => state.auth?.user?.id);

  const { 
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      author_id: user_id
    }
  })

  const handlePost = async (data: any) => {
    const { author_id, title, body } = data
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts`, { 
        user_id: author_id,
        title,
        body
       }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
       })

       // TODO: Open Toast
       const id = response.data.id
       router.push(`/dashboard/blog/${id}`)
    } catch (error: any) {
      // TODO: Open Toast
      console.error("Error", error)
    }
  }

  return (
    <>
      <Head>
        <title>Synapsis | Edit Blog</title>
      </Head>

      <main className='container-small py-8 md:py-16'>
        <h1 className='mb-8 text-2xl font-bold text-main-500'>New Blog</h1>

        <form onSubmit={handleSubmit(handlePost)} className='flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col gap-4 md:gap-8'>
            <div className='flex flex-col gap-1'>
              <label>Author ID</label>
              <Controller 
                name="author_id"
                control={control}
                render={({field}) => (
                  <Input 
                    size='large'
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }}
                    placeholder="Author ID" 
                    type='text' 
                    readOnly 
                    disabled
                    {...field} />
                )}
              />
              {
                errors.author_id && <p className='text-sm text-red-500'>{errors.author_id.message}</p> 
              }
            </div>
            <div className='flex flex-col gap-1'>
              <label>Title</label>
              <Controller 
                name="title"
                control={control}
                render={({field}) => (
                  <Input 
                    size='large'
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }}
                    placeholder="Title" 
                    type='text'
                    {...field} />
                )}
              />
              {
                errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p> 
              }
            </div>
            <div className='flex flex-col gap-1'>
              <label>Body</label>
              <Controller 
                name="body"
                control={control}
                render={({field}) => (
                  <TextArea
                    size='large'
                    placeholder="Body"
                    autoSize={{
                      minRows: 1
                    }}
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }}
                    required
                    {...field} />
                )}
              />
              {
                errors.body && <p className='text-sm text-red-500'>{errors.body.message}</p> 
              }
            </div>
          </div>

          <div className='flex flex-wrap justify-end gap-2'>
            <div className='w-20' onClick={handlePost}>
              <Button color='orange' type="primary" size='large' block={true} htmlType='submit'>Post</Button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default BlogCreatePage