import { Team } from "./Team"

export type Player = {
    id: number;
    name: string;
    actual_team: Team;
    last_teams: Team[];
    photo_url: string;
    nationality: string;
    position: string;
    number: number;
    birth_date: string;
    birth_place: string;
    height: string;
    weight: string;
}