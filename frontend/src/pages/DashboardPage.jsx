import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        background: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              ✨
            </div>
            <span>interviewly</span>
          </div>

          <nav style={{ display: "flex", gap: 32 }}>
            <a href="#" style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
              How it works
            </a>
            <a
              href="#"
              style={{
                fontSize: 14,
                color: "#4f46e5",
                fontWeight: 600,
                borderBottom: "2px solid #4f46e5",
                paddingBottom: 20,
              }}
            >
              Practice
            </a>
            <a href="#" style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
              Resources
            </a>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button className="btn btn-ghost" style={{ fontWeight: 600, color: "#475569" }}>
            Upgrade
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#334155",
            }}
          >
            JD
            <span>▾</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Interviews completed",
      value: "12",
      change: "+3 this month",
      positive: true,
    },
    {
      label: "Average score",
      value: "78%",
      change: "+8% vs last month",
      positive: true,
    },
    {
      label: "Practice streak",
      value: "6 days",
      change: "🔥",
      positive: true,
    },
  ];

  const practices = [
    {
      role: "Senior Product Manager",
      type: "Behavioral interview",
      lastPracticed: "Yesterday",
      status: "Resume",
      primary: true,
    },
    {
      role: "Frontend Engineer",
      type: "Technical screen",
      lastPracticed: "4 days ago",
      status: "Practice",
      primary: false,
    },
  ];

  const resources = [
    { title: "The STAR method, explained", type: "Guide", time: "5 min read" },
    { title: "50 common behavioral questions", type: "Question bank", time: "10 min read" },
    { title: "How to talk about your impact", type: "Video", time: "8 min" },
  ];

  return (
    <div className="page" style={{ background: "#f8fafc" }}>
      <DashboardHeader />

      <main className="container" style={{ flex: 1, padding: "32px 24px", maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              Good morning, Jordan
            </h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Ready to turn your next interview into an offer?
            </p>
          </div>
          <button className="btn btn-outline" style={{ borderRadius: 8 }}>
            View progress
          </button>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #312e81 60%, #0f172a 100%)",
            borderRadius: 20,
            padding: "40px",
            color: "white",
            marginBottom: 24,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Practice with an AI interviewer
            </h2>
            <p style={{ opacity: 0.85, marginBottom: 24, fontSize: 14 }}>
              Choose a role and get personalized questions, follow-up prompts, and feedback.
            </p>
            <button
              className="btn btn-white"
              style={{ borderRadius: 8, padding: "10px 20px" }}
              onClick={() => navigate("/interview")}
            >
              Start interview
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "20px 40px",
              background: "rgba(15, 23, 42, 0.5)",
              borderRadius: 16,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎙️</div>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>AI interviewer</p>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 9999,
                fontSize: 11,
              }}
            >
              Ready when you are
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>{s.label}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <p style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {s.value}
                </p>
                <span
                  style={{
                    fontSize: 12,
                    color: s.positive ? "#4f46e5" : "#ef4444",
                    fontWeight: 500,
                  }}
                >
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
              Continue practicing
            </h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {practices.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: i < practices.length - 1 ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.role}</p>
                    <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{p.type}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8" }}>Last practiced {p.lastPracticed}</p>
                  </div>
                  <button
                    className={`btn ${p.primary ? "btn-primary" : "btn-outline"}`}
                    style={{ borderRadius: 8 }}
                    onClick={() => navigate("/interview")}
                  >
                    {p.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
              Resources for you
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {resources.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{r.title}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="badge" style={{ padding: "2px 8px", fontSize: 11 }}>
                        {r.type}
                      </span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{r.time}</span>
                    </div>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 16 }}>›</span>
                </div>
              ))}
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: "#4f46e5",
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                Browse all resources →
              </a>
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid #e2e8f0",
            fontSize: 13,
            color: "#64748b",
          }}
        >
          interviewly · Practice smarter, interview stronger.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
