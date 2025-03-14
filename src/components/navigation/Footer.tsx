import React from 'react'
import { InstagramOutlined, XOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

import navigation from '@/settings/navigation'
import Link from 'next/link';

function Footer() {
  return (
    <div className='container flex flex-col gap-8 py-4 md:py-6'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-[400px] mx-auto'>
        {
          navigation.map((nav, i) => (
            <div key={i} className='mx-auto text-native-700 cursor-pointer transition-colors duration-150 ease-in-out hover:text-native-900'>
              <Link href={nav.url}>
                <span>{nav.text}</span>
              </Link>
            </div>
          ))
        }
      </div>

      <div className='flex justify-center gap-16'>
        <Link href="/">
          <div className='text-native-700 text-2xl transition-colors duration-150 ease-in-out hover:text-native-900'>
            <LinkedinOutlined />
          </div>
        </Link>
        <Link href="/">
          <div className='text-native-700 text-2xl transition-colors duration-150 ease-in-out hover:text-native-900'>
            <FacebookOutlined />
          </div>
        </Link>
        <Link href="/">
          <div className='text-native-700 text-2xl transition-colors duration-150 ease-in-out hover:text-native-900'>
            <InstagramOutlined/>
          </div>
        </Link>
        <Link href="/">
          <div className='text-native-700 text-2xl transition-colors duration-150 ease-in-out hover:text-native-900'>
            <XOutlined />
          </div>
        </Link>
      </div>

      <div className='mx-auto text-sm text-native-700'>
        <p>&copy; 2025 Synapsis Blog. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer