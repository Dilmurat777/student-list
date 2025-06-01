// store/useStudents.ts
import { create } from 'zustand';
import { Student } from '../types/student';
import { fetchStudents as fetchFromApi  } from '../lib/axios';

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



export const useStudents = create<StudentStore>((set, get) => ({
  students: [],
  filtered: [],
  currentPage: 1,
  perPage: 4,
  searchQuery: '',


    fetchStudents: async () => {
    const data = await fetchFromApi();
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
