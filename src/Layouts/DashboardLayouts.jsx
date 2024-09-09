import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" className="w-100">
        <div className="container-fluid p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
