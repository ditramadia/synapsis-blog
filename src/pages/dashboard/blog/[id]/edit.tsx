import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { Slide, toast } from 'react-toastify'

import { Button, Input } from 'antd'
const { TextArea } = Input;

import BlogProps from '@/types/Blog'

interface BlogEditProps {
  blog: BlogProps
}

const fetchBlog = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    })
    
    return {
      data: response.data
    }
  } catch (error) {
    // TODO: Navigate to Internal Server Error Page
    console.error('Error fetching blog:', error)
    return {
      data: [],
    }
  }
}

const blogSchema = z.object({
  id: z.number(),
  author_id: z.number(),
  title: z.string().nonempty("Title is required"),
  body: z.string().nonempty("Body is required")
})

function BlogDetailPage({ blog }: BlogEditProps) {
  useAuthRedirect()
  
  const router = useRouter()

  const { 
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      id: blog.id,
      author_id: blog.user_id,
      title: blog.title,
      body: blog.body
    }
  })

  const handleSave = async (data: any) => {
    const { id, author_id, title, body } = data
    
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${blog.id}`, { 
        id,
        user_id: author_id,
        title,
        body
        }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
        })

        toast.success('Blog edited succcessfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        router.push(`/dashboard/blog/${blog.id}`)
    } catch (error: any) {
      toast.success('Failed editing blog', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Synapsis | Edit Blog</title>
      </Head>

      <main className='container-small py-8 md:py-16'>
        <h1 className='mb-8 text-2xl font-bold text-main-500'>Edit Blog</h1>

        <form onSubmit={handleSubmit(handleSave)} className='flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col gap-4 md:gap-8'>
            <div className='flex flex-col gap-1'>
              <label>ID</label>
              <Controller 
                name="id"
                control={control}
                render={({field}) => (
                  <Input 
                    size='large'
                    style={{
                      fontFamily: "Poppins, sans-serif"
                    }}
                    placeholder="ID" 
                    type='text' 
                    readOnly 
                    disabled 
                    {...field} />
                )}
              />
              {
                errors.id && <p className='text-sm text-red-500'>{errors.id.message}</p> 
              }
            </div>
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
            <div className='w-20'>
              <Button color='orange' type="primary" size='large' block={true} htmlType='submit'>Save</Button>
            </div>
            <Link href={`/dashboard/blog/${blog.id}`}>
              <div className='w-20'>
                <Button color='danger' type="default" size='large' block={true}>Cancel</Button>
              </div>
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("Context Params", context.params)
  
  const { id } = context.params as { id: string }

  if (!id || isNaN(Number(id))) {
    return { notFound: true }
  }

  const { data: blog } = await fetchBlog(id)

  return {
    props: { blog }
  }
}

export default BlogDetailPage