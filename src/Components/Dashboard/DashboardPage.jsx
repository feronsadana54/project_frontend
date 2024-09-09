import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayout from "../../Layouts/DashboardLayouts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sales",
      data: [12000, 19000, 3000, 5000, 20000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Monthly Sales Data" },
  },
};

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <h1 className="mt-4">Dashboard</h1>
      <div className="chart-container" style={{ height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
