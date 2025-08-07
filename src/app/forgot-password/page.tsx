"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Enviar email para:", email);
  }

  return (
    <div
      className="container d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#272C32" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: 400, width: "100%", backgroundColor: "#1f1f1f" }}
      >
        <h1 className="h4 text-center mb-4">Recuperar Senha</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Enviar
          </button>
        </form>

        <div className="text-center mt-3">
          <Link href="/login" className="text-decoration-none">
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
