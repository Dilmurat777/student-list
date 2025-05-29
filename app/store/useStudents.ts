// store/useStudents.ts
import { create } from 'zustand';
import { Student } from '../types/student';

interface StudentStore {
  students: Student[];
  filtered: Student[];
  currentPage: number;
  perPage: number;
  searchQuery: string;
  fetchStudents: () => void;
  setSearchQuery: (query: string) => void;
  setPage: (perPage: number) => void;
}

const mockStudents: Student[] = [
  {
    id: '1',
    fullName: 'Алия Абдуллаева',
    email: 'aliya@example.com',
    phone: '+996700111222',
    address: 'г. Бишкек, ул. Ленина 45',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    fullName: 'Дастан Исмаилов',
    email: 'dastan@example.com',
    phone: '+996700333444',
    address: 'г. Ош, ул. Мамбетова 10',
    image: 'https://via.placeholder.com/100',
  },
    {
    id: '3',
    fullName: 'Алия Абдуллаева',
    email: 'aliya@example.com',
    phone: '+996700111222',
    address: 'г. Бишкек, ул. Ленина 45',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '4',
    fullName: 'Дастан Исмаилов',
    email: 'dastan@example.com',
    phone: '+996700333444',
    address: 'г. Ош, ул. Мамбетова 10',
    image: 'https://via.placeholder.com/100',
  },
    {
    id: '5',
    fullName: 'Алия Абдуллаева',
    email: 'aliya@example.com',
    phone: '+996700111222',
    address: 'г. Бишкек, ул. Ленина 45',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '6',
    fullName: 'Дастан Исмаилов',
    email: 'dastan@example.com',
    phone: '+996700333444',
    address: 'г. Ош, ул. Мамбетова 10',
    image: 'https://via.placeholder.com/100',
  },
];

export const useStudents = create<StudentStore>((set, get) => ({
  students: [],
  filtered: [],
  currentPage: 1,
  perPage: 4,
  searchQuery: '',
  fetchStudents: () => {
    const data = mockStudents;
    set({ students: data, filtered: data });
  },
  setSearchQuery: (query) => {
    const { students } = get();
    const filtered = students.filter((student) =>
      [student.fullName, student.email].some((field) =>
        field.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    set({ searchQuery: query, filtered });
  },
  setPage: (page) => set({ currentPage: page }),
}));
