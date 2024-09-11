import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DashboardLayout from "../../Layouts/DashboardLayouts";
import { createUser, getUsers, updateUserRole } from "../../Api/userapi";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]); 
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "", password: "", role: "Spesialis_Keuangan" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      
      if (response && response.data) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); 
    }
  };

  const handleSave = async () => {
    if (editMode) {
      await updateUserRole(currentUser.id, currentUser);
    } else {
      await createUser(currentUser);
    }
    fetchUsers();
    setShow(false);
    setEditMode(false);
    setCurrentUser({ username: "", password: "", role: "Spesialis_Keuangan" });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentUser({ username: "", password: "", role: "Spesialis_Keuangan" });
    setEditMode(false);
    setShow(true);
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h1 className="text-center mb-4">Manajemen Pengguna</h1>
        <Button variant="primary" onClick={handleAdd} className="mb-4">Tambah Pengguna</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <Form.Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                      <option value="AM_PPN">AM PPN</option>
                      <option value="Spesialis_Keuangan">Spesialis Keuangan</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(user)}>Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Tidak ada data pengguna</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Pengguna" : "Tambah Pengguna"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={currentUser.username} onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={currentUser.password} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select value={currentUser.role} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}>
                  <option value="AM_PPN">AM PPN</option>
                  <option value="Spesialis_Keuangan">Spesialis Keuangan</option>
                </Form.Select>
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

export default UserManagementPage;
