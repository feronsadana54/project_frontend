import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { getSumberPenerimaan, createSumberPenerimaan, updateSumberPenerimaan, deleteSumberPenerimaan } from "../../Api/sumberpenerimaanapi";

const SumberPenerimaanPage = () => {
  const [sumberPenerimaans, setSumberPenerimaans] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSumberPenerimaan, setCurrentSumberPenerimaan] = useState({ nama: "" });

  useEffect(() => {
    fetchSumberPenerimaans();
  }, []);

  const fetchSumberPenerimaans = async () => {
    const response = await getSumberPenerimaan();
    setSumberPenerimaans(response.data);
  };

  const handleSave = async () => {
    if (editMode) {
      await updateSumberPenerimaan(currentSumberPenerimaan.id, currentSumberPenerimaan);
    } else {
      await createSumberPenerimaan(currentSumberPenerimaan);
    }
    fetchSumberPenerimaans();
    setShow(false);
    setEditMode(false);
    setCurrentSumberPenerimaan({ nama: "" });
  };

  const handleDelete = async (id) => {
    await deleteSumberPenerimaan(id);
    fetchSumberPenerimaans();
  };

  const handleEdit = (sumberPenerimaan) => {
    setCurrentSumberPenerimaan(sumberPenerimaan);
    setEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentSumberPenerimaan({ nama: "" });
    setEditMode(false);
    setShow(true);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Manajemen Sumber Penerimaan</h1>
        <Button variant="primary" onClick={handleAdd} className="mb-4">Tambah Sumber Penerimaan</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Sumber Penerimaan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sumberPenerimaans.map((sumberPenerimaan, index) => (
              <tr key={sumberPenerimaan.id}>
                <td>{index + 1}</td>
                <td>{sumberPenerimaan.nama}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(sumberPenerimaan)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(sumberPenerimaan.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Sumber Penerimaan" : "Tambah Sumber Penerimaan"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama Sumber Penerimaan</Form.Label>
                <Form.Control type="text" value={currentSumberPenerimaan.nama} onChange={(e) => setCurrentSumberPenerimaan({ ...currentSumberPenerimaan, nama: e.target.value })} />
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

export default SumberPenerimaanPage;
