"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/useAuth"; 
import AdminPanel from "../components/AdminPanel"; 
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { user, jwt } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !jwt) {
      router.push("/");
      return;
    }

    if (user?.email !== "admin@site.com") {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [user, jwt]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Админка студентов 👨‍💼</h1>
      <AdminPanel jwt ={jwt} />
    </div>
  );
}
