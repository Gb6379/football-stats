import { Game } from "./Game"
import { Team } from "./Team"

export type TeamStatistics = {
  id: number;
  team: Team;
  game: Game;
  shots_on: number;
  shots_off: number;
  shots: number;
  blocked_shots: number;
  shots_inside_box: number;
  shots_outside_box: number;
  fouls: number;
  corners: number;
  offsides: number;
  ball_possession: number;
  red_cards: number;
  yellow_cards: number;
  goalkeeper_saves: number;
  total_passes: number;
  passes_accurate: number;
  passes_porcentage: number;
};