import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Pages/Layouts/Utils/Context/AuthContext";

const TableMahasiswa = ({
  data = [],
  isLoading = false,
  onEdit,
  onDelete,
  onDetail,
  getTotalSks,
}) => {
  const { user } = useAuthStateContext();

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Max SKS</th>
          <th className="py-2 px-4 text-center">Total SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {isLoading && (
          <tr>
            <td colSpan="5" className="py-4 text-center text-gray-500">
              Memuat data...
            </td>
          </tr>
        )}

        {!isLoading && data.length === 0 && (
          <tr>
            <td colSpan="5" className="py-4 text-center text-gray-500">
              Data mahasiswa tidak tersedia
            </td>
          </tr>
        )}

        {!isLoading &&
          data.length > 0 &&
          data.map((mhs, index) => {
            const totalSks = getTotalSks
              ? getTotalSks(mhs.id)
              : 0;

            return (
              <tr
                key={mhs.id}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.name}</td>

                <td className="py-2 px-4 text-center">
                  {mhs.max_sks}
                </td>

                <td
                  className={`py-2 px-4 text-center font-semibold ${
                    totalSks > mhs.max_sks
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {totalSks}
                </td>

                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onDetail(mhs.id)}
                  >
                    Detail
                  </Button>

                  {user.permission?.includes("mahasiswa.update") && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => onEdit(mhs)}
                    >
                      Edit
                    </Button>
                  )}

                  {user.permission?.includes("mahasiswa.delete") && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(mhs.id)}
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableMahasiswa;
