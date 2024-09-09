import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayouts";

const SetoranPage = () => {
  const [setorans, setSetorans] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSetoran, setCurrentSetoran] = useState({
    id: null,
    nama: "",
    jumlah: "",
    tanggal: "",
  });

  useEffect(() => {
    const storedSetorans = JSON.parse(localStorage.getItem("setorans")) || [];
    setSetorans(storedSetorans);
  }, []);

  const handleSave = () => {
    if (editMode) {
      const updatedSetorans = setorans.map((setoran) =>
        setoran.id === currentSetoran.id ? currentSetoran : setoran
      );
      setSetorans(updatedSetorans);
      localStorage.setItem("setorans", JSON.stringify(updatedSetorans));
    } else {
      const newSetoran = {
        ...currentSetoran,
        id: Date.now(),
      };
      const updatedSetorans = [...setorans, newSetoran];
      setSetorans(updatedSetorans);
      localStorage.setItem("setorans", JSON.stringify(updatedSetorans));
    }
    setShow(false);
    setEditMode(false);
    setCurrentSetoran({ id: null, nama: "", jumlah: "", tanggal: "" });
  };

  const handleDelete = (id) => {
    const updatedSetorans = setorans.filter((setoran) => setoran.id !== id);
    setSetorans(updatedSetorans);
    localStorage.setItem("setorans", JSON.stringify(updatedSetorans));
  };

  const handleEdit = (setoran) => {
    setCurrentSetoran(setoran);
    setEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentSetoran({ id: null, nama: "", jumlah: "", tanggal: "" });
    setEditMode(false);
    setShow(true);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Setoran Management</h1>
        <Button variant="primary" onClick={handleAdd} className="mb-4">
          Add New Setoran
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Setoran</th>
              <th>Jumlah</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {setorans.map((setoran, index) => (
              <tr key={setoran.id}>
                <td>{index + 1}</td>
                <td>{setoran.nama}</td>
                <td>{setoran.jumlah}</td>
                <td>{setoran.tanggal}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(setoran)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(setoran.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Edit Setoran" : "Add New Setoran"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama Setoran</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSetoran.nama}
                  onChange={(e) =>
                    setCurrentSetoran({
                      ...currentSetoran,
                      nama: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Jumlah</Form.Label>
                <Form.Control
                  type="number"
                  value={currentSetoran.jumlah}
                  onChange={(e) =>
                    setCurrentSetoran({
                      ...currentSetoran,
                      jumlah: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  value={currentSetoran.tanggal}
                  onChange={(e) =>
                    setCurrentSetoran({
                      ...currentSetoran,
                      tanggal: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editMode ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default SetoranPage;
