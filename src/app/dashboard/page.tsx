"use client"; // Ensure it's a client component
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import List from "./component/List";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter(); // Initialize router
  const { data: session } = useSession(); // Use session to check authentication
  const [urls, setUrls] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    url: "",
    alias: "",
  });


    useEffect(() => {

      if(!session){
        router.push("/signin"); // Redirect to sign-in page if not authenticated
        return;
      }

      setLoading(true);
        fetch("/api/geturls") // Use relative path for API calls
          .then((res) => res.json())
          .then((data) => {
            setUrls(data)
            setLoading(false);})
          .catch((err) => console.error("Error fetching data:", err));
        
      }, [session]);
 
  // ✅ Corrected `handleChange` Function
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  // ✅ Added `handleSubmit`
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
      console.log("Response:", result);
      if (res.status === 201) {
        setUrls((prevUrls) => [...prevUrls, result.newUrl]); // Update the state with the new URL
        setFormData({ url: "", alias: "" }); // Reset form data
      } 
      setLoading1(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen ">
      
      <form onSubmit={handleSubmit} >

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Enter URL to shorten</legend>

  <label className="label">Url</label>
  <input type="text" className="input" placeholder="My awesome page" name = 'url' onChange={handleChange} />

  <label className="label">Alias (Optional)</label>
  <input type="text" className="input" placeholder="my-awesome-page" name = 'alias' onChange={handleChange} />
  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" >
    {loading1 ? <div className="loading loading-spinner loading-lg"></div>: "Shorten"}
    </button>
</fieldset>
      </form>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {urls.length === 0 && !loading && <div className="text-2xl font-bold">No URLs found</div>}
        <List urls={urls} />


    </div>
  );
};

export default Dashboard;