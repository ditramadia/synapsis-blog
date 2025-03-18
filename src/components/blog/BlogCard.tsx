import Image from 'next/image'
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
  const { id, title, body } = props

  return (
    <Link href={`/blog/${generateSlug(title)}-${id}`}>
      <div className='w-full h-fit flex flex-col gap-2 cursor-pointer'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden group'>
          <Image 
            src={`https://picsum.photos/800/600?random=${Math.random()}`} 
            alt='Blog thumbnail'
            className='transition-transform ease-in-out duration-150 group-hover:scale-125' 
            objectFit='cover' 
            fill={true}
            loading='lazy'
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${btoa(
              `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#cbd5e1"/></svg>`
            )}`}
          />
        </div>
        <h2 className='text-l font-bold'>{title}</h2>
        <p className='text-native-400 line-clamp-3'>{body}</p>
      </div>
    </Link>
  )
}

export default BlogCard