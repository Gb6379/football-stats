import { Player } from "./Player"
import { Game } from "./Game";

export type PlayerStatistic = {
  id: number;
  player: Player;
  game: Game;
  min_played: number;
  rating: number;
  offsides: number;
  shots: number;
  shots_on_goal: number;
  goals: number;
  goals_conceded: number;
  assists: number;
  saves: number;
  passes: number;
  accuracy: number;
  duels: number;
  duels_won: number;
  tackles: number;
  blocks: number;
  interceptions: number;
  dribbles_attempts: number;
  dribbles_success: number;
  dribbles_past: number;
  fouls_drown: number;
  fouls_committed: number;
  yellow_card: number;
  red_card: number;
  penalty_won: number;
  penalty_committed: number;
  penalty_scored: number;
  penalty_missed: number;
  penalty_saved: number;
};