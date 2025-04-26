import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  url: string; // ✅ Pass URL dynamically
}

export default function QRCodeGenerator({ item }: QRCodeProps) {
  const [qrImage, setQrImage] = useState("");
  const url =  `${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.shortUrl}`; // ✅ Use the short URL from the item

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (item) {
          const qr = await QRCode.toDataURL(url);
          setQrImage(qr);
        }
      } catch (error) {
        console.error("QR Code generation error:", error);
      }
    };

    generateQRCode();
  }, [item]); // ✅ Generates QR when `item` changes

  return (
    <div className=" text-black flex flex-col items-center space-y-4">
      {qrImage ? (
        <img src={qrImage} alt="QR Code" />
        
      ) : (
        <p className="text-gray-500">Generating QR Code...</p>
      )}
      <p>Alias :{item.Alias}</p>
      <p>Short Url :{url}</p>
      <p>Original Url :{item.originalUrl}</p>
    </div>
  );
}