// lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:1337/api";

export const fetchStudents = async () => {
  const res = await axios.get(`${API_URL}/students?populate=image`);
  return res.data.data.map((student: any) => ({
    id: student.id,
    fullName: student.fullName,
    email: student.email,
    phone: student.phone,
    address: student.address,
    image: student.image?.url || "/default.jpg",
  }));
};
