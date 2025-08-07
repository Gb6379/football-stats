"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-dark text-light"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#272C32",
          border: "none",
        }}
      >
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Seu e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                placeholder="Sua senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Cadastrar
            </button>
          </form>

          <div className="text-center mt-3">
            <Link href="/login" className="text-decoration-none text-light">
              Já tenho uma conta
            </Link>
            <br />
            <Link
              href="/forgot-password"
              className="text-decoration-none text-secondary"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
