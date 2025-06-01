'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import StudentForm from './StudentForm';

const API_URL = 'http://localhost:1337/api';

export default function AdminPanel({ jwt }: { jwt: string }) {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  console.log('Все студенты:', students);

  const fetchStudents = async () => {
    const res = await axios.get(`${API_URL}/students?populate=*`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    setStudents(res.data.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/students/${id}?populate=*`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    toast.success('Удалено');
    fetchStudents();
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <StudentForm
        jwt={jwt}
        editingStudent={editingStudent}
        onSuccess={() => {
          setEditingStudent(null);
          fetchStudents();
        }}
      />
      {editingStudent && (
  <button
    className="bg-gray-500 text-white px-4 py-1 rounded"
    onClick={() => setEditingStudent(null)}
  >
    Отмена редактирования
  </button>
)}

      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={fetchStudents}>
        🔄 Обновить список
      </button>

      <h2 className="text-xl font-bold mt-8 mb-4">Список студентов</h2>
      <ul className="space-y-2">
        {students.map((student: any) => (
          <li
            key={student.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <strong>
                {student.fullName} (ID: {student.id})
              </strong>
              <br />
              {student.email}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => {
                  console.log('НАЖАТ РЕДАКТИРОВАТЬ:', student.id, student.fullName);
                  setEditingStudent(student);
                }}>
                Редактировать
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(student.id)}>
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
