import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  item: {
    shortUrl: string;
    Alias: string;
  };
}

export default function QRCodeGenerator({ item }: QRCodeProps) {
  const [qrImage, setQrImage] = useState("");
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${item.shortUrl}`;

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
  }, [item]);

  return (
    <div className="flex flex-col items-center space-y-4 text-center text-white">
      {qrImage ? (
        <div className="p-4 rounded-lg bg-black neon-border inline-block">
          <img src={qrImage} alt="QR Code" className="w-48 h-48" />
        </div>
      ) : (
        <p className="text-gray-500">Generating QR Code...</p>
      )}

      <p className="text-purple-900 text-xl font-bold drop-shadow-neon">{item.Alias}</p>
      <p className="text-sm text-black drop-shadow-neon">{url}</p>

      <style jsx>{`
        .neon-border {
          box-shadow: 0 0 10px #d946ef, 0 0 20px #d946ef, 0 0 40px #d946ef;
        }
        .drop-shadow-neon {
          text-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 20px #d946ef;
        }
      `}</style>
    </div>
  );
}
