import React, { Attributes, useEffect } from 'react'
import { useContext } from 'react';
import { selectedEmailContext } from '../Contexts/SelectedEmailContext';


interface MessageProps {
  sender_id: string,
  sender_name: string,
  sender_email: string;
  sender_photo: string
  subject: string;
  body: string;
  timestamp: string;
}

export default function Message({sender_id, sender_name, sender_email, sender_photo, subject, body, timestamp}: MessageProps) {

  const [isSelected, setIsSelected] = React.useState(false);
  const { actualEmail, setActualEmail } = useContext(selectedEmailContext);

  function clickHandler() {
    setActualEmail({sender_id, sender_name, sender_email, sender_photo, subject, body, timestamp});
  }

  useEffect(() => {
    if (actualEmail.subject == subject) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [actualEmail]);

  return (
    <button onClick={() => clickHandler()} className={`w-full flex items-left gap-2 animate-[leftappear_0.5s] transition p-3 rounded-xl ${isSelected ? 'bg-[#5858B9] hover:bg-[#5858B9]': 'bg-transparent hover:bg-[#dedede] hover:text-black'}`}>
        <img className='h-11 w-11 rounded-full' src={sender_photo} alt="profile picture" />
        <div className='text-center'>
            <h1 className='text-base font-bold text-left'>{sender_name}</h1>
            <span className='text-[10px] font-normal'>{timestamp}</span>
            <p className='text-sm text-left'>{subject}</p>
        </div>
    </button>
  )
}
