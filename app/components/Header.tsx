// components/Header.tsx
"use client";

import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { cn } from "../lib/cn";
import Link from "next/link";

export default function Header() {
const { user, loginUser, logout } = useAuth();

return (
  <header className="flex justify-between items-center p-4 shadow">
    <h1 className="text-xl font-bold">Студенты</h1>
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span>Привет, {user.username || "Гость"}</span>
          <button onClick={() => logout()}>Выйти</button>
          <Link href="/admin">Админ</Link>
        </>
      ) : (
        <button onClick={() => loginUser("admin@site.com", "123456789")}>
          Войти
        </button>
      )}
    </div>
  </header>
);
}
