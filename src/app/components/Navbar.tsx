"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold fs-4">
          BetStats
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link href="/players" className="nav-link">
                Jogadores
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/teams" className="nav-link">
                Times
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/plans" className="nav-link">
                Planos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/standings" className="nav-link">
                Classificação
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/matches" className="nav-link">
                Partidas
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <Link href="/account" className="nav-link text-white">
              <i className="bi bi-person-circle fs-4"></i>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
