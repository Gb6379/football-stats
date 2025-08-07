"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Player } from "@/types/Player";
import { PlayerStatistic } from "@/types/PlayerStatistic";
import PlayerCard from "@/app/components/PlayerCard";
import PlayerInfoCard from "@/app/components/PlayerInfo";
import PlayerMatchesList from "@/app/components/PlayerMatches";
import PlayerStatsProgression from "@/app/components/PlayerStats";

export default function PlayerDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [player, setPlayer] = useState<Player | null>(null);
  const [statistics, setStatistics] = useState<PlayerStatistic[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`http://127.0.0.1:8000/api/player/${id}`),
      fetch(`http://127.0.0.1:8000/api/player-statistic/${id}`),
    ])
      .then(async ([playerRes, statsRes]) => {
        if (!playerRes.ok)
          throw new Error(`Erro ao buscar jogador: ${playerRes.status}`);
        if (!statsRes.ok)
          throw new Error(`Erro ao buscar estatísticas: ${statsRes.status}`);

        const playerData = await playerRes.json();
        const statsData = await statsRes.json();

        setPlayer(playerData);
        setStatistics(statsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Carregando...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Erro: {error}</p>;
  if (!player)
    return (
      <p className="text-center mt-10 text-gray-500">Jogador não encontrado.</p>
    );

  const yellowCardProgression = statistics?.map((s) => s.yellow_card) || [];
  const redCardProgression = statistics?.map((s) => s.red_card) || [];
  const minPlayedCardProgression = statistics?.map((s) => s.min_played) || [];
  const offsidesCardProgression = statistics?.map((s) => s.offsides) || [];
  const ratingCardProgression = statistics?.map((s) => s.rating) || [];
  const shotsCardProgression = statistics?.map((s) => s.shots) || [];
  const shotsOnGoalCardProgression = statistics?.map((s) => s.shots_on_goal) || [];
  const goalsCardProgression = statistics?.map((s) => s.goals) || [];
  const goalsConcedeedCardProgression = statistics?.map((s) => s.goals_conceded) || [];
  const assistsCardProgression = statistics?.map((s) => s.assists) || [];
  const savesCardProgression = statistics?.map((s) => s.saves) || [];
  const passesCardProgression = statistics?.map((s) => s.passes) || [];
  const accuracyCardProgression = statistics?.map((s) => s.accuracy) || [];
  const duelsCardProgression = statistics?.map((s) => s.duels) || [];
  const duelsWonCardProgression = statistics?.map((s) => s.duels_won) || [];
  const tacklesCardProgression = statistics?.map((s) => s.tackles) || [];
  const blocksCardProgression = statistics?.map((s) => s.blocks) || [];
  const interceptionsCardProgression = statistics?.map((s) => s.interceptions) || [];
  const dribblesAttemptCardProgression = statistics?.map((s) => s.dribbles_attempts) || [];
  const dribblesSuccessCardProgression = statistics?.map((s) => s.dribbles_success) || [];
  const dribblesPastCardProgression = statistics?.map((s) => s.dribbles_past) || [];
  const foulsDrownCardProgression = statistics?.map((s) => s.fouls_drown) || [];
  const foulsComittedCardProgression = statistics?.map((s) => s.fouls_committed) || [];
  const penaltyWonCardProgression = statistics?.map((s) => s.penalty_won) || [];
  const penaltyCommittedCardProgression = statistics?.map((s) => s.penalty_committed) || [];
  const penaltyScoredCardProgression = statistics?.map((s) => s.penalty_scored) || [];
  const penaltyMissedCardProgression = statistics?.map((s) => s.penalty_missed) || [];
  const penaltySavedCardProgression = statistics?.map((s) => s.penalty_saved) || [];

return (
  <div className="max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-md">
    <PlayerCard player={player} />

    <div className="row mt-4 g-4">
      <div className="col-12 col-md-6">
        {statistics && <PlayerMatchesList statistics={statistics} />}
      </div>

      <div className="col-12 col-md-6">
        <PlayerInfoCard player={player} />
      </div>
    </div>

    <div style={{ marginTop: "2rem", width: "100%" }}>
      {statistics && (
        <PlayerStatsProgression
          yellowCardProgression={yellowCardProgression}
          redCardProgression={redCardProgression}
          minPlayedCardProgression={minPlayedCardProgression}
          offsidesCardProgression={offsidesCardProgression}
          ratingCardProgression={ratingCardProgression}
          shotsCardProgression={shotsCardProgression}
          shotsOnGoalCardProgression={shotsOnGoalCardProgression}
          goalsCardProgression={goalsCardProgression}
          goalsConcedeedCardProgression={goalsConcedeedCardProgression}
          assistsCardProgression={assistsCardProgression}
          savesCardProgression={savesCardProgression}
          passesCardProgression={passesCardProgression}
          accuracyCardProgression={accuracyCardProgression}
          duelsCardProgression={duelsCardProgression}
          duelsWonCardProgression={duelsWonCardProgression}
          tacklesCardProgression={tacklesCardProgression}
          blocksCardProgression={blocksCardProgression}
          interceptionsCardProgression={interceptionsCardProgression}
          dribblesAttemptCardProgression={dribblesAttemptCardProgression}
          dribblesSuccessCardProgression={dribblesSuccessCardProgression}
          dribblesPastCardProgression={dribblesPastCardProgression}
          foulsDrownCardProgression={foulsDrownCardProgression}
          foulsComittedCardProgression={foulsComittedCardProgression}
          penaltyWonCardProgression={penaltyWonCardProgression}
          penaltyCommittedCardProgression={penaltyCommittedCardProgression}
          penaltyScoredCardProgression={penaltyScoredCardProgression}
          penaltyMissedCardProgression={penaltyMissedCardProgression}
          penaltySavedCardProgression={penaltySavedCardProgression}
        />
      )}
    </div>
  </div>
);


}
