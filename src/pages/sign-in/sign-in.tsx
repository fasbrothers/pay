import React from 'react'
import logo from '../../assets/logo.svg'

export default function SignIn() {
  return (
    <div className='w-1/2'>
      <div className="flex flex-col justify-center items-center h-screen">
        <div>
          <img src={logo} alt="" />
        </div>
        <h2 className=" text-lg font-medium">
          Sign Up
        </h2>
        <button className="bg-white text-black px-4 py-2 rounded-md mt-4">
          Sign In
        </button>
      </div>
    </div>
  )
}
