import React from 'react'
import { useSelector } from 'react-redux';
import notFound from '@/assets/notFound.webp'
import { Loader2 } from 'lucide-react';
import TodoDialog from './TodoDialog';

function ListTodos() {
  // Redux state: whether data is being loaded
  const { dataLoading } = useSelector((state) => state.dialogs);

  // Redux state: list of user todos
  const { todoList } = useSelector((state) => state.todos);

  // Show loading spinner while data is being fetched
  if (dataLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center flex-col gap-2'>
        <Loader2 className='animate-spin text-mountain-2 h-16 w-16' />
        <span className='text-xl font-black'>Please wait...</span>
      </div>
    )
  }

  // Show "No todos" message if list is empty, otherwise display todos
  return (
    (todoList.length === 0) ?
      <NoTodos /> :
      <DisplayTodos todos={todoList} />
  )
}

// Component shown when no todos exist
function NoTodos() {
  return (
    <div className='h-full w-full'>
      <div className='h-full w-full flex flex-col items-center justify-center p-3 text-center'>
        <img
          src={notFound}
          alt="No_Login"
          className='h-32 sm:h-40'
          loading='lazy'
        />
        <h3 className='text-xl sm:text-2xl font-black text-mountain-2'>
          No todos yet!
        </h3>
        <p className='text-sm sm:text-base font-medium mb-2 sm:mb-4'>
          You haven&apos;t added any todos. Start by creating one to capture your thoughts and ideas.
        </p>
      </div>
    </div>
  )
}

// Component to display all todos using the TodoDialog component
function DisplayTodos({ todos }) {
  return (
    <div className='w-full h-full p-2 md:p-3 lg:p-4 flex flex-col items-start justify-start gap-2 md:gap-3 lg:gap-4 overflow-y-scroll scrollbar-none'>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className='w-full'
        >
          <TodoDialog
            isDone={todo.isDone}
            content={todo.content}
            _id={todo._id}
          />
        </div>
      ))}
    </div>
  )
}

export default ListTodos