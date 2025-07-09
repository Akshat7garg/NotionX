import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import NoAuth from '@/auth_section/NoAuth';
import AddNote from '@/note_section/AddNote';
import ListNotes from '@/note_section/ListNotes';
import AddTodo from '@/todo_section/AddTodo';
import ListTodos from '@/todo_section/ListTodos';

function SwitcherPanel() {
  // State to toggle between Notes and Todos
  const [isNotes, setIsNotes] = useState(true);

  // Check if the user is authenticated
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <div className='h-full w-full border-6 border-mountain-2 bg-cream-3 rounded-2xl flex flex-col items-center justify-start p-2 md:p-3 lg:p-4 gap-2 md:gap-3 lg:gap-4'>

      {/* Toggle buttons for switching between Notes and Todos */}
      <div className='w-full flex items-center justify-between'>
        <div className='relative flex items-center justify-center w-fit h-fit border-5 border-cream-4 bg-cream-2 rounded-xl overflow-hidden'>

          {/* Sliding indicator background */}
          <div
            className={`absolute z-1 border-5 border-cream-6 bg-cream-5 w-[50%] h-full rounded-md transition-all duration-300 ease-in-out 
            ${isNotes ? 'left-0' : 'left-1/2'}`}
          ></div>

          {/* Notes Button */}
          <button
            onClick={() => setIsNotes(true)}
            className='py-1.5 px-6 text-lg font-black cursor-pointer relative z-2'
          >
            Notes
          </button>

          {/* Todos Button */}
          <button
            onClick={() => setIsNotes(false)}
            className='py-1.5 px-6 text-lg font-black cursor-pointer relative z-2'
          >
            Todos
          </button>
        </div>

        {/* Show note input form if 'Notes' tab is active, else show todo input form */}
        {isLogged ? (
          isNotes ? <AddNote /> : <AddTodo />
        ) : ''}
      </div>

      {/* Main content area: shows notes/todos or auth prompt */}
      <div className='flex-1 w-full border-4 border-cream-4 bg-cream-2 rounded-xl overflow-hidden'>
        {isLogged ? (
          isNotes ? <ListNotes /> : <ListTodos />
        ) : (
          <NoAuth />
        )}
      </div>
    </div>
  )
}

export default SwitcherPanel