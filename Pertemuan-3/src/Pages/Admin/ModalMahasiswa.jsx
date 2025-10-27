// import React from "react";
// import Form from "@/Pages/Layouts/Components/Form";
// import Input from "@/Pages/Layouts/Components/Input";
// import Label from "@/Pages/Layouts/Components/Label";
// import Button from "@/Pages/Layouts/Components/Button";

// const ModalMahasiswa = ({
//   form,
//   handleChange,
//   handleSubmit,
//   setIsModalOpen,
//   isEdit,
// }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//         {/* Header Modal */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">
//             {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
//           </h2>
//           <button
//             type="button"
//             onClick={() => setIsModalOpen(false)}
//             className="text-gray-600 hover:text-red-500 text-xl"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Form Input */}
//         <Form onSubmit={handleSubmit} className="p-4 space-y-4">
//           <div>
//             <Label htmlFor="nim">NIM</Label>
//             <Input
//               type="text"
//               name="nim"
//               value={form.nim}
//               onChange={handleChange}
//             //   readOnly={isEdit} 
//               placeholder="Masukkan NIM"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="nama">Nama</Label>
//             <Input
//               type="text"
//               name="nama"
//               value={form.nama}
//               onChange={handleChange}
//               placeholder="Masukkan Nama"
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-2 pt-2">
//             <Button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               variant="secondary"
//             >
//               Batal
//             </Button>
//             <Button type="submit" variant="primary">
//               {isEdit ? "Perbarui" : "Simpan"}
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ModalMahasiswa;


import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";

const ModalMahasiswa = ({
  isOpen,
  isEdit,
  form,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Form Input */}
        <Form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              name="nim"
              value={form.nim}
              onChange={onChange}
              placeholder="Masukkan NIM"
              required
            />
          </div>

          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={onClose} variant="secondary">
              Batal
            </Button>
            <Button type="submit">{isEdit ? "Perbarui" : "Simpan"}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalMahasiswa;
