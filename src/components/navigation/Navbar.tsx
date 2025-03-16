import React from 'react'
import navigation from '@/settings/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import NavbarItem from './NavbarItem'

function Navbar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className='container py-4 md:py-6 flex flex-col md:flex-row md:justify-between items-center gap-2'>
      {/* TODO: Change to an actual Logo */}
      <Link href='/'>
        <div className='text-main-500 text-2xl font-bold'>Synapsis</div>
      </Link>

      <ul className='flex gap-6'>
        {
          navigation.map((nav, i) => 
            <NavbarItem key={i} text={nav.text} url={nav.url} />
          )
        }
        {
          isAuthenticated ?
          <NavbarItem text="Dashboard" url="/dashboard" /> :
          <NavbarItem text="Sign In" url="/sign-in" />
        }
      </ul>
    </div>
  )
}

export default Navbar