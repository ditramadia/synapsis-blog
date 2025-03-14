import React from 'react'
import { GetServerSideProps } from "next";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { Pagination } from "antd";

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface BlogPageProps {
  initialBlogs: BlogProps[]
  initialPage: number
}

const fetchBlogs = async (page: number) => {
  const response = await axios.get(`https://gorest.co.in/public/v2/posts`, {
    params: { page, per_page: 12 },
  })
  return response.data
}

function BlogPage({ initialBlogs, initialPage }: BlogPageProps) {
  const router = useRouter()
  const currentPage = Number(router.query.page) || initialPage
  
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogs(currentPage),
    initialData: initialBlogs
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load blogs.</p>
  
  const handlePageChange = (newPage: number) => {
    router.push(`/blogs?page=${newPage}`)
  }

  return (
    <main className='flex flex-col gap-8 md:gap-16 container py-6 md:py-12'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl font-bold'>From The Blog</h1>
        <p className='text-balance text-native-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {
            blogs.map((blog: BlogProps) => (
              <div key={blog.id} className='w-full h-fit flex flex-col gap-2 cursor-pointer'>
                <div className='w-full aspect-video mb-2 bg-slate-300 rounded-md'></div>
                <h2 className='text-l font-bold'>{blog.title}</h2>
                <p className='text-slate-700 line-clamp-3'>{blog.body}</p>
              </div>
            ))
          }
        </div>

        <div className='my-8 md:my-16'>
          <Pagination align="center" defaultCurrent={1} total={50} onChange={handlePageChange} />
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1
  const initialBlogs = await fetchBlogs(page)

  return {
    props: {
      initialBlogs,
      initialPage: page
    }
  }
}

export default BlogPage