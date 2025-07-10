import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import logo from '@/assets/logo.webp'
import UserMenu from '@/auth_section/UserMenu';
import AuthOptions from '@/auth_section/AuthOptions';

// Header component for NotionX
function Header() {
    // Select login state from Redux store
    const { isLogged } = useSelector((state) => state.user);

    useEffect(() => {
        const BACKEND_PING_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ping`;

        const pingBackend = async () => {
            try {
                await axios.get(BACKEND_PING_URL);
                console.log('Backend pinged to keep awake');
            } catch (err) {
                console.warn('Backend ping failed:', err.message);
            }
        };

        pingBackend(); // Initial ping immediately on mount

        const intervalId = setInterval(pingBackend, 5 * 60 * 1000); // Set interval to ping every 5 minutes

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

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