"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@/types/Player";

export default function PlayerPage() {
  const [busca, setBusca] = useState("");
  const [jogadores, setJogadores] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (busca.trim() === "") {
      setJogadores([]);
      setError(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/player?search=${encodeURIComponent(busca)}`
        );
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        setJogadores(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError("Erro ao buscar jogadores");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [busca]);

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: 1000,
        backgroundColor: "#272C32",
        borderRadius: 16,
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h1 className="text-center mb-4 anton-regular-white">Buscar Jogadores</h1>

      <input
        type="search"
        className="form-control mb-4"
        placeholder="Digite o nome do jogador"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        aria-label="Busca de jogadores"
        autoFocus
        style={{
          backgroundColor: "#1f2327",
          color: "#fff",
          border: "1px solid #444",
          borderRadius: 12,
        }}
      />

      {loading && (
        <div className="text-center mb-3" aria-live="polite">
          Carregando...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && jogadores.length === 0 && busca.trim() !== "" && (
        <p className="text-center text-muted">Nenhum jogador encontrado.</p>
      )}

      <div className="d-flex flex-column gap-3">
        {jogadores.map((jogador) => (
          <Link
            href={`/player/${jogador.id}`}
            key={jogador.id}
            className="text-decoration-none"
          >
            <div
              className="d-flex align-items-center"
              style={{
                backgroundColor: "#1f2327",
                borderRadius: 12,
                padding: "0.75rem 1rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#2f353c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1f2327")
              }
            >
              <div style={{ flexShrink: 0 }}>
                <Image
                  src={jogador.photo_url}
                  alt={`Foto de ${jogador.name}`}
                  width={60}
                  height={60}
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
              </div>
              <div className="flex-grow-1 px-3">
                <h5 className="mb-1 text-white">{jogador.name}</h5>
                {jogador.actual_team && (
                  <p className="mb-0 barlow-condensed-semibold text-white" style={{ fontSize: "0.9rem" }}>
                    Time: {jogador.actual_team.name}
                  </p>
                )}
              </div>
              {jogador.actual_team?.photo_url && (
                <div style={{ flexShrink: 0 }}>
                  <Image
                    src={jogador.actual_team.photo_url}
                    alt={`Logo do ${jogador.actual_team.name}`}
                    width={40}
                    height={40}
                    className="rounded"
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
