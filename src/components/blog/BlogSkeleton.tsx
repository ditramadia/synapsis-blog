import React from 'react'

function BlogSkeleton() {
  return (
    <div className='w-full h-fit flex flex-col gap-2 cursor-pointer'>
      <div className='w-full aspect-video mb-2 skeleton'></div>
      <div className='w-5/6 h-4 my-1 skeleton'></div>
      <div className='flex flex-col gap-[1px]'>
        <div className='w-full h-4 my-1 skeleton'></div>
        <div className='w-full h-4 my-1 skeleton'></div>
        <div className='w-1/2 h-4 my-1 skeleton'></div>
      </div>
    </div>
  )
}

export default BlogSkeleton