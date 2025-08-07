import Image from "next/image";
import Link from "next/link"; 
import { Player } from "@/types/Player";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div
      className="card p-4 mb-4"
      style={{
        backgroundColor: "#272C32",
        borderRadius: "16px",
        border: "none",
      }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
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
              src={player.photo_url}
              alt={player.name}
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
            <h1 className="h4 mb-2 anton-regular-white">{player.name}</h1>

            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <Link href={`/team/${player.actual_team.id}`} passHref>
                  <Image
                    src={player.actual_team.photo_url}
                    alt={player.actual_team.name}
                    width={30}
                    height={30}
                    style={{ objectFit: "contain" }}
                  />
              </Link>
              <span className="barlow-condensed-regular-white">
                {player.actual_team.name}
              </span>
            </div>
          </div>
        </div>

        {player.last_teams && player.last_teams.length > 0 && (
          <div className="d-flex flex-wrap justify-content-end gap-2">
            {player.last_teams
              .filter((team) => team.id !== player.actual_team.id)
              .map((team) => (
                <Link key={team.id} href={`/team/${team.id}`} passHref>
                    <Image
                      src={team.photo_url}
                      alt={team.name}
                      width={30}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
