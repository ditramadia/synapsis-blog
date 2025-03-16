import React from 'react'

interface BlogCardProps {
  id: number
  user_id: number
  title: string
  body: string
}

function BlogCard(props: BlogCardProps) {
  const { id, user_id, title, body } = props

  return (
    <div key={id} className='w-full h-fit flex flex-col gap-2 cursor-pointer'>
      <div className='w-full aspect-video mb-2 bg-slate-300 rounded-md'></div>
      <h2 className='text-l font-bold'>{title}</h2>
      <p className='text-slate-700 line-clamp-3'>{body}</p>
    </div>
  )
}

export default BlogCard