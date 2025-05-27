"use client";

import { FaRegCopy, FaExternalLinkAlt, FaQrcode, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import QRCodeGenerator from './qrgenerator';
import { toast } from 'react-toastify';

interface Url {
  Alias: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

const List = ({ url, Delete }: { url: Url; Delete: (shortUrl: string) => void }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url.shortUrl}`);
    setCopied(true);
    toast.success("Short URL copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/deleteurl/${url.shortUrl}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast.success("URL deleted successfully");
      Delete(url.shortUrl);
    } else {
      toast.error("Failed to delete URL");
    }
  };

  return (
    <>
      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-center">QR Code for {url.Alias}</h2>
            <QRCodeGenerator item={url} />
            <button
              onClick={() => setShowQR(false)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition w-full"
            >
              Close QR Code
            </button>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="bg-black text-indigo-300 p-6 m-4 rounded-xl shadow-lg border border-indigo-500 neon-border w-full transition hover:scale-[1.02] duration-300">
        <div className="flex gap-4 items-center justify-between text-xl">
          <h1 className="text-xl font-bold mb-2 text-indigo-400">{url.Alias}</h1>
          <div className="flex gap-5 items-center">
            <button onClick={handleCopy} className="hover:text-green-400 transition" title="Copy">
              <FaRegCopy />
            </button>

            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              title="Open"
            >
              <FaExternalLinkAlt />
            </a>

            <button onClick={() => setShowQR(true)} className="hover:text-yellow-400 transition" title="QR Code">
              <FaQrcode />
            </button>

            <button onClick={handleDelete} className="hover:text-red-500 transition" title="Delete">
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <p className="mb-1">🧩 <span className="text-indigo-200">Short URL:</span> {process.env.NEXT_PUBLIC_API_BASE_URL}/api/{url.shortUrl}</p>
        <p className="mb-1">🌐 <span className="text-indigo-200">Original URL:</span> {url.originalUrl}</p>
        <p className="mb-1">📅 <span className="text-indigo-200">Created At:</span> {new Date(url.createdAt).toLocaleString()}</p>

        {copied && (
          <p className="mt-2 text-green-400 text-sm">Copied to clipboard!</p>
        )}

        <style jsx>{`
          .neon-border {
            box-shadow: 0 0 10px indigo, 0 0 20px indigo, 0 0 30px indigo;
          }
        `}</style>
      </div>
    </>
  );
};

export default List;
export type { Url };
