import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import axios from 'axios'

import { CompassFilled, DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface BlogPageProps {
  initialBlogs: BlogProps[]
  initialPage: number
  initialPageSize: number
  totalPages: number
  totalItems: number
}

const fetchBlogs = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      params: { page, per_page: pageSize },
    })
    return {
      data: response.data,
      currentPage: Number(response.headers["x-pagination-page"]) || page,
      pageSize: Number(response.headers["x-pagination-limit"]) || 12,
      totalPages: Number(response.headers["x-pagination-pages"]) || 1,
      totalItems: Number(response.headers["x-pagination-total"]) || 50,
    }
  } catch (error) {
    // TODO: Handle error
    console.error("Error fetching blogs:", error)

    return {
      data: [],
      error: true
    }
  }
}

function DashboardPage({ initialBlogs, initialPage, initialPageSize, totalPages, totalItems }: BlogPageProps) {
  const router = useRouter()
  const currentPage = Number(router.query.page) || initialPage
  const [pageSize, setPageSize] = useState<number>(12)

  const { data, isFetching, isError } = useQuery({
    queryKey: ["blogs", currentPage, pageSize],
    queryFn: () => fetchBlogs(currentPage, pageSize),
    initialData: {
      data: initialBlogs,
      totalPages,
      pageSize: initialPageSize,
      currentPage: initialPage,
      totalItems,
    },
    refetchOnWindowFocus: false
  })

  const blogs = data.data

  // TODO: Implement a better error message
  if (isError) return <p>Failed to load blogs.</p>

  const handlePageChange = (newPage: number, newPageSize: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setPageSize(newPageSize)
    router.push(`/dashboard?page=${newPage}`, undefined, {
      shallow: true
    })
  }
  
  return (
    <>
      <Head>
        <title>Synapsis | Dashboard</title>
      </Head>

      <main className='flex flex-col gap-8 md:gap-16 container py-6 md:py-12'>
        <h1 className='text-3xl font-bold text-main-500 text-center'>Dashboard</h1>

        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-8 md:grid-cols-12 gap-2 py-1 px-2 md:py-2 md:px-4 bg-native-200 rounded-md'>
            <span className='col-span-2 md:col-span-1'>ID</span>
            <span className='col-span-4 md:col-span-9'>Title</span>
            <span className='col-span-2'>Action</span>
          </div>
          {
            blogs.map((blog: BlogProps) => (
              <div key={blog.id} className='grid grid-cols-8 md:grid-cols-12 gap-2 p-2 md:p-4'>
                <span className='col-span-2 md:col-span-1'>{blog.id}</span>
                <span className='col-span-4 md:col-span-9'>{blog.title}</span>
                <div className='flex flex-wrap gap-1 col-span-2'>
                  <a href={`/blog/${blog.id}`} target='_blank' rel="noopener noreferrer">
                    <div className='flex items-center justify-center w-8 h-8 bg-green-400 rounded-md cursor-pointer'>
                      <CompassFilled className='text-native-100' />
                    </div>
                  </a>
                  <Link href={`/dashboard/blog/${blog.id}`}>
                    <div className='flex items-center justify-center w-8 h-8 bg-blue-400 rounded-md cursor-pointer'>
                      <EyeFilled className='text-native-100' />
                    </div>
                  </Link>
                  <Link href={`/dashboard/blog/${blog.id}/edit`}>
                    <div className='flex items-center justify-center w-8 h-8 bg-orange-400 rounded-md cursor-pointer'>
                      <EditFilled className='text-native-100' />
                    </div>
                  </Link>
                  <div className='flex items-center justify-center w-8 h-8 bg-red-400 rounded-md cursor-pointer'>
                    <DeleteFilled className='text-native-100' />
                  </div>
                </div>
              </div>
            ))
          }
          
          <div className='my-8 md:my-16'>
            <Pagination align="center" defaultCurrent={1} pageSize={pageSize} pageSizeOptions={[8, 12, 16]} total={totalItems} onChange={handlePageChange}/>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1
  const pageSize = Number(context.query.pageSize) || 12
  const { data: initialBlogs, totalPages, totalItems } = await fetchBlogs(page, pageSize)

  return {
    props: {
      initialBlogs,
      initialPage: page,
      initialPageSize: pageSize,
      totalPages,
      totalItems
    }
  }
}

export default DashboardPage