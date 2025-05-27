import React from 'react'
import { FaLink } from "react-icons/fa";

import { Link,  useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <> 

    <div className=' justify-center text-center p-5 mt-5 h-full '>
        <div className='pt-10 pb-10'>
            <h1 className=' text-6xl font-medium'>Shorten Your First Link Now – It’s Free!</h1>
            <p className=' mt-5 text-2xl text-gray-500'>Start Shortening, Tracking, and Optimizing Links Instantly</p>
        </div>
        <div className=' py-3 justify-center text-center '>
            <p className=' sm:mx-[200px] mx-5 flex-wrap text-wrap'>Shorten long, complicated URLs into clean, custom links with our powerful URL shortener tool. Perfect for marketers, creators, and businesses, our platform lets you create short links,  generate QR codes, and boost your click-through rates — all in just a few seconds.Whether you're sharing links on social media, email, or print, we've got you covered with smart, secure, and scalable link management.</p>
        </div>
        <div className=' flex justify-center text-center my-[50px] '>
        <Link to="/login"><button onClick={()=> navigate("/login")} className='  px-5 py-2 text-2xl flex rounded-[6px] bg-black content-center gap-5 items-center text-white hover:bg-white hover:text-black hover:border-2 hover:border-black'>  Get Started <FaLink/> </button> </Link>
        </div>
    </div> 
  </>
    
  )
}

export default Home