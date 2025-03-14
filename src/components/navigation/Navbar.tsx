import React from 'react'
import NavbarItem from './NavbarItem'

import navigation from '@/settings/navigation';

function Navbar() {

  return (
    <div className='container py-4 md:py-6 flex flex-col md:flex-row md:justify-between items-center gap-2'>
      {/* TODO: Change to an actual Logo */}
      <div className='text-2xl font-bold'>Synapsis</div>

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