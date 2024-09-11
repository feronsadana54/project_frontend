import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { getSummarySetoranByYear } from "../../Api/pembayaranapi";

const SummarySetoranPage = () => {
  const [tahun, setTahun] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = async () => {
    const response = await getSummarySetoranByYear(tahun);
    setData(response.data);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Summary Setoran Bulanan</h1>
        <Form>
          <Form.Group>
            <Form.Label>Pilih Tahun</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan tahun"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="mt-2" onClick={handleFilter}>
            Filter
          </Button>
        </Form>

        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Bulan</th>
              <th>Total Setoran</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bulan}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default SummarySetoranPage;
