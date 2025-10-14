import { useState } from "react";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

const Mahasiswa = () => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (nama) => alert(`Edit data ${nama}`);
  const handleDelete = (nama) => {
    if (confirm(`Yakin ingin hapus ${nama}?`)) alert("Data berhasil dihapus!");
  };

  return (
    <AdminLayout>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={() => setShowModal(true)}>+ Tambah Mahasiswa</Button>
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
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211001</td>
              <td className="py-2 px-4">Budi Santoso</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit("Budi Santoso")}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete("Budi Santoso")}
                >
                  Hapus
                </Button>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211002</td>
              <td className="py-2 px-4">Siti Aminah</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit("Siti Aminah")}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete("Siti Aminah")}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Modal Tambah Mahasiswa */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Tambah Mahasiswa</h2>
              <button
                onClick={() => setShowModal(false)}
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
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
    </AdminLayout>
  );
};

export default Mahasiswa;
