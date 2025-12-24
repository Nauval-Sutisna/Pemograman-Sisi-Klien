// ChartApi.jsx
import axios from "@/Pages/Layouts/Utils/AxiosInstance";

export const getAllChartData = () => axios.get("/chart");