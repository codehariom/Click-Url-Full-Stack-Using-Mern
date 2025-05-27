import React from 'react'
import { Link,  useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

function Card() {
      const navigate = useNavigate();
  return (
    <div className=' space-y-15'>
        <div className=' flex flex-wrap gap-10 columns-2'>
            <div className='bg-black text-white rounded-[6px]  place-items-center border border-gray-600 px-40  py-5 text-center space-y-2 '>
                <h2 className='text-2xl'>Total Links</h2>
                <p className='text-3xl font-bold'>25</p>
            </div>
            <div className='bg-black text-white text-3xl rounded-[6px] border border-gray-600 px-40 py-5 text-center space-y-2'>
                <h2 className='text-2xl'>Total Views</h2>
                <p className='text-3xl font-bold'>250</p>
            </div>
            
        </div>

        <div className='bg-black text-white w-fit items-center rounded-[6px] cursor-auto border border-gray-600 px-17 py-4'>
              <Link to="/short-url"><button  onClick={()=> navigate("/short-url")} className='text-3xl flex items-center gap-10 place-item-center '> Create New URL <FaPlusCircle /></button></Link>
              
        </div>
    </div>
  )
}

export default Card