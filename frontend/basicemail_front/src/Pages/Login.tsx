import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import logo from '../Icons/logo.svg'
import { userContext } from '../Contexts/UserContext'
import { useContext } from 'react'
import { getUser, postUser, getPicture } from '../api'

interface ProfileProps {
    "author": string;
    "download_url": string;
    "height": number;
    "id": string;
    "url": string;
    "width": number;
}

export default function Login() {
    const [isRegistration, setIsRegistration] = React.useState(false);
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    
    const { setActualUser } = useContext(userContext);

    const onSubmit = handleSubmit(
        async data => {
            try {
                if (isRegistration) {
                    const profileObject: ProfileProps = await getPicture().then((data) => data.data[Math.floor(Math.random() * 30)]);
                    await postUser(data.fullname, data.email, data.password, profileObject.download_url);
                    setActualUser({"email": data.email, "name": data.fullname, "picture": profileObject.download_url})
                    localStorage.setItem('user', JSON.stringify({"email": data.email, "name": data.fullname, "picture": profileObject.download_url}));
                } else {
                    const userPromise: any = await getUser(data.email, data.password);
                    const userInfo: any = userPromise.data.user;
                    console.log(userInfo)
                    setActualUser({"email": userInfo.email, "name": userInfo.name, "picture": userInfo.photo_profile})
                    localStorage.setItem('user', JSON.stringify({"email": userInfo.email, "name": userInfo.name, "picture": userInfo.photo_profile}));
                }
                navigate('/')
            } catch (error) {
                alert('Invalid credentials')
            }
        }
    )

    return (
        <div className="h-screen md:flex">
            <div
                className="relative overflow-hidden md:flex w-1/3 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="text-white font-bold text-4xl font-sans">SwiftMail</h1>
                    <p className="text-white mt-1">The swiftest email service</p>
                    <img className='mt-4 bg-white rounded-xl p-4' src={logo} alt="" />
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex flex-col md:w-2/3 justify-center py-10 items-start pl-24 bg-white">
                <form onSubmit={onSubmit} className="bg-white">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ${isRegistration ? 'block' : 'hidden'} animate-[leftappear_0.5s] transition`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd" />
                        </svg>
                        <input {...register("fullname")} name="fullname" className='pl-2 outline-none border-none animate-[leftappear_0.8s] transition' type="text" placeholder="Full name" required={isRegistration ? true : false} />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 focus:border-[#A459E1]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input {...register("email")} name="email" className="pl-2 outline-none focus:border-[#A459E1]" type="text" placeholder="Email Address" required />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl focus:border-[#A459E1]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input {...register("password")} name="password" className="pl-2 outline-none border-none" type="password" placeholder="Password" />
                    </div>
                    <button id='login-button' className="block w-full bg-[#182468] hover:bg-[#5858B9] transition mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                </form>
                <button onClick={() => { setIsRegistration(true); }} className={`text-sm text-[#182468] transition hover:text-[#5858B9] ${isRegistration ? 'hidden' : 'block'}`}>Don't have an account?</button>
            </div>
        </div>
    )
}
