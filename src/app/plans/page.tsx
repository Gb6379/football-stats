"use client";

import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Série A",
    price: "R$ 34,99",
    previousMatches: 3,
    playersPerDay: 30,
    teamsPerDay: 25,
    highlighted: false,
  },
  {
    name: "Libertadores",
    price: "R$ 69,99",
    previousMatches: 5,
    playersPerDay: 60,
    teamsPerDay: 50,
    highlighted: true,
  },
  {
    name: "Mundial",
    price: "R$ 99,99",
    previousMatches: 7,
    playersPerDay: 150,
    teamsPerDay: 120,
    highlighted: false,
  },
];

export default function PlanosPage() {
  return (
    <div
      className="py-5"
      style={{
        backgroundColor: "#1a1a1a",
        color: "#f1f1f1",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center mb-4">Planos e Preços</h1>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm"
                style={{
                  backgroundColor: "#272C32",
                  border: plan.highlighted
                    ? "2px solid #f5c518"
                    : "1px solid #333",
                  borderRadius: 12,
                  padding: 20,
                  color: "#fff",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h4 className="text-center">{plan.name}</h4>
                  <h2 className="text-center my-3" style={{ color: "#f5c518"}}>
                    {plan.price}
                  </h2>
                  <ul className="list-unstyled flex-grow-1">
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <CheckCircle className="text-success" size={16} />
                      {plan.previousMatches} partidas anteriores
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <CheckCircle className="text-success" size={16} />
                      {plan.playersPerDay} jogadores analisados/dia
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <CheckCircle className="text-success" size={16} />
                      {plan.teamsPerDay} times analisados/dia
                    </li>
                  </ul>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: plan.highlighted
                        ? "#f5c518"
                        : "transparent",
                      color: plan.highlighted ? "#fff" : "#f5c518",
                      border: "1px solid #f5c518",
                    }}
                  >
                    Escolher plano
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
