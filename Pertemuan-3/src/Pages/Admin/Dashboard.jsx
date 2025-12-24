// Dashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useChartData } from "@/Pages/Layouts/Utils/Hooks/useChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const { data = {}, isLoading } = useChartData();

  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = data;

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading chart data...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Selamat Datang di Dashboard
      </h1>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= A. BAR CHART ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
            Jumlah Mahasiswa per Fakultas
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={students}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faculty" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= B. PIE CHART ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
            Rasio Gender Mahasiswa
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderRatio}
                dataKey="count"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {genderRatio.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ================= C. LINE CHART ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
            Registrasi Mahasiswa per Tahun
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= D. RADAR CHART ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
            Nilai Mahasiswa per Jurusan
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={gradeDistribution}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="A"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="B"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.4}
              />
              <Radar
                name="C"
                dataKey="C"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= E. AREA CHART (FULL WIDTH) ================= */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h2 className="font-semibold mb-4">
            Jumlah Dosen Berdasarkan Pangkat
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lecturerRanks}>
              <defs>
                <linearGradient
                  id="colorLecturer"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8884d8"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8884d8"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="rank" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorLecturer)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
