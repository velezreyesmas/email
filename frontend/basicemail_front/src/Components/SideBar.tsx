import React, { useContext, useEffect } from 'react'
import InboxIcon from '../Icons/InboxIcon'
import ComposeIcon from '../Icons/ComposeIcon'
import logo from '../Icons/logo.svg';
import { ActualViewContext } from '../Contexts/ViewContext';
import { userContext } from '../Contexts/UserContext';
import LogoutIcon from '../Icons/LogoutIcon';
import { useNavigate } from 'react-router-dom';

function SideBar() {

  const { actualView, setActualView } = useContext(ActualViewContext);
  const { actualUser, setActualUser } = useContext(userContext);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(actualUser);
  }, []);

  return (
    <section className='
      w-1/3 
      h-full
      rounded-xl
      backdrop-blur bg-white/30
      border border-white
      p-6'>
        <div className='h-[90%]'>
          <button className='bg-white flex gap-2 rounded-2xl mb-[42px] px-3 py-2 items-center w-full'>
            <img className='h-[50px] w-[50px] rounded-full' src={actualUser.picture} alt="profile picture" />
            <p className='text-base'>{actualUser.name}</p>
          </button>

          <div className='gap-2 flex flex-col'>
            <button onClick={() => setActualView("Inbox")} className={`gap-2 flex ${actualView === "Inbox" ? 'bg-[#5858B9] text-white' : 'bg-white hover:bg-[#dedede]'} rounded-lg px-3 items-center transition active:bg-[#5858B9]`}>
              <InboxIcon/>
              <p className='text-base'>Inbox</p>
            </button>
            <button onClick={() => setActualView("Compose")} className={`gap-2 flex ${actualView === "Compose" ? 'bg-[#5858B9] text-white' : 'bg-white hover:bg-[#dedede]'} rounded-lg px-3 items-center transition active:bg-[#5858B9]`}>
              <ComposeIcon/>
              <p className='text-base'>Compose</p>
            </button>
            <hr className='my-4' />
            <button onClick={() => {setActualUser({"email": "no-selected@swiftmail.com", "name": "no-name", "picture": 'no-picure'}); navigate("/login")}} className={`gap-2 flex bg-white hover:bg-[#dedede] rounded-lg px-3 items-center transition active:bg-[#5858B9] active:text-white px-3`}>
              <LogoutIcon/>
              <p className='text-base'>Logout</p>
            </button>
          </div>
        </div>

        <div className='h-[10%] flex flex-col justify-between'>
          <hr />
          <div className='gap-2 flex bg-white rounded-xl px-3 py-2 items-center'>
              <img className='h-[34px]' src={logo} alt="logo" />
              <p className='text-base'>SwiftMail</p>
          </div>
        </div>
        

    </section>
  )
}

export default SideBar