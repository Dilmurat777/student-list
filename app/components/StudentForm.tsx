import { useState, useEffect } from 'react';
import axios from 'axios';
// import { toast } from 'sonner';
import toast from 'react-hot-toast';
const API_URL = 'http://localhost:1337/api';

export default function StudentForm({
  jwt,
  editingStudent,
  onSuccess,
}: {
  jwt: string;
  editingStudent: any;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

useEffect(() => {
  if (editingStudent) {
    setForm({
      fullName: editingStudent.fullName,
      email: editingStudent.email,
      phone: editingStudent.phone,
      address: editingStudent.address,
    });
  } else {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      address: '',
    });
  }
 
}, [editingStudent]);


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingStudent) {

        await axios.put(
          `${API_URL}/students/${editingStudent.id}`,
          {
            data: form,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          },
          
        );
        toast.success('Обновлено');
      } else {
        await axios.post(
          `${API_URL}/students`,
          {
            data: form,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          },
        );
        toast.success('Добавлено');
      }
      onSuccess();
    } catch (err) {
      toast.error('Ошибка');
    }
    setForm({
      fullName: '',
      email: '',
      phone: '',
      address: '',
    })
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
      <input
        name="fullName"
        placeholder="ФИО"
        value={form.fullName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="phone"
        placeholder="Телефон"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="address"
        placeholder="Адрес"
        value={form.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingStudent ? 'Сохранить' : 'Добавить'}
      </button>
      
    </form>
  );
}
