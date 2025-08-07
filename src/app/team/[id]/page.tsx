"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Team } from "@/types/Team";
import { TeamStatistics } from "@/types/TeamStatistics";
import TeamCard from "@/app/components/TeamCard";
import TeamMatchesList from "@/app/components/TeamMatches";
import TeamStatProgression from "@/app/components/TeamStats";
import TeamInfoCard from "@/app/components/TeamInfo";

export default function PlayerDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [team, setTeam] = useState<Team | null>(null);
  const [statistics, setStatistics] = useState<TeamStatistics[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shotsCardProgression = statistics?.map((s) => s.shots) || [];
  const shotsOnCardProgression = statistics?.map((s) => s.shots_on) || [];
  const shotsOffCardProgression = statistics?.map((s) => s.shots_off) || [];
  const blockedShotsCardProgression = statistics?.map((s) => s.blocked_shots) || [];
  const shotsInsideCardProgression = statistics?.map((s) => s.shots_inside_box) || [];
  const shotsOutsideCardProgression = statistics?.map((s) => s.shots_outside_box) || [];
  const foulsCardProgression = statistics?.map((s) => s.fouls) || [];
  const cornersCardProgression = statistics?.map((s) => s.corners) || [];
  const offsidesCardProgression = statistics?.map((s) => s.offsides) || [];
  const ballPossessionCardProgression = statistics?.map((s) => s.ball_possession) || [];
  const passesCardProgression = statistics?.map((s) => s.total_passes) || [];
  const accuracyCardProgression = statistics?.map((s) => s.passes_porcentage) || [];
  const yellowCardProgression = statistics?.map((s) => s.yellow_cards) || [];
  const redCardProgression = statistics?.map((s) => s.red_cards) || [];
  const savesCardProgression = statistics?.map((s) => s.goalkeeper_saves) || [];

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`http://127.0.0.1:8000/api/team/${id}`),
      fetch(`http://127.0.0.1:8000/api/team-statistic/${id}`),
    ])
      .then(async ([teamRes, statsRes]) => {
        if (!teamRes.ok)
          throw new Error(`Erro ao buscar jogador: ${teamRes.status}`);
        if (!statsRes.ok)
          throw new Error(`Erro ao buscar estatísticas: ${statsRes.status}`);

        const teamData = await teamRes.json();
        const statsData = await statsRes.json();

        setTeam(teamData);
        setStatistics(statsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Carregando...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Erro: {error}</p>;
  if (!team)
    return (
      <p className="text-center mt-10 text-gray-500">Jogador não encontrado.</p>
    );

    console.log("Team statis", statistics);

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-md">
      <TeamCard team={team} />

      <div className="row mt-4 g-4">
        <div className="col-12 col-md-6">
          {statistics && <TeamMatchesList statistics={statistics} />}
        </div>

          <div className="col-12 col-md-6">
              <TeamInfoCard team={team} />
          </div>
      </div>

      <div style={{ marginTop: "2rem", width: "100%" }}>
        <TeamStatProgression
          yellowCardProgression={yellowCardProgression}
          redCardProgression={redCardProgression}
          shotsCardProgression={shotsCardProgression}
          shotsOnCardProgression={shotsOnCardProgression}
          shotsOffCardProgression={shotsOffCardProgression}
          blockedShotsCardProgression={blockedShotsCardProgression}
          shotsInsideCardProgression={shotsInsideCardProgression}
          shotsOutsideCardProgression={shotsOutsideCardProgression}
          foulsCardProgression={foulsCardProgression}
          cornersCardProgression={cornersCardProgression}
          offsidesCardProgression={offsidesCardProgression}
          ballPossessionCardProgression={ballPossessionCardProgression}
          passesCardProgression={passesCardProgression}
          accuracyCardProgression={accuracyCardProgression}
          savesCardProgression={savesCardProgression}
        />
      </div>
    </div>
  );
}
