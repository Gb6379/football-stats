import Image from "next/image";
import { Team } from "@/types/Team";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <div
      className="card p-4 mb-4"
      style={{
        backgroundColor: "#272C32",
        borderRadius: "16px",
        border: "none",
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center gap-4">
        <div
          style={{
            borderRadius: "50%",
            padding: "4px",
            backgroundColor: "#171C1F",
            display: "inline-block",
          }}
        >
          <Image
            src={team.photo_url}
            alt={team.name}
            width={100}
            height={100}
            className="rounded-circle"
            style={{
              objectFit: "cover",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="d-flex flex-column text-center text-md-start">
          <h1 className="h4 mb-2 anton-regular-white">{team.name}</h1>
        </div>
      </div>
    </div>
  );
}
