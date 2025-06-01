// lib/auth.ts
import axios from "axios";

const API_URL = "http://localhost:1337/api";


export const login = async (identifier: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/local`, {
    identifier,
    password,
  });

  const jwt = res.data.jwt;

  // Делаем второй запрос, чтобы получить данные пользователя с ролью
  const profile = await axios.get(`${API_URL}/users/me?populate=role`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    jwt,
    user: profile.data,
  };
};
