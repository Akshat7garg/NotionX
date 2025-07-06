import React from 'react'
import noAuth from '@/assets/noAuth.webp'
import AuthOptions from './AuthOptions'

function NoAuth() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center p-3 text-center'>
      {/* Illustration */}
      <img
        src={noAuth}
        alt="No_Login"
        className='h-32 sm:h-40'
      />

      {/* Title */}
      <h3 className='text-xl sm:text-2xl font-black text-mountain-2'>
        You&apos;re not logged in!
      </h3>

      {/* Subtext */}
      <p className='text-sm sm:text-base font-medium mb-4'>
        Sign in to create, view, and manage your notes. Keep your ideas safe and organized.
      </p>

      {/* Auth Buttons */}
      <AuthOptions />
    </div>
  )
}

export default NoAuth