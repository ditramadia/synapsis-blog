import React, { ChangeEvent } from 'react'

import { Input } from "antd"
const { Search } = Input

function index() {
  const onSearch = (value: string) => console.log(value);

  return (
    <main className='flex flex-col gap-8 md:gap-16 container py-6 md:py-12'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl font-bold'>From The Blog</h1>
        <p className='text-balance text-native-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      {/* Search bar and filter */}
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
    </main>
  )
}

export default index