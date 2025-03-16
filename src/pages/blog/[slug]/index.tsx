import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

import BlogComments from '@/components/blog/BlogComments'

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface UserProps {
  id: number
  name: string
  email: string
  gender: string
  status: string
}

interface BlogDetailProps {
  blog: BlogProps
  author: UserProps
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
    // TODO: Handle error
    console.error('Error fetching blog:', error)
    return {
      data: [],
    }
  }
}

const fetchUser = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/users/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    })
  
    return {
      data: response.data
    }
  } catch (error) {
    // TODO: Handle error
    console.error('Error fetching blog comments:', error)
    return {
      data: [],
    }
  }
}

function BlogDetailPage({ blog, author }: BlogDetailProps) {

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <main className='flex flex-col gap-6 md:gap-12 container-small py-6 md:py-12'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden'>
          <Image 
            src={`https://picsum.photos/800/600?random=${Math.random()}`} 
            alt='Blog cover image' 
            objectFit='cover' 
            fill={true}
            loading='lazy'
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${btoa(
              `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#cbd5e1"/></svg>`
            )}`}
          />
        </div>
        
        <div className='flex flex-col md:flex-row md:justify-between gap-4'>
          <div>
            <p className='text-slate-400'>Posted on:</p>
            <p>February 4, 2025 12:00 AM</p>
          </div>
          
          <div className='flex gap-4'>
            <div className='relative w-12 h-12 rounded-full overflow-hidden'>
              <Image 
                src='/images/profile-placeholder.png'
                alt='Profile image'
                objectFit='cover'
                fill={true}
              />
            </div>
            <div>
              <p className='font-bold'>{author?.name ? author?.name : 'Anonymous'}</p>
              <p className='text-slate-400'>Author</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 md:gap-6'>
          <h1 className='text-3xl font-bold'>{blog.title}</h1>
          <div className='text-justify text-slate-400'>{blog.body}</div>
        </div>

        <BlogComments blogId={blog.id} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }
  
  if (!slug) {
    return { notFound: true }
  }

  const parts = slug.split("-")
  const id = parts[parts.length - 1]

  if (!id || isNaN(Number(id))) {
    return { notFound: true }
  }

  const { data: blog } = await fetchBlog(id)
  const { data: author } = await fetchUser(blog.user_id) 

  return {
    props: { blog, author }
  }
}

export default BlogDetailPage