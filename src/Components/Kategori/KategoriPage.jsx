import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { getKategori, createKategori, updateKategori, deleteKategori } from "../../Api/kategoriapi";

const KategoriPage = () => {
  const [kategoris, setKategoris] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentKategori, setCurrentKategori] = useState({ nama: "" });

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    const response = await getKategori();
    setKategoris(response.data);
  };

  const handleSave = async () => {
    if (editMode) {
      await updateKategori(currentKategori.id, currentKategori);
    } else {
      await createKategori(currentKategori);
    }
    fetchKategoris();
    setShow(false);
    setEditMode(false);
    setCurrentKategori({ nama: "" });
  };

  const handleDelete = async (id) => {
    await deleteKategori(id);
    fetchKategoris();
  };

  const handleEdit = (kategori) => {
    setCurrentKategori(kategori);
    setEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentKategori({ nama: "" });
    setEditMode(false);
    setShow(true);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Manajemen Kategori Sumber Penerimaan</h1>
        <Button variant="primary" onClick={handleAdd} className="mb-4">Tambah Kategori</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategoris.map((kategori, index) => (
              <tr key={kategori.id}>
                <td>{index + 1}</td>
                <td>{kategori.nama}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(kategori)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(kategori.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Kategori" : "Tambah Kategori"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama Kategori</Form.Label>
                <Form.Control type="text" value={currentKategori.nama} onChange={(e) => setCurrentKategori({ ...currentKategori, nama: e.target.value })} />
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

export default KategoriPage;
