"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Team } from "@/types/Team";
import { getCountryFlagUrl } from "@/app/functions/getFlag"; // importe a função corretamente

export default function TeamsListPage() {
  const [busca, setBusca] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (busca.trim() === "") {
      setTeams([]);
      setError(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/team?search=${encodeURIComponent(busca)}`
        );
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        setTeams(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError("Erro ao buscar times");
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
      <h1 className="text-center mb-4 anton-regular-white">Buscar Times</h1>

      <input
        type="search"
        className="form-control mb-4"
        placeholder="Digite o nome do time"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        aria-label="Busca de times"
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

      {!loading && !error && teams.length === 0 && busca.trim() !== "" && (
        <p className="text-center text-muted">Nenhum time encontrado.</p>
      )}

      <div className="d-flex flex-column gap-3">
        {teams.map((team: Team) => (
          <Link
            href={`/team/${team.id}`}
            key={team.id}
            className="text-decoration-none"
          >
            <div
              className="d-flex align-items-center justify-content-between"
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
              <div
                className="d-flex align-items-center"
                style={{ gap: "1rem" }}
              >
                <Image
                  src={team.photo_url}
                  alt={`Logo do ${team.name}`}
                  width={60}
                  height={60}
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
                <div>
                  <h5 className="mb-1 text-white">{team.name}</h5>
                  <p
                    className="mb-0 barlow-condensed-semibold text-white"
                    style={{ fontSize: "0.9rem" }}
                  >
                    País: {team.country}
                  </p>
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                <Image
                  src={getCountryFlagUrl(team.country)}
                  alt={`Bandeira de ${team.country}`}
                  width={40}
                  height={25}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
