import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link,  useNavigate } from "react-router-dom";



export default function Error404() {
    const navigate = useNavigate()
  return (

    <>
    

        <div className=' grid place-content-center h-dvh space-y-5 text-center '>
            <div>
                <h1 className='text-9xl font-semibold m-5 mb-10'> 404 Error</h1>
                <p  className=' text-5xl text-gray-400 '>OPPS! Can't Find Your Page</p>
            </div>
            <div className=' place-content-center justify-self-center content-center'>
                <Link to="/">
                    <button className='px-5 py-2 m-5 text-2xl flex rounded-[6px] bg-black content-center gap-5 items-center text-white hover:bg-white hover:text-black hover:border-2 hover:border-black' onClick={()=> navigate()}> <FaArrowLeftLong/>Back to Home </button>
                </Link>
            </div>
        </div>
    </>
    
  )
}
