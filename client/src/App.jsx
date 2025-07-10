import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from './store/slices/userSlice'
import Loader from './landing_section/Loader'
import Header from './landing_section/Header'
import Hero from './landing_section/Hero'
import SwitcherPanel from './landing_section/SwitcherPanel'

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

    const BACKEND_PING_URL = `${import.meta.env.VITE_BACKEND_URL}/api/pign`;
    const RENDER_DEPLOY_HOOK_URL = import.meta.env.VITE_BACKEND_DEPLOY_HOOK;

    // trigger Render deploy
    const silentlyTriggerDeploy = () => {
      fetch(RENDER_DEPLOY_HOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
      });
    };

    const checkBackend = async () => {
      try {
        console.log('Pinging backend...');
        await axios.get(BACKEND_PING_URL, { timeout: 10000 });

        console.log('Backend is up now...');
        setIsReady(true);
      } 
      catch (pingErr) {
        console.warn('Backend not responding within 10 sec:', pingErr.message);
        console.log('Triggering backend wake-up silently...');

        silentlyTriggerDeploy();
        console.log('Waiting 90 seconds before retrying ping...');
        
        setTimeout(async () => {
          try {
            console.log('Retrying backend ping...');
            await axios.get(BACKEND_PING_URL, { timeout: 10000 });

            console.log('Backend is now up...');
            setIsReady(true);
          } 
          catch (finalErr) {
            console.error('Backend still down after retry. Reloading page...');
            window.location.reload();
          }
        }, 90000); // 90s wait
      }
    };

    checkBackend();
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