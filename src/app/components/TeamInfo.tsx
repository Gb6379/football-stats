import { getCountryFlagUrl } from "../functions/getFlag";
import { Team } from "@/types/Team";
import Image from "next/image";

export default function TeamInfoCard({ team }: { team: Team }) {
  return (
    <div
      className="mb-4"
      style={{
        width: "100%",
        boxSizing: "border-box",
        color: "#fff",
        backgroundColor: "#272C32",
        borderRadius: 16,
        padding: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <h2
        className="h4 text-center anton-regular-white"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        Informações
      </h2>

      {[
        {
          label: "Nacionalidade",
          content: (
            <div className="d-flex align-items-center justify-content-center gap-1 mt-1">
              <Image
                src={getCountryFlagUrl(team.country)}
                alt={`${team.country} flag`}
                width={24}
                height={16}
                style={{ objectFit: "cover", borderRadius: 3 }}
              />
              <span style={{ fontWeight: "bold" }}>{team.country}</span>
            </div>
          ),
        },
        {
          label: "Fundação",
          content: (
            <>
              <div className="fw-bold">{team.founded}</div>
            </>
          ),
        },
        {
          label: "Sigla",
          content: <div className="fw-bold">{team.code}</div>,
        },
      ].map(({ label, content }) => (
        <div
          key={label}
          className="mb-4"
          style={{ width: "30%", minWidth: 100, textAlign: "center" }}
        >
          <div style={{ fontSize: 13, opacity: 0.8 }}>{label}</div>
          {content}
        </div>
      ))}
    </div>
  );
}
