import Image from "next/image";
import Link from "next/link";
import { TeamStatistics } from "../../types/TeamStatistics";
import { ArrowRight } from 'lucide-react';
type TeamMatchesListProps = {
  statistics: TeamStatistics[];
};

export default function TeamMatchesList({ statistics }: TeamMatchesListProps) {
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
        flexDirection: "column",
      }}
    >
      <h2 className="h4 text-center mb-4 anton-regular-white">Partidas</h2>

      <div className="list-group" style={{ flexGrow: 1, overflowY: "auto" }}>
        {statistics.map((stat, idx) => {
          const { game } = stat;

          const dateStr = new Date(game.date).toLocaleDateString("pt-BR");
          const timeStr = new Date(game.date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const showCompetitionName =
            idx === 0 ||
            statistics[idx - 1].game.league.name !== game.league.name;

          return (
            <div key={stat.id}>
              {showCompetitionName && (
                <div
                  className="d-flex align-items-center mb-2"
                  style={{ fontSize: "0.8rem", color: "#ccc" }}
                >
                  <Image
                    src={game.league.logo_url}
                    alt={game.league.name}
                    width={18}
                    height={18}
                    style={{ objectFit: "contain", marginRight: 6 }}
                  />
                  <span className="barlow-condensed-regular-white">
                    {game.league.name}
                  </span>
                  <Link
                    href={`/game/${game.id}`}
                    className="text-sm text-white bg-[#3a3f45] px-2 py-1 rounded hover:bg-[#4a4f55] flex items-center gap-1"
                  >
                    Ver partida <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              <div
                className="d-flex align-items-center"
                style={{
                  borderRadius: 8,
                  padding: "8px 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "0.75rem",
                    width: 64,
                    color: "#aaa",
                    textAlign: "center",
                    marginRight: 16,
                    userSelect: "none",
                  }}
                >
                  <span>{dateStr}</span>
                  <span>{timeStr}</span>
                </div>

                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2 flex-nowrap">
                      <Link href={`/team/${game.home_team.id}`}>
                        <Image
                          src={game.home_team.photo_url}
                          alt={game.home_team.name}
                          width={24}
                          height={24}
                          style={{ objectFit: "contain", cursor: "pointer" }}
                        />
                      </Link>
                      <span className="barlow-condensed-regular-white">
                        {game.home_team.name}
                      </span>
                    </div>
                    <span style={{ fontWeight: "bold", minWidth: 18 }}>
                      {game.home_goals}
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <Link href={`/team/${game.away_team.id}`}>
                        <Image
                          src={game.away_team.photo_url}
                          alt={game.away_team.name}
                          width={24}
                          height={24}
                          style={{ objectFit: "contain", cursor: "pointer" }}
                        />
                      </Link>
                      <span className="barlow-condensed-regular-white">
                        {game.away_team.name}
                      </span>
                    </div>
                    <span style={{ fontWeight: "bold", minWidth: 18 }}>
                      {game.away_goals}
                    </span>
                  </div>
                </div>
              </div>

              {idx < statistics.length - 1 && (
                <hr
                  style={{
                    border: "none",
                    borderBottom: "1px solid #3a3f44",
                    margin: "12px 0",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
