import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteNote, editNote } from '@/store/slices/noteSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function NoteDialog({ title, content, _id }) {
  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [titleVal, setTitleVal] = useState(title);
  const [contentVal, setContentVal] = useState(content);

  // Delete note handler
  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete('/api/v1/notes/delete', { params: { _id } });

      dispatch(deleteNote({ _id }));
      toast.success('Note is successfully deleted!!!');
      setDisplay(false);
    }
    catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong, please try again';
      console.error(error);
      toast.error(errMsg);
    }
    finally {
      setIsLoading(false);
    }
  }

  // Edit note handler
  const editNoteHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const payLoad = {
      _id: _id,
      title: formData.get('title'),
      content: formData.get('content'),
    }

    try {
      const { data } = await axios.put('/api/v1/notes/modify', payLoad);

      dispatch(editNote(data.data));
      toast.success('Note is successfully modified!!!');
      setEnableEdit(false);
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

      {/* Summary card */}
      <div className='w-full whitespace-nowrap border-4 border-mountain-2 bg-cream-4 rounded-lg cursor-pointer p-2'
        onClick={() => setDisplay(true)}>
        <h3 className='text-xl font-bold text-mountain-2 w-full truncate' >{title}</h3>
        <p className='font-medium w-full truncate'>{content}</p>
      </div>

      {/* Overlay */}
      {display && (
        <div className='fixed z-10 inset-0 blur-bg backdrop-blur-xs bg-mountain-1/47' />
      )}

      {/* View Note Modal */}
      {(display && !enableEdit) && (
        <div className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] h-10/12 pt-6 pb-3 px-3 border-6 border-mountain-2 rounded-2xl bg-cream-3 flex flex-col justify-center items-center'>

          {/* Close Button */}
          <div className='absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 border-6 border-mountain-2 bg-cream-6 rounded-xl' >
            <button
              className='h-11 w-11 relative flex items-center justify-center flex-col gap-1 cursor-pointer'
              onClick={() => setDisplay(false)}
            >
              <span className='absolute bg-cream-1 h-1.25 w-[74%] rounded-md rotate-45' ></span>
              <span className='absolute bg-cream-1 h-1.25 w-[74%] rounded-md -rotate-45' ></span>
            </button>
          </div>

          {/* Note Content */}
          <div className='w-full flex-1 border-4 border-cream-4 bg-cream-2 p-2 my-4 rounded-xl overflow-y-scroll scrollbar-none'>
            <h3 className='w-full text-center text-3xl font-black text-mountain-2 break-words'>{title}</h3>
            <hr className='border-t-2 w-full border-mountain-2 my-4' />
            <p className=' text-justify text-lg font-medium whitespace-pre-line'>{content}</p>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-center gap-4'>
            <button
              className='font-bold border-4 border-cream-6 bg-cream-5 text-mountain-2 text-lg cursor-pointer py-1 px-4 rounded-xl'
              onClick={() => setEnableEdit(true)}
            >Edit</button>

            <button
              type="submit"
              className='py-1 px-4 flex items-center justify-center gap-2 border-4 rounded-xl border-mountain-2 bg-cream-6 font-bold text-cream-1 text-lg cursor-pointer'
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin' />
                  Please wait...
                </>
              ) : ('Delete')}
            </button>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {(display && enableEdit) && (
        <div className='fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] sm:w-[456px] p-3 md:p-6 border-6 border-mountain-2 rounded-2xl bg-cream-3'>
          <h1 className='w-full text-center text-3xl font-black text-mountain-2'>Edit Note</h1>

          <form
            className='w-full flex flex-col gap-4 items-center pt-4'
            onSubmit={editNoteHandler}
          >

            {/* Title Input */}
            <textarea
              rows='1'
              placeholder='Enter title'
              className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl scrollbar-none'
              name="title"
              value={titleVal}
              onChange={(eve) => setTitleVal(eve.target.value)}
              required
            ></textarea>

            {/* Content Input */}
            <textarea
              rows='6'
              placeholder='Enter content'
              className='outline-none w-full font-semibold border-5 border-cream-4 bg-cream-2 py-2 px-4 rounded-xl scrollbar-none'
              name="content"
              value={contentVal}
              onChange={(eve) => setContentVal(eve.target.value)}
              required
            ></textarea>

            {/* Actions */}
            <div className='flex items-center justify-center gap-4'>
              <button
                type='button'
                className='font-bold border-4 border-cream-6 bg-cream-5 text-mountain-2 text-lg cursor-pointer py-1 px-4 rounded-xl'
                onClick={() => setEnableEdit(false)}
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

export default NoteDialog