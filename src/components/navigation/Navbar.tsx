import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='container py-4 md:py-6 flex flex-col md:flex-row md:justify-between items-center gap-2'>
      {/* TODO: Change to an actual Logo */}
      <div className='text-2xl font-bold'>Synapsis Blog</div>

      <ul className='flex gap-6'>
        <li className='relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-native-black after:transition-all after:ease-in-out after:duration-150 hover:after:w-full'>
          <Link href="/blog">
            <span>Blog</span>
          </Link>
        </li>
        <li className='relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-native-black after:transition-all after:ease-in-out after:duration-150 hover:after:w-full'>
          <Link href="/blog">
            <span>About</span>
          </Link>
        </li>
        <li className='relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-native-black after:transition-all after:ease-in-out after:duration-150 hover:after:w-full'>
          <Link href="/blog">
            <span>Contact</span>
          </Link>
        </li>
        <li className='relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-native-black after:transition-all after:ease-in-out after:duration-150 hover:after:w-full'>
          <Link href="/blog">
            <span>Sign In</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar