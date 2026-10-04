import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getHistory } from "../services/interview";
import { getCurrentUser } from "../services/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(console.error);
    getHistory().then(data => {
      if (data && data.history) setHistory(data.history);
    }).catch(console.error);
  }, []);

  const stats = [
    {
      label: "Interviews completed",
      value: history.filter(h => h.status === "completed").length.toString(),
      change: "-",
      positive: true,
    },
    {
      label: "Average score",
      value: "-",
      change: "-",
      positive: true,
    },
    {
      label: "Practice streak",
      value: "-",
      change: "-",
      positive: true,
    },
  ];

  const resources = [
    { title: "The STAR method, explained", type: "Guide", time: "5 min read" },
    { title: "50 common behavioral questions", type: "Question bank", time: "10 min read" },
    { title: "How to talk about your impact", type: "Video", time: "8 min" },
  ];

  return (
    <div className="page" style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main className="container" style={{ flex: 1, padding: "32px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              Good morning{user ? `, ${user.name || user.email.split('@')[0]}` : ''}
            </h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Ready to turn your next interview into an offer?
            </p>
          </div>
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
              style={{ borderRadius: 8, padding: "10px 20px", color: "#4f46e5", background: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}
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
            <div key={i} className="card" style={{ padding: 24, background: "white", borderRadius: 12, border: "1px solid #e2e8f0" }}>
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
          <div className="card" style={{ padding: 24, background: "white", borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
              Interview History
            </h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {history.length === 0 ? (
                <div style={{ padding: "32px 0", textAlign: "center", color: "#64748b" }}>
                  <p>No interviews yet.</p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: 12, borderRadius: 8, padding: "8px 16px", cursor: "pointer", border: "1px solid #e2e8f0", background: "white", fontWeight: 600, color: "#0f172a" }}
                    onClick={() => navigate("/interview")}
                  >
                    Start your first interview
                  </button>
                </div>
              ) : (
                history.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: i < history.length - 1 ? "1px solid #e2e8f0" : "none",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{h.job_title}</p>
                      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
                        {new Date(h.scheduled_time).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: 12, color: h.status === "completed" ? "#059669" : "#f59e0b" }}>
                        {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                      </p>
                    </div>
                    {h.status === "completed" ? (
                      <button
                        style={{ borderRadius: 8, fontSize: 13, padding: "6px 12px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}
                        onClick={() => navigate(`/report/${h.session_id}`)}
                      >
                        View Report
                      </button>
                    ) : (
                      <button
                        style={{ borderRadius: 8, fontSize: 13, padding: "6px 12px", border: "none", background: "#4f46e5", color: "white", cursor: "pointer" }}
                        onClick={() => navigate(`/interview/${h.session_id}`)}
                      >
                        Resume
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: "white", borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
              Resources for you
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {resources.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{r.title}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="badge" style={{ padding: "2px 8px", fontSize: 11, background: "#f1f5f9", borderRadius: 12, color: "#475569" }}>
                        {r.type}
                      </span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{r.time}</span>
                    </div>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 16 }}>›</span>
                </div>
              ))}
              <a
                href="/#resources"
                style={{
                  fontSize: 13,
                  color: "#4f46e5",
                  fontWeight: 500,
                  marginTop: 8,
                  textDecoration: "none"
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
            textAlign: "center"
          }}
        >
          interviewly · Practice smarter, interview stronger.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
