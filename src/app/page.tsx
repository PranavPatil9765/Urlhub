import React from 'react'
import Getstartedbtn from '@/components/Getstartedbtn'
import Image from 'next/image'
import wallimage from '../../public/wallimage.png'
const page = () => {
  return (
    <div>
      <h1 className='text-5xl font-bold text-center mt-6 '>
        Wellcome to <span className='text-blue-500  underline'>URL Hub </span> 
        <br />
      </h1>
      <div className='flex justify-center items-center md:flex-row flex-col-reverse gap-5 p-5'>
        <div className='flex flex-col justify-center items-center width-full md:w-2xl'>
          <h1 className='text-2xl font-bold text-center mt-5'> <span className='text-cyan-400'>Welcome to URLHub</span>, your one-stop solution for managing URLs efficiently. Whether you need to <span className='text-cyan-400'>
          shorten links, generate QR codes, track analytics, or store URLs securely
            </span> , URLHub makes it effortless
          </h1>
          <p className='text-lg text-center mt-5'>It is a simple and easy to use tool that helps you to shorten your long URLs and share them with your friends and family.</p>
          <p className='text-lg text-center mt-5'>You can also track the number of clicks on your shortened URLs.</p>
          
          </div>
        <div>
          <Image src={wallimage} alt='url hub' width={500} height={500} className='w-96 h-96'/>
        </div>

      </div>
      <Getstartedbtn/>
    </div>
  )
}

export default page