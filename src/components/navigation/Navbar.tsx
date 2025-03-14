import React from 'react'
import Link from 'next/link'
import NavbarItem from './NavbarItem'

function Navbar() {
  const navigation = [
    {
      text: 'Blog',
      url: '/blog'
    },
    {
      text: 'About',
      url: '/about'
    },
    {
      text: 'Contact',
      url: '/contact'
    },
    {
      text: 'Sign In',
      url: '/sign-in'
    },
  ]

  return (
    <div className='container py-4 md:py-6 flex flex-col md:flex-row md:justify-between items-center gap-2'>
      {/* TODO: Change to an actual Logo */}
      <div className='text-2xl font-bold'>Synapsis Blog</div>

      <ul className='flex gap-6'>
        {
          navigation.map((nav, i) => 
            <NavbarItem key={i} text={nav.text} url={nav.url} />
          )
        }
      </ul>
    </div>
  )
}

export default Navbar