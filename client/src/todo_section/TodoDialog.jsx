import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '@/store/slices/todoSlice';
import { Check, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function TodoDialog({ isDone, content, _id }) {
  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [contentVal, setContentVal] = useState(content);

  // DELETE handler
  const handleDelete = async () => {
    setIsLoading(true);
    setIsDeleteLoading(true);

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/delete`, { params: { _id } });

      dispatch(deleteTodo({ _id }));
      toast.success('Todo is successfully deleted!!!');
      setDisplay(false);
    }
    catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong, please try again';
      console.error(error);
      toast.error(errMsg);
    }
    finally {
      setIsLoading(false);
      setIsDeleteLoading(false);
    }
  }

  // TOGGLE isDone handler
  const doneHandler = async () => {
    setIsLoading(true);

    const payLoad = {
      _id: _id,
      isDone: !isDone,
      content: content,
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/modify`, payLoad);

      dispatch(editTodo(data.data));
      toast.success('Todo is successfully modified!!!');
      setDisplay(false);
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

  // EDIT content handler
  const editTodoHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const payLoad = {
      _id: _id,
      isDone: isDone,
      content: formData.get('content'),
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/modify`, payLoad);

      dispatch(editTodo(data.data));
      toast.success('Todo is successfully modified!!!');
      setDisplay(false);
      event.target.reset();
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
      {/* Todo Card */}
      <div className={`w-full border-4 border-mountain-2 bg-cream-4 rounded-lg flex items-center gap-2 sm:gap-3 p-2 sm:p-3 overflow-hidden 
        ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>

        {/* isDone toggle button */}
        <button
          className='w-8 h-full flex items-center justify-center'
          onClick={doneHandler}
        >
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <div className='h-6 w-6 border-2 border-mountain-2 bg-cream-6 rounded-md flex items-center justify-center p-0.5'>
              {isDone ? <Check strokeWidth={3} className='text-cream-1' /> : ''}
            </div>
          )}
        </button>

        {/* Content preview */}
        <div className='flex-1 h-full'>
          <p
            className='h-full w-full font-medium break-words text-left break-all cursor-pointer'
            onClick={() => setDisplay(true)}>{content}</p>
        </div>

        {/* Delete button */}
        <button
          className='h-full aspect-square border-3 border-cream-6 bg-cream-5 text-mountain-2 rounded-md flex items-center justify-center p-1 cursor-pointer'
          onClick={handleDelete}
        >
          {isDeleteLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <Trash2 strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Backdrop */}
      {display && (
        <div className='fixed z-10 inset-0 blur-bg backdrop-blur-xs bg-mountain-1/47' />
      )}

      {/* Edit Modal */}
      {display && (
        <div className='fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] p-3 md:p-6 border-6 border-mountain-2 rounded-2xl bg-cream-3'>
          <h1 className='w-full text-center text-3xl font-black text-mountain-2'>Edit Todo</h1>

          <form
            className='w-full flex flex-col gap-4 items-center pt-4'
            onSubmit={editTodoHandler}
          >
            {/* Content editor */}
            <textarea
              rows='2'
              placeholder='Enter content'
              className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl scrollbar-none'
              name="content"
              value={contentVal}
              onChange={(eve) => setContentVal(eve.target.value)}
              required
            ></textarea>

            {/* Buttons */}
            <div className='flex items-center justify-center gap-4'>
              <button
                type='button'
                className='font-bold border-4 border-cream-6 bg-cream-5 text-mountain-2 text-lg cursor-pointer py-1 px-4 rounded-xl'
                onClick={() => setDisplay(false)}
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
                ) : ('Save')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default TodoDialog