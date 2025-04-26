"use client"
import QRCodeGenerator from '@/components/qrgenerator';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const myurls = () => {
    const router = useRouter(); // Initialize router
    const { data: session } = useSession(); // Use session to check authentication
    const [page, setPage] = useState(1);
    const [urls, setUrls] = useState([]);
    const [carddisplay, setCardDisplay] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    async function geturls(){
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
        setLoading(false);

    }
    useEffect(()=>{
      if(!session){
        router.push("/signin"); // Redirect to sign-in page if not authenticated
        return;
      }
        geturls();
    },[page,session])

    


  return (
    <div>myurls

    {carddisplay && <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
  <div className="bg-white p-4 rounded shadow-lg">
    <h2 className="text-lg font-bold">QR Code</h2>
    <QRCodeGenerator item = {item} />
    <button className="btn btn-primary" onClick={() => setCardDisplay(false)}>Close</button>
  </div>
</div>}

<ul className="list bg-base-100 rounded-box shadow-md">
  
  {loading && <div className="flex justify-center items-center"><img src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-loading-circular-flatart-icons-lineal-color-flatarticons.png" alt="external-loading-circular-flatart-icons-lineal-color-flatarticons"/></div>}

 
  
    {urls.map((item, index) => (
       <li className="list-row" key={index}>
       <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
       <div>
         <div>{item.Alias}</div>
         <div className="text-xs font-semibold opacity-60">{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{item.shortUrl}</div>
       </div>
       <p className="list-col-wrap text-xs">
        {item.originalUrl}
       </p>


       <button className="btn btn-square btn-ghost"  onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.shortUrl}`)}      >
      <img width="48" height="48" src="https://img.icons8.com/color/48/copy--v1.png" alt="copy--v1"/>   </button>
     



       <button className="btn btn-square btn-ghost" onClick={()=>{
         setCardDisplay(true);
            setItem(item);
    }}>
   <img width="100" height="100" src="https://img.icons8.com/plasticine/100/qr-code.png" alt="qr-code"/>
    </button>
       <button className="btn btn-square btn-ghost" onClick={()=>{
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${item.shortUrl}` ;
    }}>
      <img width="25" height="25" src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/25/external-web-hyperlink-with-url-for-navigating-to-new-page-text-duo-tal-revivo.png" alt="external-web-hyperlink-with-url-for-navigating-to-new-page-text-duo-tal-revivo"/>
    </button>
    
    <button className="btn btn-square btn-ghost" onClick={()=>{
        fetch(`/api/deleteurl/${item.shortUrl}`, {
            method: "DELETE",
          })
         setUrls(urls.filter((url)=> url.shortUrl!=item.shortUrl))
          
    }}>
      <img width="64" height="64" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-dustbin-smart-home-flatart-icons-lineal-color-flatarticons.png" alt="external-dustbin-smart-home-flatart-icons-lineal-color-flatarticons"/>
    </button>
     </li>
    ))}
 
</ul>




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