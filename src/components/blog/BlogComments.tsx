import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input, Button } from "antd";
const { TextArea } = Input;
import BlogComment from '@/components/blog/BlogComment'

interface CommentProps {
  id: number,
  name: string,
  body: string
}

interface BlogCommentsProps {
  blogId: number
}

const commentSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  comment: z.string().nonempty("Comment can not be empty"),
})

function BlogComments({ blogId }: BlogCommentsProps) {
  const [comments, setComments] = useState<CommentProps[]>([])

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${blogId}/comments`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      })

      setComments(response.data)
    } catch (error) {
      setComments([])
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const { 
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const handleComment = async (data: any) => {
    const { email, name, comment } = data

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/public/v2/posts/${blogId}/comments`, {
        post_id: blogId,
        name: name,
        email: email,
        body: comment
      }, {
        headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      })

      await fetchComments()
      reset()
      
    } catch (error) {
      setError("comment", {
        type: "server",
        message: "Failed to post comment. Try again later",
      });
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='font-bold text-lg'>Comments</h2>
      {
        comments.length ?
        <div className='flex flex-col gap-4'>
          {
            comments.map((comment) => (
              <BlogComment 
                key={comment.id}
                name={comment.name}
                body={comment.body}
              />
            ))
          }
        </div> :
        <p className='text-slate-400'>No comments yet</p>
      }

      <div className='flex gap-4'>
        <div className='relative w-12 h-12 rounded-full overflow-hidden'>
          <Image 
            src='/images/profile-placeholder.png'
            alt='Profile image'
            objectFit='cover'
            fill={true}
          />
        </div>
        <form onSubmit={handleSubmit(handleComment)} className='flex flex-col gap-2 flex-1'>
          <div className='flex gap-2'>
            <Controller 
              name="name"
              control={control}
              render={({ field }) => (
                <Input 
                  size='large'
                  style={{
                    fontFamily: "Poppins, sans-serif"
                  }}
                  placeholder="Name" 
                  type='text' 
                  required
                  {...field}
                />
              )}
            />
            <Controller 
              name="email"
              control={control}
              render={({ field }) => (
                <Input 
                  size='large'
                  style={{
                    fontFamily: "Poppins, sans-serif"
                  }}
                  placeholder="Email" 
                  type='email' 
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className='w-full'>
            <Controller 
              name="comment"
              control={control}
              render={({ field }) => (
                <TextArea
                  placeholder="Add a comment..."
                  autoSize={{
                    minRows: 1,
                  }}
                  size='large'
                  required
                  style={{
                    fontFamily: "Poppins, sans-serif"
                  }}
                  {...field}
                />
              )}
            />
          </div>
          <div className='w-32 self-end'>
            <Button type="primary" size='large' block={true} htmlType='submit'>Comment</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogComments