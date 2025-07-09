import React from 'react'
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import notFound from '@/assets/notFound.webp'
import NoteDialog from './NoteDialog';

function ListNotes() {
  // Redux state: whether data is being loaded
  const { dataLoading } = useSelector((state) => state.dialogs);

  // Redux state: list of user notes
  const { noteList } = useSelector((state) => state.notes);

  // Show loader while data is being fetched
  if (dataLoading) {
    return (
      <div className='h-full w-full flex items-center justify-center flex-col gap-2'>
        <Loader2 className='animate-spin text-mountain-2 h-16 w-16' />
        <span className='text-xl font-black'>Please wait...</span>
      </div>
    )
  }

  // Show either notes or empty state
  return (
    (noteList.length === 0) ?
      <NoNotes /> :
      <DisplayNotes notes={noteList} />
  )
}

// Renders when no notes exist
function NoNotes() {
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
          No notes yet!
        </h3>
        <p className='text-sm sm:text-base font-medium mb-2 sm:mb-4'>
          You haven&apos;t added any notes. Start by creating one to capture your thoughts and ideas.
        </p>
      </div>
    </div>
  )
}

// Renders list of NoteDialog components
function DisplayNotes({ notes }) {
  return (
    <div className='w-full h-full p-2 md:p-3 lg:p-4 flex flex-col items-start justify-start gap-2 md:gap-3 lg:gap-4 overflow-y-scroll scrollbar-none'>
      {notes.map((note) => (
        <div
          key={note._id}
          className='w-full'
        >
          <NoteDialog
            title={note.title}
            content={note.content}
            _id={note._id}
          />
        </div>
      ))}
    </div>
  )
}

export default ListNotes