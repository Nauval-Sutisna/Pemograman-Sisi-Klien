// src/App.jsx
import React from "react";
import Login from "./package/Auth/Login.jsx"; // aman pakai ekstensi .jsx biar pasti terbaca

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Komponen Login ditampilkan di tengah halaman */}
      <Login />
    </main>
  );
}

export default App;
