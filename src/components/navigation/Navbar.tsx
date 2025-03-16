import React from 'react'
import navigation from '@/data/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { signout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

import NavbarItem from './NavbarItem'

function Navbar() {
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.user.role);

  const handleSignOut = async () => {
    dispatch(signout())
    router.push('/')
  }

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
          isAuthenticated && role === 'admin' && <NavbarItem text="Dashboard" url="/dashboard" />
        }
        {
          isAuthenticated ?
          <div onClick={handleSignOut}>
            <NavbarItem text="Sign Out"/>
          </div>:
          <NavbarItem text="Sign In" url="/sign-in" />
        }
      </ul>
    </div>
  )
}

export default Navbar