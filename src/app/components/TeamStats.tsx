"use client";

import StatProgression from "../functions/statProgression";
import {
  RectangleVertical,
  Ban,
  Inbox,
  Box,
  AlertTriangle,
  Flag,
  FlagOff,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { GiSoccerKick, GiGoalKeeper } from "react-icons/gi";

type TeamStatProgressionProps = {
  yellowCardProgression: number[];
  redCardProgression: number[];
  shotsCardProgression: number[];
  shotsOnCardProgression: number[];
  shotsOffCardProgression: number[];
  blockedShotsCardProgression: number[];
  shotsInsideCardProgression: number[];
  shotsOutsideCardProgression: number[];
  foulsCardProgression: number[];
  cornersCardProgression: number[];
  offsidesCardProgression: number[];
  ballPossessionCardProgression: number[];
  passesCardProgression: number[];
  accuracyCardProgression: number[];
  savesCardProgression: number[];
  teamName?: string;
  teamLogoUrl?: string;
};

export default function TeamStatProgression({
  yellowCardProgression,
  redCardProgression,
  shotsCardProgression,
  shotsOnCardProgression,
  shotsOffCardProgression,
  blockedShotsCardProgression,
  shotsInsideCardProgression,
  shotsOutsideCardProgression,
  foulsCardProgression,
  cornersCardProgression,
  offsidesCardProgression,
  ballPossessionCardProgression,
  passesCardProgression,
  accuracyCardProgression,
  savesCardProgression,
  teamName,
  teamLogoUrl,
}: TeamStatProgressionProps) {
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
      <h2 className="h4 mb-3 text-center mt-3 anton-regular-white flex items-center justify-center gap-2">
        {teamLogoUrl && (
          <Image
            src={teamLogoUrl}
            alt={`${teamName || "Time"} logo`}
            width={32}
            height={32}
            style={{borderRadius: "50%" }}
          />
        )}
        {teamName || "Estatísticas do Time"}
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
          title="Chutes"
          data={shotsCardProgression}
          icon={<GiSoccerKick fill="gray" />}
        />
        <StatProgression
          title="Chutes a Gol"
          data={shotsOnCardProgression}
          icon={<GiSoccerKick fill="green" />}
        />
        <StatProgression
          title="Chutes Fora"
          data={shotsOffCardProgression}
          icon={<GiSoccerKick fill="yellow" />}
        />
        <StatProgression
          title="Chutes Bloqueados"
          data={blockedShotsCardProgression}
          icon={<Ban />}
        />
        <StatProgression
          title="Chutes dentro da Área"
          data={shotsInsideCardProgression}
          icon={<Inbox />}
        />
        <StatProgression
          title="Chutes fora da Área"
          data={shotsOutsideCardProgression}
          icon={<Box />}
        />
        <StatProgression
          title="Faltas"
          data={foulsCardProgression}
          icon={<AlertTriangle color="yellow" />}
        />
        <StatProgression
          title="Escanteios"
          data={cornersCardProgression}
          icon={<Flag />}
        />
        <StatProgression
          title="Impedimentos"
          data={offsidesCardProgression}
          icon={<FlagOff fill="orange" />}
        />
        <StatProgression
          title="Posse de Bola"
          data={ballPossessionCardProgression}
          label="%"
          icon={<GiSoccerKick fill="blue" />}
        />
        <StatProgression
          title="Passes"
          data={passesCardProgression}
          icon={<TrendingUp fill="blue" />}
        />
        <StatProgression
          title="Precisão Passes"
          data={accuracyCardProgression}
          label="%"
          icon={<TrendingUp fill="blue" />}
        />
        <StatProgression
          title="Defesas"
          data={savesCardProgression}
          icon={<GiGoalKeeper fill="blue" />}
        />
      </div>
    </div>
  );
}
