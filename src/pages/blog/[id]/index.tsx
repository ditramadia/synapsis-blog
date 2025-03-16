import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface CommentProps {
  id: number,
  post_id: number,
  name: string,
  email: string,
  body: string
}

interface BlogDetailProps {
  blog: BlogProps
  comments: CommentProps[]
}

const fetchBlog = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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

const fetchComments = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    })
  
    console.log("Comments", response)

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

function index({ blog, comments }: BlogDetailProps) {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <main className='flex flex-col gap-6 container-small py-6 md:py-12'>
        <div className='w-full aspect-video bg-slate-300 rounded-md'></div>
        
        <div className='flex flex-col md:flex-row md:justify-between gap-4'>
          <div className='flex gap-4'>
            {/* TODO: Replace with an image */}
            <div className='w-12 h-12 bg-slate-300 rounded-full'></div>
            <div>
              <p className='font-bold'>Ditra Amadia</p>
              <p className='text-slate-400'>Marketing Expert</p>
            </div>
          </div>

          <div>
            <p className='text-slate-400'>Posted on:</p>
            <p>February 4, 2025 12:00 AM</p>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{blog.title}</h1>
          {/* Use v-html */}
          <p className='text-justify text-slate-400'>{blog.body}</p>
        </div>

        <div className='flex flex-col gap-6'>
          <h2 className='font-bold text-lg'>Comments ({comments.length})</h2>
          <div className='flex flex-col gap-4'>
            {
              comments.map((comment) => (
                <div key={comment.id} className='flex gap-4'>
                  {/* TODO: Replace with an image */}
                  <div className='w-8 h-8 mt-2 bg-slate-300 rounded-full'></div>

                  <div>
                    <p>{comment.name}</p>
                    <p className='text-slate-400'>{comment.body}</p>
                  </div>
                </div>
              ))
            }
            {
              comments.map((comment) => (
                <div key={comment.id} className='flex gap-4'>
                  {/* TODO: Replace with an image */}
                  <div className='w-8 h-8 mt-2 bg-slate-300 rounded-full'></div>

                  <div>
                    <p>{comment.name}</p>
                    <p className='text-slate-400'>{comment.body}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='mx-auto'>
            {/* TODO: Detect if user is signed in */}
            <p><Link href='/sign-in'><span className='underline text-blue-400'>Sign in</span></Link> to comment</p>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string}

  const { data: blog} = await fetchBlog(id)
  const { data: comments } = await fetchComments(id)

  return {
    props: { blog, comments }
  }
}

export default index