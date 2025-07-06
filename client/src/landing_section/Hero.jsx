import React from 'react'

// Hero section of the NotionX homepage
function Hero() {
  return (
    <section className='h-full w-full flex flex-col justify-start items-center text-center px-4 sm:px-8 md:px-[6%]'>
      {/* Main heading */}
      <h1 className='text-2xl sm:text-4xl xl:text-5xl font-black text-mountain-2'>
        Welcome to NotionX
      </h1>

      {/* Tagline */}
      <p className='text-sm sm:text-base xl:text-lg font-semibold'>
        Make productivity delightful with your notes and to-dos together.
      </p>
    </section>
  )
}

export default Hero