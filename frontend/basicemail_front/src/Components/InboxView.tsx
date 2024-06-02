import { useState, useEffect, useContext } from 'react'
import Message from './Message'
import { getEmails, getPicture } from '../api';
import { selectedEmailContext } from '../Contexts/SelectedEmailContext';
import { userContext } from '../Contexts/UserContext';
import EmailIcon from '../Icons/EmailIcon';

export default function InboxView() {

    const [emails, setEmails] = useState([]);
    const { actualEmail } = useContext(selectedEmailContext);
    const { actualUser } = useContext(userContext);

    async function getEmailsEffect() {
        console.log("ACTUAL USER EMAIL: " + actualUser.email)
        const data = await getEmails(actualUser.email);
        setEmails(data.data);
    }

    useEffect(() => {
        getEmailsEffect();
    }, []);

    return (
        <section className='
        w-2/3 
        h-full
        rounded-xl
        backdrop-blur bg-white/30
        border border-white
        p-6 gap-2
        flex'>
            <div className='w-1/3 h-full gap-5 flex flex-col items-center text-white'>
                {emails.map((actualEmail: any) => {
                    return (
                        <div className='gap-5 items-center flex flex-col'>
                            <Message {...actualEmail} />
                            <hr className='w-3/4 animate-[fadein_0.5s]' />
                        </div>
                    );
                })} 
            </div>

            {actualEmail.subject == "no-selected" ? (
                <div className='bg-white w-2/3 h-full rounded-xl flex flex-col items-center place-content-center animate-[fadein_0.5s]'>
                    <EmailIcon />
                    <h1 className='font-bold text-xl'>Seleccione un elemento para leerlo</h1>
                    <p>No hay nada seleccionado</p>

                </div>
            ) : (
                <div className='w-2/3 h-full flex flex-col gap-2'>
                    <h1 className='animate-[fadein_0.5s] h-[8%] font-semibold bg-white text-xl py-2 px-1 rounded-lg'>{actualEmail.subject}</h1>

                    <div className=' animate-[fadein_0.5s] h-[12%] bg-white text-xl py-2 px-1 rounded-lg gap-2 flex'>
                        <img className='h-11 w-11 rounded-full' src={actualEmail.sender_photo} alt="profile picture" />
                        <div className='animate-[fadein_0.5s]'>
                            <h1>{actualEmail.sender_name} | <span className='text-xs'>{actualEmail.sender_email}</span></h1>
                            <p className='text-xs'>{actualEmail.timestamp}</p>
                        </div>
                    </div>

                    <div className='animate-[fadein_0.5s] h-[80%] bg-white py-2 px-1 rounded-lg gap-2 flex'>
                        {actualEmail.body}
                    </div>
                </div>
            )}


        </section>
    )
}
