import Image from "next/image";
import Link from "next/link";
import { Game } from "@/types/Game";

export default function GameCard({ game }: { game: Game }) {
    console.log("Game league", game);
  return (
    <div
      className="card p-4 mb-4"
      style={{
        backgroundColor: "#272C32",
        borderRadius: "16px",
        border: "none",
        color: "#ffffff",
      }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">

        <div className="d-flex flex-column gap-2 text-center text-md-start">
          <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
            <Image
              src={game.league.logo_url}
              alt={game.league.name}
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
            />
            <span className="barlow-condensed-regular-white">
              {game.league.name}
            </span>
          </div>
          <span style={{ fontSize: "0.9rem", color: "#aaa" }}>
            {new Date(game.date).toLocaleDateString()}
          </span>
        </div>

        <div className="d-flex flex-column gap-2 text-center">
          <div className="d-flex align-items-center gap-3">
            <Link href={`/team/${game.home_team.id}`}>
              <Image
                src={game.home_team.photo_url}
                alt={game.home_team.name}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </Link>
            <strong>{game.home_goals}</strong>
            <span style={{ fontSize: "1.2rem" }}>x</span>
            <strong>{game.away_goals}</strong>
            <Link href={`/team/${game.away_team.id}`}>
              <Image
                src={game.away_team.photo_url}
                alt={game.away_team.name}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          <div className="d-flex justify-content-between gap-3">
            <span>{game.home_team.name}</span>
            <span>{game.away_team.name}</span>
          </div>
        </div>

        <div className="text-end d-none d-md-block">
          <div>
            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Estádio:</span>
            <br />
            <strong>{game.venue.name}</strong>
          </div>
          <div className="mt-2">
            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Árbitro:</span>
            <br />
            <span>{game.referee.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
