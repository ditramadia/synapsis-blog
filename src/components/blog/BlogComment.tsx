import React from 'react'
import Image from 'next/image'

import CommentProps from '@/types/Comment'

function BlogComment({ name, body }: CommentProps) {
  return (
    <div className='flex gap-4'>
      <div className='relative w-8 h-8 mt-2 rounded-full overflow-hidden'>
        <Image 
          src='/images/profile-placeholder.png'
          alt='Profile image'
          sizes="(max-width: 768px) 100vw)"
          objectFit='cover'
          fill
        />
      </div>

      <div>
        <p>{name}</p>
        <p className='text-slate-400'>{body}</p>
      </div>
    </div>
  )
}

export default BlogComment