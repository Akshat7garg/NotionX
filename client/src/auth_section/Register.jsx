import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { closeDialog, openDialog } from '@/store/slices/dialogSlice';
import { loginUser } from '@/store/slices/userSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function Register() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Switch from register to login dialog
  const openLoginDialog = () => {
    dispatch(closeDialog('register'));
    dispatch(openDialog('login'));
  }

  // Handle registration form submit
  const registerHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const verifyPassword = formData.get('verifyPassword');

    // Password match validation
    if (password !== verifyPassword) {
      toast.error("Your passwords didn't match. Please try again.");
      setIsLoading(false);
      return;
    }

    const payload = { name, email, password };

    try {
      const { data } = await axios.post('/api/v1/user/register', payload);

      toast.success(data.message);
      localStorage.setItem('userDetails', JSON.stringify(data.data));

      dispatch(loginUser(data.data));
      event.target.reset();
      dispatch(closeDialog('register'));
    }
    catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong, please try again!!!';
      console.error(errMsg);
      toast.error(errMsg);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] p-6 border-6 border-mountain-2 rounded-2xl bg-cream-3'>

      {/* Close button */}
      <div className='absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 border-6 border-mountain-2 bg-cream-6 rounded-xl' >
        <button
          className='h-11 w-11 relative flex items-center justify-center flex-col gap-1 cursor-pointer'
          onClick={() => dispatch(closeDialog('register'))}
        >
          <span className='absolute bg-cream-1 h-1.25 w-[74%] rounded-md rotate-45' ></span>
          <span className='absolute bg-cream-1 h-1.25 w-[74%] rounded-md -rotate-45' ></span>
        </button>
      </div>

      {/* Heading */}
      <h1 className='w-full text-center text-3xl font-black text-mountain-2'>Join NotionX</h1>
      <p className='w-full text-center text-lg font-medium'>Create your account to start organizing!</p>

      {/* Register form */}
      <form
        className='w-full flex flex-col gap-4 items-center pt-4'
        onSubmit={registerHandler}
      >
        <input
          type="text"
          name='name'
          placeholder='Enter your name'
          required
          className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl'
        />
        <input
          type="email"
          name='email'
          placeholder='Enter you email'
          required
          className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl'
        />
        <input
          type="password"
          name='password'
          placeholder='Create password'
          required
          className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl'
        />
        <input
          type="password"
          name='verifyPassword'
          placeholder='Confirm password'
          required
          className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl'
        />
        <button
          type="submit"
          className='w-full flex items-center justify-center gap-2 font-bold border-5 border-cream-6 bg-cream-5 text-mountain-2 text-lg cursor-pointer py-2 px-4 rounded-xl'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
              Please wait...
            </>
          ) : ('Create account')}
        </button>
      </form>

      {/* Switch to login */}
      <p className='w-full text-center font-medium mt-4'>
        Already have an account?{' '}
        <button
          className='text-cream-6 font-bold cursor-pointer hover:underline'
          onClick={openLoginDialog}
        >
          Sign in here
        </button>
      </p>
    </div>
  )
}

export default Register