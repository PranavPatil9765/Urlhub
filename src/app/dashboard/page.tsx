"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import List, { Url } from "../../components/List";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({ url: "", alias: "" });

  const handleDeleteUrl = (shortUrl: string) => {
    setUrls((prev) => prev.filter((url) => url.shortUrl !== shortUrl));
    toast.success("URL deleted successfully");
  };

  useEffect(() => {
    if (!session) {
      router.push("/signin");
      return;
    }

    setLoading(true);
    fetch("/api/geturls")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [session]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading1(true);
      const res = await fetch("/api/posturl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const result = await res.json();
      if (res.status === 201) {
        setUrls((prevUrls: Url[]) => [result.newUrl, ...prevUrls]);
        toast.success("URL shortened successfully!");
        setFormData({ url: "", alias: "" });
      } else {
        toast.error(result.message || "Error shortening URL.");
      }
    } catch (error) {
      toast.error("Submission error!");
      console.error("Submission error:", error);
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center gap-6 font-mono">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-neon-indigo drop-shadow-neon mb-4">URL Hub</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-gray-900 p-6 rounded-xl border border-indigo-400 neon-box">
        <fieldset className="space-y-3">
          <legend className="text-xl text-indigo-400 font-semibold">Enter URL to Shorten</legend>

          <div className="flex flex-col">
            <label className="text-sm mb-1">URL</label>
            <input
              type="text"
              name="url"
              placeholder="https://example.com"
              value={formdata.url}
              onChange={handleChange}
              className="input input-bordered bg-black border-indigo-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Alias (Optional)</label>
            <input
              type="text"
              name="alias"
              placeholder="my-custom-alias"
              value={formdata.alias}
              onChange={handleChange}
              className="input input-bordered bg-black border-indigo-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded shadow-md shadow-indigo-500/50"
            type="submit"
            disabled={loading1}
          >
            {loading1 ? (
              <div className="loading loading-spinner loading-sm text-white"></div>
            ) : (
              "Shorten"
            )}
          </button>
        </fieldset>
      </form>

      <div className="w-full max-w-3xl">
        {loading ? (
          <div className="text-indigo-300 text-xl">Loading URLs...</div>
        ) : urls.length === 0 ? (
          <div className="text-indigo-300 text-xl">No URLs found yet.</div>
        ) : (
          urls.map((url: Url, ind: number) => (
              <List key={ind} url={url} Delete={handleDeleteUrl} />
          ))
        )}
      </div>

      <style jsx>{`
       

        .neon-box {
          box-shadow: 0 0 10px indigo, 0 0 20px indigo, 0 0 30px indigo;
        }

        .drop-shadow-neon {
          text-shadow: 0 0 5px indigo, 0 0 10px indigo, 0 0 20px indigo;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
