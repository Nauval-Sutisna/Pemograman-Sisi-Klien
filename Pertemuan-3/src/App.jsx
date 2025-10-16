import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";

// import App from "@/App";
import "@/App.css";

import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail";
import PageNotFound from "@/Pages/PageNotFound";
import ProtectedRoute from "@/Pages/Layouts/ProtectedRoute";
import AdminLayout from "@/Pages/Layouts/AdminLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<MahasiswaDetail />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// import Login from "@/Pages/Auth/Login";

// const App = () => {
//     return <Login />
// }

// export default App;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthLayout />
//     children: {
//      (
//        index: true,
//        element: <Login />
//      ),
//      (
//        path: "login"
//        element: <Login />
//      )
//   },
//   {
//     path: "/admin",
//     element: <Dashboard />
//   },
//   {
//     path: "/admin",
//     element: <PageNotFound />
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router = (router) />
//   </StrictMode>
// );