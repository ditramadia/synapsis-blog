import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavbarItemProps {
  text: string
  url: string
}

function NavbarItem({ text, url }: NavbarItemProps) {
  const router = useRouter()
  
  return (
    <li className={`relative cursor-pointer after:block after:h-[2px] ${router.pathname === url ? 'after:w-full' : 'after:w-0 '} after:bg-native-900 after:transition-all after:ease-in-out after:duration-150 hover:after:w-full`}>
      <Link href={url}>
        <span>{text}</span>
      </Link>
    </li>
  )
}

export default NavbarItem