import React, { useState } from 'react'
import { GetServerSideProps } from "next";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from "antd";

import BlogCard from '@/components/blog/BlogCard';
import BlogSkeleton from '@/components/blog/BlogSkeleton';

interface BlogProps {
  id: number,
  user_id: number,
  title: string,
  body: string
}

interface BlogApiResponseProps {
  data: BlogProps[]
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
}

interface BlogPageProps {
  initialBlogs: BlogProps[]
  initialPage: number
  initialPageSize: number
  totalPages: number
  totalItems: number
}

const fetchBlogs = async (page: number, pageSize: number): Promise<BlogApiResponseProps> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  const response: any = await axios.get(`https://gorest.co.in/public/v2/posts`, {
    params: { page, per_page: pageSize },
  })

  return {
    data: response.data,
    currentPage: Number(response.headers["x-pagination-page"]) || page,
    pageSize: Number(response.headers["x-pagination-limit"]) || 12,
    totalPages: Number(response.headers["x-pagination-pages"]) || 1,
    totalItems: Number(response.headers["x-pagination-total"]) || 50,
  }
}

function BlogPage({ initialBlogs, initialPage, initialPageSize, totalPages, totalItems }: BlogPageProps) {
  const router = useRouter()
  const currentPage = Number(router.query.page) || initialPage
  const [pageSize, setPageSize] = useState<number>(12)
  
  const { data, isFetching, isError } = useQuery<BlogApiResponseProps>({
    queryKey: ["blogs", currentPage, pageSize],
    queryFn: () => fetchBlogs(currentPage, pageSize),
    initialData: {
      data: initialBlogs,
      totalPages,
      pageSize: initialPageSize,
      currentPage: initialPage,
      totalItems,
    }
  })

  const blogs = data.data

  if (isError) return <p>Failed to load blogs.</p>

  const handlePageChange = (newPage: number, newPageSize: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setPageSize(newPageSize)
    router.push(`/blog?page=${newPage}`, undefined, {
      shallow: true
    })
  }

  return (
    <main className='flex flex-col gap-8 md:gap-16 container py-6 md:py-12'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl font-bold'>From The Blog</h1>
        <p className='text-balance text-native-700'>Insights, Updates, and Stories Worth Reading.</p>
      </div>

      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {
            isFetching ?
            Array.from({ length: pageSize }).map((_, i) => (
              <BlogSkeleton key={i} />
            )) :
            blogs.map((blog: BlogProps) => (
              <BlogCard key={blog.id} id={blog.id} user_id={blog.user_id} title={blog.title} body={blog.body} />
            ))
          }
        </div>

        <div className='my-8 md:my-16'>
          <Pagination align="center" defaultCurrent={1} pageSize={pageSize} pageSizeOptions={[8, 12, 16]} total={totalItems} onChange={handlePageChange}/>
        </div>
      </div>
    </main>
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

export default BlogPage