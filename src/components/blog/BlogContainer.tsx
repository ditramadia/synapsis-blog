import React from 'react'
import { GetServerSideProps } from "next";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { Input } from "antd"
const { Search } = Input

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
    params: { page, per_page: 5 },
  })
  return response.data
}

function BlogContainer({ initialBlogs, initialPage }: BlogPageProps) {
  const router = useRouter()
  const currentPage = Number(router.query.page) || initialPage
  
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogs(currentPage),
    initialData: initialBlogs
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load blogs.</p>

  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      <div>
        <div className='flex justify-center'>
          <Search
            placeholder="Search blog"
            onSearch={onSearch}
            size="large"
            variant='outlined'
            allowClear
            style={{
              maxWidth: "600px",
              width: "full",
            }}
          />
        </div>
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 md:py-16'>
        {/* <div className='w-full h-fit flex flex-col gap-2'>
          <div className='w-full aspect-video mb-2 bg-slate-300 rounded-md'></div>
          <span className='text-native-700 text-sm'>February 4, 2025 12:00 AM</span>
          <h2 className='text-l font-bold'>Key Players in Japan&apos;s Offshore Wind Market</h2>
          <p className='text-slate-700'>Learn about key players, market growth, and investment potential in Japan&apos;s offshore wind sector. Explore major projects and opportunities in renewable energy.</p>
        </div> */}
        {
          blogs.map((blog: BlogProps) => (
            <div key={blog.id} className='w-full h-fit flex flex-col gap-2'>
              <div className='w-full aspect-video mb-2 bg-slate-300 rounded-md'></div>
              <span className='text-native-700 text-sm'>February 4, 2025 12:00 AM</span>
              <h2 className='text-l font-bold'>Key Players in Japan&apos;s Offshore Wind Market</h2>
              <p className='text-slate-700'>Learn about key players, market growth, and investment potential in Japan&apos;s offshore wind sector. Explore major projects and opportunities in renewable energy.</p>
            </div>
          ))
        }
      </div>
    </div>
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

export default BlogContainer