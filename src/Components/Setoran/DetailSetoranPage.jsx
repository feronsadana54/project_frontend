import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getSummarySetoranByYear } from "../../Api/pembayaranapi";
import DashboardLayout from "../../Layouts/DashboardLayouts";

const DetailSetoranPage = () => {
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState("");

  useEffect(() => {
    if (tahun) {
      fetchDetailSetoran();
    }
  }, [tahun]);

  const fetchDetailSetoran = async () => {
    const response = await getSummarySetoranByYear(tahun);
    setData(response.data);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Detail Setoran Bulanan</h1>
        <input
          type="number"
          placeholder="Masukkan Tahun"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
        />
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Bulan</th>
              <th>Jumlah Setoran</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bulan}</td>
                <td>{item.jumlah}</td>
                <td>{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default DetailSetoranPage;
