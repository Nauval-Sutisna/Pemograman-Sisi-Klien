import React, { useEffect, useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Pages/Layouts/Utils/Context/AuthContext";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { toastError } from "@/Pages/Layouts/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Pages/Layouts/Utils/Helpers/SwalHelpers";

import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Pages/Layouts/Utils/Hooks/useMahasiswa";

import { getAllKelas } from "@/Pages/Layouts/Utils/Apis/KelasApi";
import { getAllMataKuliah } from "@/Pages/Layouts/Utils/Apis/MataKuliahApi";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  // ================= STATE PAGINATION & FILTER =================
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // ================= DATA RELASI =================
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  // ================= FETCH MAHASISWA =================
  const {
    data: mahasiswa = [],
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa();

  const sortedMahasiswa = [...mahasiswa].sort((a, b) => {
    const valA = a[sort];
    const valB = b[sort];

    // === KHUSUS NIM (M001, M021, dll) ===
    if (sort === "nim") {
      const numA = parseInt(valA.replace(/\D/g, ""), 10);
      const numB = parseInt(valB.replace(/\D/g, ""), 10);

      return order === "asc" ? numA - numB : numB - numA;
    }

    // === STRING NORMAL (name) ===
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // === NUMBER (max_sks) ===
    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc"
        ? valA - valB
        : valB - valA;
    }

    return 0;
  });

  const totalPages = Math.ceil(mahasiswa.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedMahasiswa = sortedMahasiswa.slice(startIndex, endIndex);

  

  // ================= FETCH KELAS & MATA KULIAH =================
  useEffect(() => {
    const fetchRelasiData = async () => {
      try {
        const [resKelas, resMataKuliah] = await Promise.all([
          getAllKelas(),
          getAllMataKuliah(),
        ]);

        setKelas(resKelas.data || []);
        setMataKuliah(resMataKuliah.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRelasiData();
  }, []);

  // ================= HITUNG TOTAL SKS =================
  const getTotalSks = (mhsId) => {
    return kelas
      .filter((k) => k.mahasiswa_ids?.includes(mhsId))
      .map(
        (k) =>
          mataKuliah.find(
            (mk) => mk.id === k.mata_kuliah_id
          )?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // ================= MUTATION =================
  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  // ================= MODAL & FORM =================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nim: "",
    name: "",
    max_sks: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ id: null, nim: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setForm({
      id: mhs.id,
      nim: mhs.nim,
      name: mhs.name,
      max_sks: mhs.max_sks,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({ id: null, nim: "", name: "", max_sks: 0 });
    setIsModalOpen(false);
    setIsEdit(false);
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.name || !form.max_sks) {
      toastError("NIM, Nama, dan Max SKS wajib diisi!");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        update({ id: form.id, data: form });
        resetForm();
      });
      return;
    }

    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }

    store(form);
    resetForm();
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    confirmDelete(() => {
      remove(id);
    });
  };

  // ================= PAGINATION =================
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  // ================= RENDER =================
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>

          {user.permission?.includes("mahasiswa.create") && (
            <Button onClick={handleAdd}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {/* SEARCH & SORT */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Cari nama/NIM..."
            className="border px-3 py-1 rounded flex-grow"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-1 rounded"
          >
            <option value="name">Sort by Nama</option>
            <option value="nim">Sort by NIM</option>
            <option value="max_sks">Sort by Max SKS</option>
          </select>

          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-1 rounded"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* TABLE */}
        {user.permission?.includes("mahasiswa.read") && (
          <TableMahasiswa
            data={paginatedMahasiswa}
            isLoading={isLoadingMahasiswa}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
            getTotalSks={getTotalSks}
          />
        )}

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            Halaman {page} dari {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* MODAL */}
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
