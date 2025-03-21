import React from 'react'

import { InstagramOutlined, XOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div className='container flex flex-col gap-8 py-4 md:py-6'>
      <div className='flex justify-center gap-16'>
        <a href="https://www.linkedin.com/" target='_blank' rel='noopener noreferrer'>
          <div className='text-native-400 text-2xl transition-colors duration-150 ease-in-out hover:text-main-500'>
            <LinkedinOutlined />
          </div>
        </a>
        <a href="https://www.facebook.com/" target='_blank' rel='noopener noreferrer'>
          <div className='text-native-400 text-2xl transition-colors duration-150 ease-in-out hover:text-main-500'>
            <FacebookOutlined />
          </div>
        </a>
        <a href="https://www.instagram.com/" target='_blank' rel='noopener noreferrer'>
          <div className='text-native-400 text-2xl transition-colors duration-150 ease-in-out hover:text-main-500'>
            <InstagramOutlined/>
          </div>
        </a>
        <a href="https://www.twitter.com/" target='_blank' rel='noopener noreferrer'>
          <div className='text-native-400 text-2xl transition-colors duration-150 ease-in-out hover:text-main-500'>
            <XOutlined />
          </div>
        </a>
      </div>

      <div className='mx-auto text-sm text-native-400'>
        <p>&copy; 2025 Synapsis Blog. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer