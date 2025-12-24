import axios from "@/Pages/Layouts/Utils/AxiosInstance";

const BASE_URL = "http://localhost:3001";

export const getAllKelas = () => axios.get(`${BASE_URL}/kelas`);
export const getAllDosen = () => axios.get(`${BASE_URL}/dosen`);
export const getAllMahasiswa = () => axios.get(`${BASE_URL}/mahasiswa`);
export const getAllMataKuliah = () => axios.get(`${BASE_URL}/matakuliah`);
