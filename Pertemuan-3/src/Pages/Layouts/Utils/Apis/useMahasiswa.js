import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Pages/Layouts/Utils/Apis/MahasiswaApi";

/* ================= GET ================= */
export const useMahasiswa = (query = {}) =>
  useQuery({
    queryKey: ["mahasiswa", query],
    queryFn: () => getAllMahasiswa(query),
    select: (res) => ({
      data: res.data || [],
      total: parseInt(res.headers["x-total-count"] || "0", 10),
    }),
    keepPreviousData: true,
  });

/* ================= CREATE ================= */
export const useStoreMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });
};

/* ================= UPDATE ================= */
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });
};

/* ================= DELETE ================= */
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });
};
