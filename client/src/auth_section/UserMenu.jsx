import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/slices/userSlice';
import { closeDialog, openDialog } from '@/store/slices/dialogSlice';
import { addNote, clearNotes } from '@/store/slices/noteSlice';
import { addTodo, clearTodos } from '@/store/slices/todoSlice';
import { toast } from 'sonner';
import profile from '@/assets/profile.webp'

function UserMenu() {
  const dispatch = useDispatch();

  // UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get user states from Redux
  const { userData } = useSelector((state) => state.user);

  // Fetch user notes and todos from database on mount
  useEffect(() => {
    const fetchNoteList = async () => {
      dispatch(openDialog('dataLoading'));

      try {
        const [notesResponse, todosResponse] = await Promise.all([
          axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/notes/fetch`, { owner: userData?.email }),
          axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/fetch`, { owner: userData?.email }),
        ])

        notesResponse.data.data.map((note) => dispatch(addNote(note)));
        todosResponse.data.data.map((todo) => dispatch(addTodo(todo)));

        if (notesResponse.data.statusCode === 200 && todosResponse.data.statusCode === 200) {
          toast.success('Connected with database successfully!!!');
        }
        else {
          dispatch(clearNotes());
          dispatch(clearTodos());
          toast.error('Something went wrong, please try again!!!');
        }
      }
      catch (error) {
        const errMsg = error.response?.data?.message || 'Something went wrong, please try again!!!';
        console.error(errMsg);
        toast.error(errMsg);
      }
      finally {
        dispatch(closeDialog('dataLoading'));
      }
    }

    fetchNoteList();
  }, [userData?.email]);

  // Toggle logout confirmation dialog
  const openDialogBox = () => {
    setIsMenuOpen(false);
    setIsDialogOpen(true);
  }

  // Clear user session
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(clearNotes());
    dispatch(clearTodos());
    dispatch(logoutUser());

    setIsDialogOpen(false);
    toast.success('You are logged out successfully!!!');
  }

  return (
    <div>
      {/* Profile Icon */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='h-12 w-12 flex items-center justify-center overflow-hidden rounded-full cursor-pointer border-4 border-mountain-2'
      >
        <img
          src={profile}
          alt={userData?.name || 'Guest'}
          className='h-8'
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-5 top-16 right-4 border-4 border-mountain-2 bg-cream-4 rounded-xl py-1.5 px-6 font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-[0px_0px_32px_#FFAA38,_0px_0px_16px_#FFAA38] transition-all duration-300 ease-in-out 
          ${(isMenuOpen) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <p>{userData?.name || 'Guest'}</p>
        <p className='text-2xl font-black text-mountain-2'>•</p>
        <button
          className='cursor-pointer transition-all duration-300 ease-in-out hover:text-mountain-2'
          onClick={openDialogBox}
        >
          Logout
        </button>
      </div>

      {/* Overlay (when confirmation dialog is open) */}
      {isDialogOpen && (
        <div
          className='fixed z-10 inset-0 blur-bg backdrop-blur-xs bg-mountain-1/47'
          onClick={() => setIsDialogOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      {isDialogOpen && (
        <div className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] p-6 border-6 border-mountain-2 rounded-2xl bg-cream-3'>

          {/* Heading */}
          <h1 className='w-full text-center text-2xl font-black text-mountain-2'>Are you sure?</h1>
          <p className='w-full text-center font-medium'>
            Logging out will close your workspace. Save changes now or sign in again to continue later.
          </p>

          {/* Action buttons */}
          <div className='flex items-center justify-center gap-4 mt-4'>
            <button
              className='py-1.5 px-6 border-4 border-cream-6 bg-cream-5 text-mountain-2 font-bold text-lg rounded-xl cursor-pointer'
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className='py-1.5 px-6 border-4 border-mountain-2 bg-cream-6 text-cream-1 font-bold text-lg rounded-xl cursor-pointer'
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu