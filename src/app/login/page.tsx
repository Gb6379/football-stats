"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Usuário ou senha inválidos");
      return;
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    router.push("/account");
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light px-3">
      <div
        className="card border-0 shadow-lg p-4 w-100"
        style={{ maxWidth: 420, backgroundColor: "#1f1f1f" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#f8f9fa" }}>
          Bem-vindo de volta
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              Usuário
            </label>
            <input
              id="username"
              className="form-control bg-dark text-light border-secondary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="form-control bg-dark text-light border-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 small text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-outline-light w-100 fw-semibold"
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none text-secondary small">
            Esqueci minha senha
          </a>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">
          <span className="small text-muted">Não tem conta? </span>
          <a
            href="/register"
            className="text-decoration-none text-info small fw-semibold"
          >
            Crie agora
          </a>
        </div>
      </div>
    </div>
  );
}
