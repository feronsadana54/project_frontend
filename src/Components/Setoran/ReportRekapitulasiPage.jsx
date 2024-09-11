import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { exportExcel, getTotalSetoran } from "../../Api/pembayaranapi";
import DashboardLayout from "../../Layouts/DashboardLayouts";

const ReportRekapitulasiPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRekapitulasi();
  }, []);

  const fetchRekapitulasi = async () => {
    const response = await getTotalSetoran();
    setData(response.data);
  };

  const handleExport = async () => {
    await exportExcel();
    alert("File berhasil diekspor!");
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Report Rekapitulasi Penerimaan Negara</h1>
        <Button variant="primary" className="mb-4" onClick={handleExport}>
          Export ke Excel
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Sumber Penerimaan</th>
              <th>Total Setoran</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.sumber}</td>
                <td>{item.total}</td>
                <td>{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default ReportRekapitulasiPage;
