// components/Header.tsx
"use client";

import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { cn } from "@/lib/cn";

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-white shadow py-4 mb-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Student List</h1>
        <div className="flex items-center gap-4">
          {user?.role === "admin" && (
            <button className="text-blue-600 hover:underline flex items-center gap-1">
              <ShieldCheck size={18} /> Админ-панель
            </button>
          )}
          {user ? (
            <button
              className="flex items-center gap-1 text-red-600 hover:underline"
              onClick={logout}
            >
              <LogOut size={18} /> Выйти
            </button>
          ) : (
            <button
              className="flex items-center gap-1 text-green-600 hover:underline"
              onClick={login}
            >
              <LogIn size={18} /> Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
