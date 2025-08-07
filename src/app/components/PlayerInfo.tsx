import { getCountryFlagUrl } from "../functions/getFlag";
import { Player } from "@/types/Player";
import calcularIdade from "../functions/getAge";
import Image from "next/image";

export default function PlayerInfoCard({ player }: { player: Player }) {
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
                src={getCountryFlagUrl(player.nationality)}
                alt={`${player.nationality} flag`}
                width={24}
                height={16}
                style={{ objectFit: "cover", borderRadius: 3 }}
              />
              <span style={{ fontWeight: "bold" }}>{player.nationality}</span>
            </div>
          ),
        },
        {
          label: "Idade",
          content: (
            <>
              <div className="fw-bold">
                {calcularIdade(player.birth_date)} anos
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {new Date(player.birth_date).toLocaleDateString("pt-BR")}
              </div>
            </>
          ),
        },
        {
          label: "Altura",
          content: <div className="fw-bold">{player.height}cm</div>,
        },
        {
          label: "Peso",
          content: <div className="fw-bold">{player.weight}kg</div>,
        },
        {
          label: "Posição",
          content: <div className="fw-bold">{player.position}</div>,
        },
        {
          label: "Camisa",
          content: <div className="fw-bold">{player.number}</div>,
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
