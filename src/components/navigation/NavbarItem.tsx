import React from 'react'
import Link from 'next/link'

interface NavbarItemProps {
  text: string
  url: string
}

function NavbarItem(props: NavbarItemProps) {
  const { text, url } = props

  return (
    <li className='relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-native-black-900 after:transition-all after:ease-in-out after:duration-150 hover:after:w-full'>
      <Link href={url}>
        <span>{text}</span>
      </Link>
    </li>
  )
}

export default NavbarItem