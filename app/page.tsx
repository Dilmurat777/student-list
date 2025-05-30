'use client';
import { useEffect } from 'react';
import { useStudents } from './store/useStudents';
// import Image from "next/image";

export default function HomePage() {
  const {
    filtered,
    fetchStudents,
    searchQuery,
    setSearchQuery,
    currentPage,
    perPage,
    setPage,
  } = useStudents();

  useEffect(() => {
    fetchStudents();
  }, []);

  console.log(filtered);
  

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

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
        {paginated.map((student) => (
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

      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
