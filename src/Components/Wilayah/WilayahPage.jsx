import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { getWilayah, createWilayah, updateWilayah, deleteWilayah } from "../../Api/wilayahapi";

const WilayahPage = () => {
  const [wilayahs, setWilayahs] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentWilayah, setCurrentWilayah] = useState({ nama: "", kota: "", provinsi: "", pusat: "" });

  useEffect(() => {
    fetchWilayahs();
  }, []);

  const fetchWilayahs = async () => {
    const response = await getWilayah();
    setWilayahs(response.data);
  };

  const handleSave = async () => {
    if (editMode) {
      await updateWilayah(currentWilayah.id, currentWilayah);
    } else {
      await createWilayah(currentWilayah);
    }
    fetchWilayahs();
    setShow(false);
    setEditMode(false);
    setCurrentWilayah({ nama: "", kota: "", provinsi: "", pusat: "" });
  };

  const handleDelete = async (id) => {
    await deleteWilayah(id);
    fetchWilayahs();
  };

  const handleEdit = (wilayah) => {
    setCurrentWilayah(wilayah);
    setEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentWilayah({ nama: "", kota: "", provinsi: "", pusat: "" });
    setEditMode(false);
    setShow(true);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Manajemen Wilayah Setoran</h1>
        <Button variant="primary" onClick={handleAdd} className="mb-4">Tambah Wilayah</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Wilayah</th>
              <th>Kota/Kabupaten</th>
              <th>Provinsi</th>
              <th>Pusat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wilayahs.map((wilayah, index) => (
              <tr key={wilayah.id}>
                <td>{index + 1}</td>
                <td>{wilayah.nama}</td>
                <td>{wilayah.kota}</td>
                <td>{wilayah.provinsi}</td>
                <td>{wilayah.pusat}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(wilayah)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(wilayah.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Wilayah" : "Tambah Wilayah"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama Wilayah</Form.Label>
                <Form.Control type="text" value={currentWilayah.nama} onChange={(e) => setCurrentWilayah({ ...currentWilayah, nama: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Kota/Kabupaten</Form.Label>
                <Form.Control type="text" value={currentWilayah.kota} onChange={(e) => setCurrentWilayah({ ...currentWilayah, kota: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Provinsi</Form.Label>
                <Form.Control type="text" value={currentWilayah.provinsi} onChange={(e) => setCurrentWilayah({ ...currentWilayah, provinsi: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pusat</Form.Label>
                <Form.Control type="text" value={currentWilayah.pusat} onChange={(e) => setCurrentWilayah({ ...currentWilayah, pusat: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Tutup</Button>
            <Button variant="primary" onClick={handleSave}>{editMode ? "Update" : "Simpan"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default WilayahPage;
