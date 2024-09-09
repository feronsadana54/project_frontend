import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import LoginPages from "./Pages/LoginPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPages />,
    errorElement: <h1>Halaman tidak ditemukan!</h1>,
  },
  // { path: "/daftar", element: <Daftar /> },
  // { path: "/daftar-pegawai", element: <DaftarPegawai /> },
  // { path: "/daftar-user", element: <DaftarUser /> },
  // {
  //   element: <Navbar />,
  //   children: [
  //     { path: "/dashboard", element: <Dashboard /> },
  //     {
  //       path: "/userslist",
  //       element: user.isAdmin ? (
  //         <UserList />
  //       ) : (
  //         <h1>Halaman tidak ditemukan!</h1>
  //       ),
  //     },
  //     {
  //       path: "/rekam-medis",
  //       element: <RekamMedis />,
  //     },
  //     { path: "/sub-rekam-medis/:id", element: <SubRekamMedisId /> },
  //     {
  //       path: "/edit-sub-rekam-medis/:id",
  //       element: user.isAdmin ? (
  //         <EditSubRekamMedis />
  //       ) : (
  //         <h1>Halaman tidak ditemukan!</h1>
  //       ),
  //     },
  //     {
  //       path: "/blog",
  //       element: user.isAdmin ? (
  //         <BlogList />
  //       ) : (
  //         <h1>Halaman tidak ditemukan!</h1>
  //       ),
  //     },
  //     {
  //       path: "/blogAdd",
  //       element: user.isAdmin ? (
  //         <BlogPage />
  //       ) : (
  //         <h1>Halaman tidak ditemukan!</h1>
  //       ),
  //     },
  //     { path: "/blog/:id", element: <BlogDetail /> },
  //     {
  //       path: "/edit-blog/:id",
  //       element: user.isAdmin ? (
  //         <BlogEdit />
  //       ) : (
  //         <h1>Halaman tidak ditemukan!</h1>
  //       ),
  //     },
  //     { path: "/profile/:id", element: <Profile /> },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

