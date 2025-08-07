"use client";
import { useParams } from "next/navigation";
import { Game } from "@/types/Game";
import GameCard from "@/app/components/GameCard";
import { useEffect, useState } from "react";
import TeamStatProgression from "@/app/components/TeamStats";

export default function GameDetailPage() {
    const params = useParams();
    const id = params?.id;
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
        
      useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        Promise.all([
          fetch(`http://127.0.0.1:8000/api/game/${id}`)
        ])
          .then(async ([playerRes]) => {
            if (!playerRes.ok)
              throw new Error(`Erro ao buscar jogador: ${playerRes.status}`);

            const playerData = await playerRes.json();

            setGame(playerData);
            // setStatistics(statsData);
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      }, [id]);

    if (loading)
        return <p className="text-center mt-10 text-lg">Carregando...</p>;
    if (error)
        return (
        <p className="text-center mt-10 text-red-600">Erro: {error}</p>
        );
    if (!game)
        return (
        <p className="text-center mt-10 text-gray-500">
            Jogo não encontrado.
        </p>
        );

    const defaultStats = {
        shots: 0,
        shots_on: 0,
        shots_off: 0,
        blocked_shots: 0,
        shots_inside_box: 0,
        shots_outside_box: 0,
        fouls: 0,
        corners: 0,
        offsides: 0,
        ball_possession: 0,
        total_passes: 0,
        passes_porcentage: 0,
        yellow_cards: 0,
        red_cards: 0,
        goalkeeper_saves: 0,
        is_home_team: false,
    };

    const homeStats = game.statistics?.find((s) => s.is_home_team) || defaultStats;
    const awayStats = game.statistics?.find((s) => !s.is_home_team) || defaultStats;

    if (!homeStats || !awayStats) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Estatísticas não disponíveis.
            </p>
        );
    }

    console.log("Home Stats", homeStats);
    console.log("Away Stats", awayStats);

    // Home team statistics
    const shotsCardProgressionHome = [homeStats.shots || 0];
    const shotsOnCardProgressionHome = [homeStats.shots_on || 0];
    const shotsOffCardProgressionHome = [homeStats.shots_off || 0];
    const blockedShotsCardProgressionHome = [homeStats.blocked_shots || 0];
    const shotsInsideCardProgressionHome = [homeStats.shots_inside_box || 0];
    const shotsOutsideCardProgressionHome = [homeStats.shots_outside_box || 0];
    const foulsCardProgressionHome = [homeStats.fouls || 0];
    const cornersCardProgressionHome = [homeStats.corners || 0];
    const offsidesCardProgressionHome = [homeStats.offsides || 0];
    const ballPossessionCardProgressionHome = [homeStats.ball_possession || 0];
    const passesCardProgressionHome = [homeStats.total_passes || 0];
    const accuracyCardProgressionHome = [homeStats.passes_porcentage || 0];
    const yellowCardProgressionHome = [homeStats.yellow_cards || 0];
    const redCardProgressionHome = [homeStats.red_cards || 0];
    const savesCardProgressionHome = [homeStats.goalkeeper_saves || 0];

    // Away team statistics
    const shotsCardProgressionAway = [awayStats.shots || 0];
    const shotsOnCardProgressionAway = [awayStats.shots_on || 0];
    const shotsOffCardProgressionAway = [awayStats.shots_off || 0];
    const blockedShotsCardProgressionAway = [awayStats.blocked_shots || 0];
    const shotsInsideCardProgressionAway = [awayStats.shots_inside_box || 0];
    const shotsOutsideCardProgressionAway = [awayStats.shots_outside_box || 0];
    const foulsCardProgressionAway = [awayStats.fouls || 0];
    const cornersCardProgressionAway = [awayStats.corners || 0];
    const offsidesCardProgressionAway = [awayStats.offsides || 0];
    const ballPossessionCardProgressionAway = [awayStats.ball_possession || 0];
    const passesCardProgressionAway = [awayStats.total_passes || 0];
    const accuracyCardProgressionAway = [awayStats.passes_porcentage || 0];
    const yellowCardProgressionAway = [awayStats.yellow_cards || 0];
    const redCardProgressionAway = [awayStats.red_cards || 0];
    const savesCardProgressionAway = [awayStats.goalkeeper_saves || 0];

    return (
      <div className="max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-md">
        <GameCard game={game} />

        <div className="row mt-4 g-4">
          <div className="col-12 col-md-6">
            {homeStats && (
              <TeamStatProgression
                teamName={game.home_team.name}
                teamLogoUrl={game.home_team.photo_url}
                yellowCardProgression= {yellowCardProgressionHome}
                redCardProgression= {redCardProgressionHome}
                shotsCardProgression={shotsCardProgressionHome}
                shotsOnCardProgression={shotsOnCardProgressionHome}
                shotsOffCardProgression={shotsOffCardProgressionHome}
                blockedShotsCardProgression={blockedShotsCardProgressionHome}
                shotsInsideCardProgression={shotsInsideCardProgressionHome}
                shotsOutsideCardProgression={shotsOutsideCardProgressionHome}
                foulsCardProgression={foulsCardProgressionHome}
                cornersCardProgression={cornersCardProgressionHome}
                offsidesCardProgression={offsidesCardProgressionHome}
                ballPossessionCardProgression={ballPossessionCardProgressionHome}
                passesCardProgression={passesCardProgressionHome}
                accuracyCardProgression={accuracyCardProgressionHome}
                savesCardProgression={savesCardProgressionHome}
              />
            )}
          </div>

          <div className="col-12 col-md-6">
            {awayStats && (
              <TeamStatProgression
                teamName= {game.away_team.name}
                teamLogoUrl= {game.away_team.photo_url}
                yellowCardProgression= {yellowCardProgressionAway}
                redCardProgression= {redCardProgressionAway}
                shotsCardProgression={shotsCardProgressionAway}
                shotsOnCardProgression={shotsOnCardProgressionAway}
                shotsOffCardProgression={shotsOffCardProgressionAway}
                blockedShotsCardProgression={blockedShotsCardProgressionAway}
                shotsInsideCardProgression={shotsInsideCardProgressionAway}
                shotsOutsideCardProgression={shotsOutsideCardProgressionAway}
                foulsCardProgression={foulsCardProgressionAway}
                cornersCardProgression={cornersCardProgressionAway}
                offsidesCardProgression={offsidesCardProgressionAway}
                ballPossessionCardProgression={ballPossessionCardProgressionAway}
                passesCardProgression={passesCardProgressionAway}
                accuracyCardProgression={accuracyCardProgressionAway}
                savesCardProgression={savesCardProgressionAway}
              />
            )}
          </div>
        </div>
      </div>
    );
}
