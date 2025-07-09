import React from 'react'
import logo from '@/assets/logo.webp'

function Loader() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 p-4'>
      {/* logo */}
      <img
        src={logo}
        alt="NotionX_Logo"
        className='h-32 md:h-36 lg:h-40 mb-2'
        loading='lazy'
      />

      {/* animated dots */}
      <div className='flex items-center justify-center gap-2'>
        <p className='animate-pulse h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6 rounded-full bg-mountain-2'></p>
        <p className='animate-pulse-delay-1 h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6 rounded-full bg-mountain-2'></p>
        <p className='animate-pulse-delay-2 h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6 rounded-full bg-mountain-2'></p>
      </div>

      {/* message */}
      <p className='w-full text-center text-2xl md:text-3xl lg:text-4xl font-black text-mountain-2'>Getting your work ready!!!</p>
    </div>
  )
}

export default Loader