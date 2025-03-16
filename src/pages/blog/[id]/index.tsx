import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Head from 'next/head'

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface BlogDetailProps {
  blog: BlogProps
}

const fetchBlog = async (id: string) => {
  try {
    const response = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`)
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

function index({ blog }: BlogDetailProps) {
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
              <p>Marketing Expert</p>
            </div>
          </div>

          <div>
            <p>Posted on:</p>
            <p>February 4, 2025 12:00 AM</p>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{blog.title}</h1>
          <p className='text-justify'>{blog.body}</p>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string}

  const response = await fetchBlog(id)

  return {
    props: { blog: response.data }
  }
}

export default index