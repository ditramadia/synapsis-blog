import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { Slide, toast } from 'react-toastify'

import { Button, Input } from 'antd'
const { TextArea } = Input;

import BlogProps from '@/types/Blog'

interface BlogDetailPageProps {
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
    // TODO: Navigate to Internal Server Error
    return {
      data: [],
    }
  }
}

function BlogDetailPage({ blog }: BlogDetailPageProps) {
  useAuthRedirect()
  
  const router = useRouter()
  
  const handleDeleteBlog = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      })

      toast.success('Blog deleted succcessfully', {
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
      router.push(`/dashboard`)
    } catch (error) {
      toast.error('Failed deleting blog', {
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
        <title>Synapsis | View Blog</title>
      </Head>

      <main className='container-small py-8 md:py-16'>
        <h1 className='mb-8 text-2xl font-bold text-main-500'>View Blog</h1>

        <div className='flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col gap-4 md:gap-8'>
            <div className='flex flex-col gap-1'>
              <label>ID</label>
              <Input 
                size='large'
                style={{
                  fontFamily: "Poppins, sans-serif"
                }}
                placeholder="ID" 
                value={blog.id}
                type='text' 
                readOnly 
                disabled />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Author ID</label>
              <Input 
                size='large'
                style={{
                  fontFamily: "Poppins, sans-serif"
                }}
                placeholder="Author ID" 
                value={blog.user_id}
                type='text' 
                readOnly 
                disabled />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Title</label>
              <Input 
                size='large'
                style={{
                  fontFamily: "Poppins, sans-serif"
                }}
                placeholder="Title" 
                value={blog.title}
                type='text' 
                readOnly />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Body</label>
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
                value={blog.body}
                readOnly />
            </div>
          </div>

          <div className='flex flex-wrap justify-end gap-2'>
            <a href={`/blog/${blog.id}`} target='_blank' rel="noopener noreferrer">
              <div className='w-20 self-end'>
                <Button color='green' type="primary" size='large' block={true}>Visit</Button>
              </div>
            </a>
            <Link href={`/dashboard/blog/${blog.id}/edit`}>
              <div className='w-20 self-end'>
                <Button color='orange' type="primary" size='large' block={true}>Edit</Button>
              </div>
            </Link>
            <div onClick={handleDeleteBlog} className='w-20 self-end'>
              <Button color='danger' type="primary" size='large' block={true}>Delete</Button>
            </div>
          </div>
        </div>
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