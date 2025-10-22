import React, { useState, useEffect } from "react"; // ← tambahkan useEffect di sini
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { mahasiswaList } from "@/Data/Dummy";
import { useNavigate } from "react-router-dom";
import ModalMahasiswa from "./ModalMahasiswa";

const Mahasiswa = () => {
  const navigate = useNavigate();

  // Data Mahasiswa
  const [mahasiswa, setMahasiswa] = useState([]);

  // State Modal dan Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [originalNim, setOriginalNim] = useState(null);

  // useEffect
  useEffect(() => {
    setTimeout(() => fetchMahasiswa(), 500); // simulasi loading
  }, []);

  const fetchMahasiswa = async () => {
    // simulasi fetch API
    setMahasiswa(mahasiswaList);
  };

  // Handle input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah data mahasiswa baru
  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  // Update data mahasiswa
  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === nim ? { ...mhs, ...newData } : mhs
    );
    setMahasiswa(updated);
  };

  // Hapus data mahasiswa
  const deleteMahasiswa = (nim) => {
    if (confirm("Yakin ingin hapus data ini?")) {
      const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
      setMahasiswa(filtered);
      alert("Data berhasil dihapus!");
    }
  };

  // Buka modal untuk tambah
  const handleAdd = () => {
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // Buka modal untuk edit
  const handleEdit = (mhs) => {
    setForm(mhs);
    setOriginalNim(mhs.nim);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim.trim() || !form.nama.trim()) {
      alert("NIM dan Nama wajib diisi!");
      return;
    }

    if (isEdit) {
      updateMahasiswa(originalNim, form);
      alert("Data berhasil diperbarui!");
    } else {
      const exists = mahasiswa.some((mhs) => mhs.nim === form.nim);
      if (exists) {
        alert("NIM sudah terdaftar!");
        return;
      }
      addMahasiswa(form);
      alert("Data berhasil ditambahkan!");
    }

    setForm({ nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(false);
    setOriginalNim(null);
  };

  // Modal Tambah/Edit
  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          {/* <Button onClick={handleAdd}>+ Tambah Mahasiswa</Button> */}
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.length > 0 ? (
              mahasiswa.map((mhs, index) => (
                <tr
                  key={mhs.nim}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                      onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                    >
                      Detail
                    </Button>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEdit(mhs)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteMahasiswa(mhs.nim)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-3 text-center text-gray-500 italic"
                >
                  Tidak ada data mahasiswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {isModalOpen && (
        <ModalMahasiswa
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default Mahasiswa;
