import React from 'react'
import Message from './Message'
import {postEmail} from '../api'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ActualViewContext } from '../Contexts/ViewContext'

export default function ComposeView() {

  const { setActualView } = useContext(ActualViewContext) 

  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit(
    async data => {
      try {
        await postEmail(data.subject, data.email, data.body)
        alert('Email sent')
        setActualView('Inbox')
      } catch (error) {
        console.error('Failed to send email', error)
      }
    }
  )


  return (
    <section className='
    w-2/3 
    h-full
    rounded-xl
    backdrop-blur bg-white/30
    border border-white
    p-6 gap-2
    flex'>
        <form onSubmit={onSubmit}  className='w-full h-full flex flex-col gap-2 animate-[fadein_0.5s]'>
            <input {...register("subject")} name='subject'  placeholder='Subject...' className='h-[8%] font-semibold bg-white text-xl py-2 px-1 rounded-lg'/>
            <input {...register("email")} name='email' placeholder='Email...' type='email' className='h-[12%] bg-white text-xl py-2 px-1 rounded-lg gap-2 flex'/>
            <textarea {...register("body")} name='body' placeholder='Body...' className='h-[75%] bg-white py-2 px-1 rounded-lg gap-2 flex'/>
            <button className='h-[5%] w-fit px-4 bg-white rounded-md hover:bg-[#5858B9] hover:text-white transition'>Sumbit</button>
        </form>
    </section>
  )
}
