'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Getstartedbtn = () => {
  const router = useRouter();
  return (
    <div className='flex justify-center items-center mt-5'>
        <button className="btn btn-primary" onClick={() => router.push('/signin')}>Get started</button>

    </div>
  )
}

export default Getstartedbtn