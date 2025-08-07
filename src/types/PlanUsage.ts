import { Plan } from "./Plan";

export type PlanUsage = {
  id: number;
  plan: Plan;
  paid_at: string;
  expire_at: string;
  requests_used: number;
};