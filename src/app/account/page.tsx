"use client";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8000/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) return <div>Carregando...</div>;

  return (
    <div>
      <h1>
        Bem-vindo, {user.first_name} {user.last_name} ({user.username})
      </h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
