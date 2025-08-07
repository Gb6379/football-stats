import {
  RectangleVertical,
  Clock,
  FlagOff,
  Star,
  TrendingUp,
  Dumbbell,
  ShieldBan,
  Joystick,
  AlertTriangle,
  Hand,
  Target,
  XCircle,
  Shield,
  Ban,
  Users
} from "lucide-react";
import { FaPeoplePulling } from "react-icons/fa6";
import { GiGoalKeeper, GiSoccerKick, GiSoccerBall } from "react-icons/gi";
import StatProgression from "@/app/functions/statProgression";

type PlayerStatsProgressionProps = {
  yellowCardProgression: number[];
  redCardProgression: number[];
  minPlayedCardProgression: number[];
  offsidesCardProgression: number[];
  ratingCardProgression: number[];
  shotsCardProgression: number[];
  shotsOnGoalCardProgression: number[];
  goalsCardProgression: number[];
  goalsConcedeedCardProgression: number[];
  assistsCardProgression: number[];
  savesCardProgression: number[];
  passesCardProgression: number[];
  accuracyCardProgression: number[];
  duelsCardProgression: number[];
  duelsWonCardProgression: number[];
  tacklesCardProgression: number[];
  blocksCardProgression: number[];
  interceptionsCardProgression: number[];
  dribblesAttemptCardProgression: number[];
  dribblesSuccessCardProgression: number[];
  dribblesPastCardProgression: number[];
  foulsDrownCardProgression: number[];
  foulsComittedCardProgression: number[];
  penaltyWonCardProgression: number[];
  penaltyCommittedCardProgression: number[];
  penaltyScoredCardProgression: number[];
  penaltyMissedCardProgression: number[];
  penaltySavedCardProgression: number[];
};

export default function PlayerStatsProgression({
  yellowCardProgression,
  redCardProgression,
  minPlayedCardProgression,
  offsidesCardProgression,
  ratingCardProgression,
  shotsCardProgression,
  shotsOnGoalCardProgression,
  goalsCardProgression,
  goalsConcedeedCardProgression,
  assistsCardProgression,
  savesCardProgression,
  passesCardProgression,
  accuracyCardProgression,
  duelsCardProgression,
  duelsWonCardProgression,
  tacklesCardProgression,
  blocksCardProgression,
  interceptionsCardProgression,
  dribblesAttemptCardProgression,
  dribblesSuccessCardProgression,
  dribblesPastCardProgression,
  foulsDrownCardProgression,
  foulsComittedCardProgression,
  penaltyWonCardProgression,
  penaltyCommittedCardProgression,
  penaltyScoredCardProgression,
  penaltyMissedCardProgression,
  penaltySavedCardProgression,
}: PlayerStatsProgressionProps) {
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
      <h2 className="h4 mb-3 text-center mt-3 anton-regular-white">
        Estatísticas
      </h2>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <StatProgression
          title="Cartões Amarelos"
          data={yellowCardProgression}
          icon={<RectangleVertical fill="yellow" color="yellow" />}
        />

        <StatProgression
          title="Cartões Vermelhos"
          data={redCardProgression}
          icon={<RectangleVertical fill="red" color="red" />}
        />

        <StatProgression
          title="Tempo de Jogo"
          data={minPlayedCardProgression}
          label="min"
          icon={<Clock />}
        />

        <StatProgression
          title="Impedimentos"
          data={offsidesCardProgression}
          icon={<FlagOff fill="orange" />}
        />

        <StatProgression
          title="Rating"
          data={ratingCardProgression}
          icon={<Star fill="yellow" />}
        />

        <StatProgression
          title="Chutes"
          data={shotsCardProgression}
          icon={<GiSoccerKick fill="gray" />}
        />

        <StatProgression
          title="Chutes a Gol"
          data={shotsOnGoalCardProgression}
          icon={<GiSoccerKick fill="green" />}
        />

        <StatProgression
          title="Gols"
          data={goalsCardProgression}
          icon={<GiSoccerBall fill="green" />}
        />

        <StatProgression
          title="Gols Tomados"
          data={goalsConcedeedCardProgression}
          icon={<GiSoccerBall fill="red" />}
        />

        <StatProgression
          title="Assistências"
          data={assistsCardProgression}
          icon={<Users fill="yellow" />}
        />

        <StatProgression
          title="Defesas"
          data={savesCardProgression}
          icon={<GiGoalKeeper fill="blue" />}
        />

        <StatProgression
          title="Passes"
          data={passesCardProgression}
          icon={<GiSoccerKick fill="blue" />}
        />

        <StatProgression
          title="Precisão Passes"
          data={accuracyCardProgression}
          label="%"
          icon={<TrendingUp fill="blue" />}
        />

        <StatProgression
          title="Duelos"
          data={duelsCardProgression}
          icon={<Dumbbell />}
        />

        <StatProgression
          title="Duelos Ganhos"
          data={duelsWonCardProgression}
          icon={<Dumbbell fill="green" />}
        />

        <StatProgression
          title="Desarmes"
          data={tacklesCardProgression}
          icon={<FaPeoplePulling />}
        />

        <StatProgression
          title="Bloqueios"
          data={blocksCardProgression}
          icon={<Ban />}
        />

        <StatProgression
          title="Interceptações"
          data={interceptionsCardProgression}
          icon={<ShieldBan />}
        />

        <StatProgression
          title="Dribles Tentados"
          data={dribblesAttemptCardProgression}
          icon={<Joystick color="yellow" />}
        />

        <StatProgression
          title="Dribles Efetuados"
          data={dribblesSuccessCardProgression}
          icon={<Joystick color="green" />}
        />

        <StatProgression
          title="Dribles Recebidos"
          data={dribblesPastCardProgression}
          icon={<Joystick color="red" />}
        />

        <StatProgression
          title="Faltas Recebidas"
          data={foulsDrownCardProgression}
          icon={<AlertTriangle color="yellow" />}
        />

        <StatProgression
          title="Faltas Cometidas"
          data={foulsComittedCardProgression}
          icon={<ShieldBan color="red" />}
        />

        <StatProgression
          title="Pênalti Recebido"
          data={penaltyWonCardProgression}
          icon={<Hand />}
        />

        <StatProgression
          title="Pênalti Cometido"
          data={penaltyCommittedCardProgression}
          icon={<AlertTriangle color="red" />}
        />

        <StatProgression
          title="Pênalti Marcado"
          data={penaltyScoredCardProgression}
          icon={<Target color="green" />}
        />

        <StatProgression
          title="Pênalti Perdido"
          data={penaltyMissedCardProgression}
          icon={<XCircle color="red" />}
        />

        <StatProgression
          title="Pênalti Defendido"
          data={penaltySavedCardProgression}
          icon={<Shield color="blue" />}
        />
      </div>
    </div>
  );
}
