import { League } from "./League"
import { Referee } from "./Referee"
import { Team } from "./Team"
import { Venue } from "./Venue"
import { StatisticsGame } from "./StatisticsGame"

export type Game = {
    id: number;
    referee: Referee;
    league: League;
    home_team: Team;
    away_team: Team;
    home_goals: number;
    away_goals: number;
    date: string; // por seguranca deixei stringado
    venue: Venue;
    statistics: [StatisticsGame]
}