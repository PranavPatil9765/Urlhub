"use client"
import QRCodeGenerator from '@/components/qrgenerator';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import List from '../../components/List';
import { toast,ToastContainer } from 'react-toastify';
const myurls = () => {
    const router = useRouter(); // Initialize router
    const { data: session } = useSession(); // Use session to check authentication
    const [page, setPage] = useState(1);
    const [urls, setUrls] = useState([]);
    const [carddisplay, setCardDisplay] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    async function geturls(){
      try {
        
      
        setLoading(true);
        const res = await fetch("/api/geturls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({page: page})
        });
        const data = await res.json();
        if (res.status === 200) {
            setUrls(data);
        }
        } catch (error) {
        
      }
        setLoading(false);

    }
    useEffect(()=>{
      if(!session){
        router.push("/signin"); // Redirect to sign-in page if not authenticated
        return;
      }
        geturls();
    },[page,session])

     const handleDeleteUrl = (shortUrl: string) => {
    setUrls(prev => prev.filter((url: { shortUrl: string }) => url.shortUrl !== shortUrl));
    // toast.success("URL deleted successfully");
  };

    


  return (
    <div className='md:w-[80%] flex flex-col justify-center items-center m-auto mt-20  w-[90%]'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

   

    {
      urls.map((url,ind)=>{
        return(
          
          <List key={ind} url={url} Delete={handleDeleteUrl} />
          
        )
      })
    }




  <div className="text-center mt-4">Page: {page}</div>
<div className="max-w-2xl mx-auto flex justify-center items-center p-4">
  <div className="join grid grid-cols-2 gap-4">
    <button className="join-item btn btn-outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous page</button>
    <button className="join-item btn btn-outline" onClick={() => setPage(page + 1)} disabled={urls.length < 5}>Next</button>
  </div>
</div>
    </div>
  )
}

export default myurls