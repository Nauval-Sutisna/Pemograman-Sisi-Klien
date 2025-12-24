import { useEffect, useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Pages/Layouts/Utils/Context/AuthContext";
import { toastError, toastSuccess } from "@/Pages/Layouts/Utils/Helpers/ToastHelpers";
import { confirmDelete } from "@/Pages/Layouts/Utils/Helpers/SwalHelpers";
import TableRencanaStudi from "./TableRencanaStudi";
import ModalRencanaStudi from "./ModalRencanaStudi";
import { getAllMahasiswa } from "@/Pages/Layouts/Utils/Apis/MahasiswaApi";

// Kelas
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Pages/Layouts/Utils/Apis/KelasApi";

// Dosen
import { getAllDosen } from "@/Pages/Layouts/Utils/Apis/DosenApi";

// Mata Kuliah
import { getAllMataKuliah } from "@/Pages/Layouts/Utils/Apis/MataKuliahApi";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();

  // ================= STATE DATA =================
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  // ================= STATE UI =================
  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resKelas, resDosen, resMahasiswa, resMataKuliah] =
        await Promise.all([
          getAllKelas(),
          getAllDosen(),
          getAllMahasiswa(),
          getAllMataKuliah(),
        ]);

      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (error) {
      console.error(error);
      toastError("Gagal mengambil data rencana studi");
    }
  };

  // ================= UTILITIES SKS =================
  const getMaxSks = (id) =>
    mahasiswa.find((m) => m.id === id)?.max_sks || 0;

  const getDosenMaxSks = (id) =>
    dosen.find((d) => d.id === id)?.max_sks || 0;

  // ================= OPEN ADD MODAL =================
  const openAddModal = () => {
    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  // ================= SUBMIT TAMBAH KELAS =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Form tidak lengkap");
      return;
    }

    const dosenSudahDipakai = kelas.find(
      k => k.dosen_id === form.dosen_id
    );

    if (dosenSudahDipakai) {
      toastError("Dosen ini sudah mengampu mata kuliah lain");
      return;
    }

    await storeKelas({
      ...form,
      mahasiswa_ids: [],
    });

    setIsModalOpen(false);
    toastSuccess("Kelas ditambahkan");
    fetchData();
  };

  // ================= HANDLE CHANGE FORM =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= TAMBAH MAHASISWA =================
  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId) return;

    const matkul = mataKuliah.find(
      (m) => m.id === kelasItem.mata_kuliah_id
    );
    const sks = matkul?.sks || 0;

    const totalSksMahasiswa = kelas
      .filter((k) => k.mahasiswa_ids.includes(mhsId))
      .map(
        (k) =>
          mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0
      )
      .reduce((acc, curr) => acc + curr, 0);

    const maxSks = getMaxSks(mhsId);

    if (totalSksMahasiswa + sks > maxSks) {
      toastError(`SKS melebihi batas maksimal (${maxSks})`);
      return;
    }

    if (kelasItem.mahasiswa_ids.includes(mhsId)) {
      toastError("Mahasiswa sudah terdaftar");
      return;
    }

    const updated = {
      ...kelasItem,
      mahasiswa_ids: [...kelasItem.mahasiswa_ids, mhsId],
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa berhasil ditambahkan");

    setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
    fetchData();
  };

  // ================= HAPUS MAHASISWA =================
  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const updated = {
      ...kelasItem,
      mahasiswa_ids: kelasItem.mahasiswa_ids.filter((id) => id !== mhsId),
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa dihapus");
    fetchData();
  };

  // ================= GANTI DOSEN =================
  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) return;

    const totalSksDosen = kelas
      .filter((k) => k.dosen_id === dsnId)
      .map(
        (k) =>
          mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0
      )
      .reduce((acc, curr) => acc + curr, 0);

    const kelasSks =
      mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id)?.sks || 0;

    const maxSks = getDosenMaxSks(dsnId);

    if (totalSksDosen + kelasSks > maxSks) {
      toastError(`Dosen melebihi batas maksimal SKS (${maxSks})`);
      return;
    }

    await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
    toastSuccess("Dosen diperbarui");
    fetchData();
  };

  // ================= HAPUS KELAS =================
  const handleDeleteKelas = async (kelasId) => {
    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas dihapus");
      fetchData();
    });
  };

  // =========== 1 Dosen 1 Matakuliah ===============
  const dosenSudahPunyaKelas = kelas.map(k => k.dosen_id);
  const dosenAvailable = dosen.filter(
    d => !dosenSudahPunyaKelas.includes(d.id)
  );

  // ================= RENDER =================
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Rencana Studi</Heading>

          {user.permission?.includes("rencana-studi.page") && (
            <Button onClick={openAddModal}>
              + Tambah Kelas
            </Button>
          )}
        </div>

        <TableRencanaStudi
          kelas={kelas}
          mahasiswa={mahasiswa}
          dosen={dosen}
          mataKuliah={mataKuliah}
          selectedMhs={selectedMhs}
          setSelectedMhs={setSelectedMhs}
          selectedDsn={selectedDsn}
          setSelectedDsn={setSelectedDsn}
          handleAddMahasiswa={handleAddMahasiswa}
          handleDeleteMahasiswa={handleDeleteMahasiswa}
          handleChangeDosen={handleChangeDosen}
          handleDeleteKelas={handleDeleteKelas}
        />
      </Card>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        form={form}
        dosen={dosenAvailable}
        mataKuliah={mataKuliah}
      />
    </>
  );
};

export default RencanaStudi;
