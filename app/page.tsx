'use client'
import { useEffect } from "react";
import { useStudents } from "./store/useStudents";
// import Image from "next/image";

export default function HomePage() {
  const { filtered, fetchStudents, searchQuery, setSearchQuery } = useStudents();

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Список студентов</h2>

      <input
        type="text"
        placeholder="Поиск по ФИО или email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((student) => (
          <div
            key={student.id}
            className="p-4 bg-white rounded-lg shadow flex gap-4"
          >
            <img
              src={student.image}
              alt={student.fullName}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{student.fullName}</h3>
              <p>Email: {student.email}</p>
              <p>Телефон: {student.phone}</p>
              <p>Адрес: {student.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
