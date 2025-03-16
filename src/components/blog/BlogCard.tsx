import Link from 'next/link'
import React from 'react'

interface BlogCardProps {
  id: number
  user_id: number
  title: string
  body: string
}

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function BlogCard(props: BlogCardProps) {
  const { id, user_id, title, body } = props

  return (
    <Link href={`/blog/${generateSlug(title)}-${id}`}>
      <div className='w-full h-fit flex flex-col gap-2 cursor-pointer'>
        {/* TODO: Add an actual random image */}
        <div className='w-full aspect-video mb-2 bg-slate-300 rounded-md'></div>
        <h2 className='text-l font-bold'>{title}</h2>
        <p className='text-slate-700 line-clamp-3'>{body}</p>
      </div>
    </Link>
  )
}

export default BlogCard