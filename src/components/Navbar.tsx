"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import urllogo from '../../public/urllogo.jpg'
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm  sticky top-0 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link href= '/myurls'>
        <button>Myurls</button>
        </Link>
        </li>
        <li><Link href= '/dashboard'>
        <button>Shorten Url</button>
        </Link>
        </li>
        <li><Link href= '/analytics'>
        <button>Analytics</button>
        </Link>
        </li>
        
       
      </ul>
    </div>
    <Link href= '/'>
        <button className="btn btn-ghost normal-case text-xl ">
          
        <Image src={urllogo} alt="url hub" width={50} height={50} className='w-10 h-10 rounded-full inline ml-3' />
          Url Hub</button>
        </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link href= '/myurls'>
        <button>Myurls</button>
        </Link>
        </li>
    <li><Link href= '/analytics'>
        <button>analytics</button>
        </Link>
        </li>
   
        <li><Link href= '/dashboard'>
        <button>Create Url</button>
        </Link>
        </li>
    </ul>
  </div>
  <div className="navbar-end">
      <button className="text-white mr-3  btn-ghost btn rounded-2xl font-sans text-2xl" onClick={() => signOut()}>Sign out</button>
  </div>
</div>
  )
}

export default Navbar