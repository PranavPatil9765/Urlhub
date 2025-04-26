import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QRCodeGenerator from '@/components/qrgenerator';

const List = ({urls}: {urls: any[]}) => {
    console.log("Urls:", urls); // Debug URLs
      const [carddisplay, setCardDisplay] = useState(false);
      const [item, setItem] = useState({});
    
  
  return (
    <div>

     {carddisplay && <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">QR Code</h2>
        <QRCodeGenerator item = {item} />
        <button className="btn btn-primary" onClick={() => setCardDisplay(false)}>Close</button>
      </div>
    </div>}

    <ul className="list bg-base-100 rounded-box shadow-md">
  {
    urls!=null && (<li className="p-4 pb-2 text-xs opacity-60 tracking-wide"> Recently Created Urls</li>)
  }
  
  {Array.isArray(urls) && urls.map((item,index)=>(
      <li className="list-row" key={index}>
      <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
      <div>
        <div>{item.Alias}</div>
        <div className="text-xs font-semibold opacity-60">{process.env.NEXT_PUBLIC_API_BASE_URL}/{item.shortUrl}</div>
      </div>
      <p className="list-col-wrap text-xs">
       {item.originalUrl}
      </p>
      <button className="btn btn-square btn-ghost"  onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${item.shortUrl}`)}      >
      <img width="48" height="48" src="https://img.icons8.com/color/48/copy--v1.png" alt="copy--v1"/>   </button>
      <button className="btn btn-square btn-ghost" onClick={()=>{
        setCardDisplay(true);
        setItem(item);
      }}>
  <img width="100" height="100" src="https://img.icons8.com/plasticine/100/qr-code.png" alt="qr-code"/>
   </button>
      <button className="btn btn-square btn-ghost" onClick={()=>{
window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${item.shortUrl}`, "_blank");
}}>
<img width="48" height="48" src="https://img.icons8.com/fluency/48/link.png" alt="link"/>   </button>
   
   <button className="btn btn-square btn-ghost" onClick={()=>{
     fetch(`/api/deleteurl/${item.shortUrl}`, {
       method: "DELETE",
      })
      setUrls(urls.filter((url)=> url.shortUrl!=item.shortUrl))
      
    }}>
     <img width="64" height="64" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-dustbin-smart-home-flatart-icons-lineal-color-flatarticons.png" alt="external-dustbin-smart-home-flatart-icons-lineal-color-flatarticons"/>
   </button>
    </li>
  )
)}

  
  
 
  
</ul>
</div>
  )
}

export default List