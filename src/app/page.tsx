"use client";
import "./globals.css";
import {
  GiSoccerBall,
  GiGoalKeeper,
  GiShieldEchoes,
  GiGlobe,
} from "react-icons/gi";
import { FaChartLine, FaUsers } from "react-icons/fa";

export default function Home() {
  // Dados das funcionalidades principais (sem segurança e cobertura)
  const funcionalidades = [
    {
      icon: <FaChartLine size={40} color="#f5c518" />,
      title: "Análise de Partidas",
      desc: "Identifique as melhores apostas com dados reais e estatísticas atualizadas.",
    },
    {
      icon: <GiSoccerBall size={40} color="#4bcffa" />,
      title: "Performance dos Jogadores",
      desc: "Acompanhe gols, assistências, finalizações e muito mais.",
    },
    {
      icon: <FaUsers size={40} color="#f08a5d" />,
      title: "Estatísticas dos Times",
      desc: "Veja o desempenho completo de cada clube em diferentes competições.",
    },
    {
      icon: <GiGoalKeeper size={40} color="#85e085" />,
      title: "Análise de Defesa",
      desc: "Dados completos sobre defesas, goleiros e desarmes.",
    },
  ];

  return (
    <main
      className="container-fluid py-5 px-3 px-md-5 d-flex flex-column gap-5"
      style={{
        backgroundColor: "#272C32",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      <section
        className="text-center mx-auto"
        style={{ maxWidth: 900, paddingBottom: "2rem" }}
      >
        <h1 className="anton-regular-white display-3 mb-3">
          BetStats — Suas estatísticas de apostas em um só lugar
        </h1>
        <p
          className="lead text-secondary mb-4"
          style={{ fontSize: "1.3rem", maxWidth: 600, margin: "0 auto" }}
        >
          Dados precisos, análises detalhadas e ferramentas poderosas para
          ajudar você a apostar com mais confiança.
        </p>
        <button
          type="button"
          className="btn btn-warning btn-lg px-5"
          style={{ fontWeight: "700", fontFamily: "'Anton', sans-serif" }}
          onClick={() => (window.location.href = "/players")}
        >
          Comece Agora
        </button>
      </section>

      <section>
        <h2
          className="anton-regular-white mb-4 text-center"
          style={{ fontSize: "2.2rem", color: "#ccc" }}
        >
          Funcionalidades Principais
        </h2>
        <div className="row gx-4 gy-4 justify-content-center">
          {funcionalidades.map(({ icon, title, desc }, idx) => (
            <article
              key={idx}
              className="col-12 col-sm-6 col-lg-3 d-flex"
              style={{
                backgroundColor: "#171C1F",
                borderRadius: 12,
                padding: "2rem",
                boxShadow:
                  "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "default",
                height: "100%",
                minHeight: 280,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.45), 0 18px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)";
              }}
            >
              <div className="mb-3">{icon}</div>
              <h3
                className="anton-regular-white mb-3"
                style={{ fontSize: "1.4rem" }}
              >
                {title}
              </h3>
              <p style={{ color: "#ccc", fontSize: "1rem", flexGrow: 1 }}>
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="row gx-4 gy-4 justify-content-center">
        {[
          {
            icon: <GiShieldEchoes size={40} color="#f54291" />,
            title: "Segurança e Privacidade",
            desc: "Protegemos seus dados com tecnologia de ponta e criptografia segura, garantindo a confidencialidade e integridade das suas informações.",
            color: "#f54291",
          },
          {
            icon: <GiGlobe size={40} color="#42aaff" />,
            title: "Cobertura Global",
            desc: "Estatísticas de ligas e campeonatos de todo o mundo, atualizadas em tempo real para você nunca perder uma oportunidade.",
            color: "#42aaff",
          },
        ].map(({ icon, title, desc, color }, idx) => (
          <article
            key={idx}
            className="col-12 col-sm-6 col-lg-4 d-flex"
            style={{
              backgroundColor: "#171C1F",
              borderRadius: 12,
              padding: "2rem",
              boxShadow:
                "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              cursor: "default",
              height: "100%",
              minHeight: 280,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              color,
              border: `2px solid ${color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = `0 12px 30px ${color}80, 0 18px 40px ${color}cc`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)";
            }}
          >
            <div className="mb-3">{icon}</div>
            <h2
              className="anton-regular-white mb-3"
              style={{ fontSize: "1.8rem" }}
            >
              {title}
            </h2>
            <p style={{ color: "#ccc", fontSize: "1rem", flexGrow: 1 }}>
              {desc}
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2
          className="anton-regular-white mb-4 text-center"
          style={{ fontSize: "2.2rem", color: "#ccc" }}
        >
          Planos e Preços
        </h2>
        <div className="row gx-4 gy-4 justify-content-center">
          {[
            {
              name: "Série A",
              price: "R$ 34,99/mês",
              benefits: [
                "3 partidas anteriores do time/jogador",
                "30 jogadores analisados/dia",
                "25 times analisados/dia",
              ],
              color: "#6c757d",
            },
            {
              name: "Libertadores",
              price: "R$ 69,99/mês",
              benefits: [
                "5 partidas anteriores do time/jogador",
                "70 jogadores analisados/dia",
                "55 times analisados/dia",
              ],
              color: "#f5c518",
            },
            {
              name: "Mundial",
              price: "R$ 99,99/mês",
              benefits: [
                "7 partidas anteriores do time/jogador",
                "150 jogadores analisados/dia",
                "120 times analisados/dia",
              ],
              color: "#dc3545",
            },
          ].map(({ name, price, benefits, color }, idx) => (
            <article
              key={idx}
              className="col-12 col-md-4 d-flex flex-column"
              style={{
                backgroundColor: "#171C1F",
                borderRadius: 12,
                padding: "2rem",
                boxShadow:
                  "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)",
                height: "100%",
                color,
                border: `2px solid ${color}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = `0 12px 30px ${color}80, 0 18px 40px ${color}cc`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.3), 0 8px 25px rgba(0,0,0,0.25)";
              }}
            >
              <h3 className="anton-regular-white mb-2">{name}</h3>
              <p
                className="anton-regular-white"
                style={{ fontSize: "1.6rem", fontWeight: "700" }}
              >
                {price}
              </p>
              <ul
                style={{ color: "#ccc", marginTop: "1rem", flexGrow: 1 }}
                className="ps-3"
              >
                {benefits.map((b, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-outline-light mt-auto"
                style={{ fontWeight: "700" }}
                onClick={() => alert(`Selecionou o plano ${name}`)}
              >
                Escolher
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1000,
          width: "100%",
          margin: "0 auto",
          backgroundColor: "#171C1F",
          borderRadius: 12,
          padding: "2.5rem 2rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        }}
      >
        <h2
          className="anton-regular-white mb-4 text-center"
          style={{ fontSize: "2rem", color: "#ccc" }}
        >
          Fale Conosco
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Obrigado pelo contato! Em breve retornaremos.");
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Seu nome"
              required
              style={{
                backgroundColor: "#2b3036",
                color: "#fff",
                border: "none",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email@exemplo.com"
              required
              style={{
                backgroundColor: "#2b3036",
                color: "#fff",
                border: "none",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label text-light">
              Mensagem
            </label>
            <textarea
              className="form-control"
              id="message"
              rows={4}
              placeholder="Escreva sua mensagem"
              required
              style={{
                backgroundColor: "#2b3036",
                color: "#fff",
                border: "none",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            style={{ fontWeight: "700", fontFamily: "'Anton', sans-serif" }}
          >
            Enviar Mensagem
          </button>
        </form>
      </section>

      <footer
        className="text-center text-secondary mt-auto mb-3"
        style={{ fontSize: "0.9rem" }}
      >
        &copy; {new Date().getFullYear()} BetStats - Todos os direitos
        reservados
      </footer>
    </main>
  );
}
