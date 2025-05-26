"use client";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// ✅ Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string;
    borderWidth?: number;
    tension?: number;
  }[];
}

const AnalyticsPage: React.FC = () => {
  const router = useRouter(); // Initialize router
  const { data: session } = useSession(); // Use session to check authentication
  const [clickData, setClickData] = useState<ChartData>({ labels: [], datasets: [] });
  const [userAgentData, setUserAgentData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {

    if(!session){
      router.push("/signin"); // Redirect to sign-in page if not authenticated
      return;
    }

    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get("/api/analytics"); // ✅ Fetch everything from analytics API
        const data = res.data;
       

        setClickData({
          labels: data.labels,
          datasets: [
            {
              label: "Clicks Over Time",
              data: data.clicks,
              borderColor: "blue",
              backgroundColor: ["rgba(0, 0, 255, 0.2)"],
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });

        setUserAgentData({
          labels: Object.keys(data.userAgents),
          datasets: [
            {
              label: "User Agent Distribution",
              data: Object.values(data.userAgents),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#E74C3C"],
              hoverOffset: 4,
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    fetchAnalyticsData();
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      {/* ✅ Line Chart */}

    <h1>
        Total Clicks : {clickData.datasets[0]?.data?.reduce((acc, curr) => acc + curr, 0) || 0}
    </h1>


      <div className="flex justify-center items-center">

        <div className="mb-8 w-full max-w-3xl">
          <h2 className="text-xl font-semibold">Clicks Over Time</h2>
          <Line data={clickData} />
        </div>
      </div>


      <div className="grid grid-cols-1 m-auto md:grid-cols-[2fr_1fr] md:w-[80%] items-center gap-4">
        {/* ✅ Bar Chart */}
        <div className="mb-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold">Click Distribution</h2>
          <Bar data={clickData} />
        </div>
        {/* ✅ Pie Chart (User Agents) */}
        <div className="mb-8 w-full md:w-[80%] max-w-2xl">
          <h2 className="text-xl font-semibold">User Agent Distribution</h2>
          <Pie data={userAgentData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;