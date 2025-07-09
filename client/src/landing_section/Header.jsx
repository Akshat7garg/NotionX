import React from 'react'
import { useSelector } from 'react-redux'
import logo from '@/assets/logo.webp'
import UserMenu from '@/auth_section/UserMenu';
import AuthOptions from '@/auth_section/AuthOptions';

// Header component for NotionX
function Header() {
    // Select login state from Redux store
    const { isLogged } = useSelector((state) => state.user);

    return (
        <header className='w-full py-2 px-4 sm:px-8 md:px-[6%] flex items-center justify-between'>
            {/* Logo and Brand Name */}
            <div className='flex items-center justify-center gap-2'>
                <img
                    src={logo}
                    alt="NotionX_Logo"
                    className='h-12'
                    loading='lazy'
                />
                <span className='text-2xl md:text-3xl text-mountain-2 font-black'>NotionX</span>
            </div>

            {/* Authenticated user menu or login/register options */}
            {isLogged ? <UserMenu /> : <AuthOptions />}
        </header>
    )
}

export default Header