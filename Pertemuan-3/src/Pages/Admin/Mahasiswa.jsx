import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useNavigate } from "react-router-dom";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { toastSuccess, toastError } from "@/Pages/Layouts/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Pages/Layouts/Utils/Helpers/SwalHelpers";

import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa as updateApi,
  deleteMahasiswa as deleteApi,
} from "@/Pages/Layouts/Utils/Apis/MahasiswaApi";

const Mahasiswa = () => {
  const navigate = useNavigate();

  // Data Mahasiswa
  const [mahasiswa, setMahasiswa] = useState([]);

  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ id: null, nim: "", nama: "" });

  // Fetch data dari API
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    getAllMahasiswa()
      .then((res) => {
        setMahasiswa(res.data);
      })
      .catch(() => toastError("Gagal mengambil data mahasiswa"));
  };

  // Handle input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Buka modal tambah
  const handleAdd = () => {
    setForm({ id: null, nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // Buka modal edit
  const openEditModal = (mhs) => {
    setForm({
      id: mhs.id,
      nim: mhs.nim,
      nama: mhs.nama,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // Submit form (Tambah / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nim.trim() || !form.nama.trim()) {
      toastError("NIM dan Nama wajib diisi!");
      return;
    }

    if (isEdit) {
      // UPDATE DATA
      confirmUpdate(() => {
        updateApi(form.id, form)
          .then(() => {
            toastSuccess("Data berhasil diperbarui");
            fetchMahasiswa();
            setIsModalOpen(false);
          })
          .catch(() => toastError("Gagal update data"));
      });
    } else {
      // CREATE DATA
      storeMahasiswa(form)
        .then(() => {
          toastSuccess("Data berhasil ditambahkan");
          fetchMahasiswa();
          setIsModalOpen(false);
        })
        .catch(() => toastError("Gagal menambah data"));
    }

    setForm({ id: null, nim: "", nama: "" });
  };

  // Hapus data mahasiswa
  const handleDelete = async (id) => {
    confirmDelete(() => {
      deleteApi(id)
        .then(() => {
          toastSuccess("Data berhasil dihapus");
          fetchMahasiswa();
        })
        .catch(() => toastError("Gagal menghapus data"));
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={handleAdd}>+ Tambah Mahasiswa</Button>
        </div>

        <TableMahasiswa
          data={mahasiswa}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        />
      </Card>

      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
