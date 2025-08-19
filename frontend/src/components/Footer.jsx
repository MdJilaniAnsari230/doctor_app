import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 tetxt-sm '>
            {/* {-----  left -------} */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                    CuraLink is a smart, user-friendly doctor appointment platform designed to simplify healthcare access for patients and providers alike. Whether you’re booking a routine checkup or consulting a specialist, CuraLink offers seamless scheduling, real-time availability, and secure communication — all in one place.
                </p>
            </div>
            {/* {-----  center -------} */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-500'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/* {-----  right -------} */}
            <div>
                <p className='text-xl font-medium mb-5'>
                    GET IN TOUCH
                </p>
                <ul className='flex flex-col gap-2 text-gray-500'>
                    <li>+91 6204857123</li>
                <li>jilaniansari009@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* --- copyright ----- */}
        <div className='py-5 text-sm text-center '>

            <hr />
            <p>Copyright CuraLink 2025 @CuraLink. All right reserved.</p>

        </div>
    </div>
  )
}

export default Footer