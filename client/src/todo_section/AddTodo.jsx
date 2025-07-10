import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '@/store/slices/todoSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function AddTodo() {
  const dispatch = useDispatch();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get useData from redux
  const { userData } = useSelector((state) => state.user);

  // Form submit handler to add new todo
  const addNewtodo = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const payLoad = {
      owner: userData.email,
      content: formData.get('content')
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/create`, payLoad);

      dispatch(addTodo(data.data));
      toast.success('Todo is successfully created!!!');
      event.target.reset();
      setIsOpenDialog(false);
    }
    catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong, please try again';
      console.error(errMsg);
      toast.error(errMsg);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Button to open the add-todo dialog */}
      <button
        className='h-12 w-12 flex items-center justify-center rounded-xl border-4 border-mountain-2 bg-cream-6 text-5xl font-semibold text-cream-1 cursor-pointer'
        onClick={() => setIsOpenDialog(true)}
      >+</button>

      {/* Dark transparent background overlay */}
      {isOpenDialog && (
        <div className='fixed z-10 inset-0 blur-bg backdrop-blur-xs bg-mountain-1/47' />
      )}

      {/* Modal Dialog for adding a new todo */}
      {isOpenDialog && (
        <div className='fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] p-3 md:p-6 border-6 border-mountain-2 rounded-2xl bg-cream-3'>
          <h1 className='w-full text-center text-3xl font-black text-mountain-2'>Add Todo</h1>

          <form
            className='w-full flex flex-col gap-4 items-center pt-4'
            onSubmit={addNewtodo}
          >
            {/* Content input */}
            <textarea
              rows='2'
              placeholder='Enter Todo'
              className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl'
              name="content"
              required
            ></textarea>

            {/* Action buttons */}
            <div className='flex items-center justify-center gap-4'>
              <button
                type='button'
                className='font-bold border-4 border-cream-6 bg-cream-5 text-mountain-2 text-lg cursor-pointer py-1 px-4 rounded-xl'
                onClick={() => setIsOpenDialog(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className='py-1 px-4 flex items-center justify-center gap-2 border-4 rounded-xl border-mountain-2 bg-cream-6 font-bold text-cream-1 text-lg cursor-pointer'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='animate-spin' />
                    Please wait...
                  </>
                ) : ('Add Todo')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AddTodo