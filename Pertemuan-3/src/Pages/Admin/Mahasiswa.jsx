import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import { mahasiswaList } from "@/Data/Dummy";
import { useNavigate } from "react-router-dom";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // addMahasiswa({ nim: "20211003", nama: "Dewi Lestari" });

  // const addMahasiswa = (newData) => {
  //   setMahasiswa([...mahasiswa, newData]);
  // };

  // updateMahasiswa("20211001", { nama: "Budi S." });

  // const updateMahasiswa = (nim, newData) => {
  //   const updated = mahasiswa.map((mhs) => 
  //     mhs.nim === nim ? {...mhs, ...newData} : mhs
  //   );
  //   setMahasiswa(updated);
  // };

  const handleEdit = (nama) => alert(`Edit data ${nama}`);
    const handleDelete = (nama) => {
      if (confirm(`Yakin ingin hapus ${nama}?`)) alert("Data berhasil dihapus!");
  };

  // const deleteMahasiswa = (nim) => {
  //   const filtered = mahasiswa.filtered((mhs) => mhs.nim !== nim);
  //   setMahasiswa(filtered);
  // }

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={() => setIsModalOpen(true)}>+ Tambah Mahasiswa</Button>
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
            {mahasiswaList.map((mhs, index) => (
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
                    onClick={() => handleEdit(mhs.nama)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(mhs.nama)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal Tambah Mahasiswa */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Tambah Mahasiswa</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>
            <form className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">NIM</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Mahasiswa;
