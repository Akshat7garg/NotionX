import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from './store/slices/userSlice'
import Loader from './landing_section/Loader'
import Header from './landing_section/Header'
import Hero from './landing_section/Hero'
import SwitcherPanel from './landing_section/SwitcherPanel'
import { toast } from 'sonner'

function App() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // get user from localStorage
    const userData = JSON.parse(localStorage.getItem('userDetails'));

    if (userData) {
      dispatch(loginUser(userData));
    }
    else {
      dispatch(logoutUser());
    }

    // ping backend with retry
    const pingBackend = async (retryCount = 0) => {
      const maxRetries = 10;
      const delay = 5000; // 5 seconds

      try {
        // Try to ping the backend
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ping`, { timeout: 10000 });
        setIsReady(true);
      }
      catch (error) {
        if (retryCount === 0) {
          // Trigger deploy hook only once (on first failure)
          await axios.post(import.meta.env.VITE_BACKEND_DEPLOY_HOOK);
        }

        if (retryCount <= maxRetries) {
          console.warn(`Retrying ping (${retryCount + 1}/${maxRetries})...`);
          setTimeout(() => pingBackend(retryCount + 1), delay);
        }
        else {
          console.error('Backend not reachable after retries.');
          toast.error('Something went wrong, please refresh the page and try again.');
          setIsReady(false); // Or show an error message
        }
      }
    };

    pingBackend();
  }, [])

  return (
    <div>
      {/* background */}
      <div className="fixed -z-1 inset-0 bg-cover bg-center bg-[url('@/assets/background.webp')]"></div>

      {/* loader */}
      {!isReady && <Loader />}

      {/* main UI */}
      {isReady && (
        <div>
          <Header />
          <div className='h-[calc(100vh-64px)] w-full px-2 sm:px-8 md:px-[6%]'>
            <div className='h-20 w-full'>
              <Hero />
            </div>
            <div className='h-[calc(100vh-144px)] w-full pt-2 pb-2 md:pb-4'>
              <SwitcherPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App