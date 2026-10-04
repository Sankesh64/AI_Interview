import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReport } from "../services/interview";
import LoaderScreen from "./LoaderScreen";

const Report = ({ sessionId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getReport(sessionId);
        setReport(data.result || data);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.detail || "Failed to load report.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId]);

  const mockReport = {
    overall_score: 86,
    strengths: [
      "Clear communication and structured responses",
      "Demonstrated solid product thinking",
      "Good use of real examples and metrics",
    ],
    improvements: [
      "Be more concise with answers - avoid tangents",
      "Use STAR method more consistently for behavioral questions",
      "Quantify impact more explicitly when describing outcomes",
    ],
    per_question_feedback: [
      {
        question: "Tell me about a product you launched and what you learned.",
        score: 90,
        feedback: "Great use of specific metrics. Very clear story structure.",
      },
      {
        question: "How do you prioritize features?",
        score: 82,
        feedback: "Solid framework. Could strengthen with a concrete example.",
      },
    ],
  };

  const displayReport = report && typeof report === "object" ? report : mockReport;
  const score = displayReport.overall_score ?? 86;

  if (loading) {
    return (
      <LoaderScreen
        title="Analyzing Performance & Preparing Report..."
        subtitle="Evaluating your answers, computing scores, and gathering feedback..."
        type="pulse"
      />
    );
  }

  const scoreColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
  const scoreBg =
    score >= 80 ? "#d1fae5" : score >= 60 ? "#fef3c7" : "#fee2e2";

  return (
    <div className="container" style={{ flex: 1, padding: "40px 24px", maxWidth: 1000 }}>
      <div style={{ marginBottom: 24 }}>
        <span className="badge" style={{ marginBottom: 10 }}>
          📊 Interview Complete
        </span>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
          Your Interview Report
        </h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>
          Review your performance, feedback, and suggested improvements.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: 12,
            background: "#fef2f2",
            color: "#b91c1c",
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <div
        className="card"
        style={{
          padding: 32,
          marginBottom: 24,
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: scoreBg,
            color: scoreColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `8px solid white`,
            boxShadow: "0 0 0 4px " + scoreBg,
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>/ 100</div>
          <div
            style={{
              marginTop: 12,
              padding: "4px 10px",
              background: "white",
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Keep practicing"}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            Overall Performance
          </h2>
          <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
            You did well overall! Your responses showed clear thinking and good
            communication. Focus on the improvements below to reach the next level.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/interview")}
            >
              Practice again
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
              Back to dashboard
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#d1fae5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>Strengths</h3>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {(displayReport.strengths || []).map((s, i) => (
              <li
                key={i}
                style={{
                  padding: "12px 14px",
                  background: "#f0fdf4",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#065f46",
                  lineHeight: 1.5,
                }}
              >
                {typeof s === "string" ? s : JSON.stringify(s)}
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#fef3c7",
                color: "#b45309",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ⚡
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>Areas to improve</h3>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {(displayReport.improvements || []).map((s, i) => (
              <li
                key={i}
                style={{
                  padding: "12px 14px",
                  background: "#fffbeb",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#78350f",
                  lineHeight: 1.5,
                }}
              >
                {typeof s === "string" ? s : JSON.stringify(s)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>
          Per-question feedback
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(displayReport.per_question_feedback || []).map((q, i) => (
            <div
              key={i}
              style={{
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600, fontSize: 14, flex: 1, lineHeight: 1.5 }}>
                  {i + 1}. {q.question || "Question " + (i + 1)}
                </p>
                <div
                  style={{
                    minWidth: 56,
                    height: 56,
                    borderRadius: 12,
                    background: q.score >= 80 ? "#d1fae5" : q.score >= 60 ? "#fef3c7" : "#fee2e2",
                    color: q.score >= 80 ? "#059669" : q.score >= 60 ? "#b45309" : "#b91c1c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {q.score}
                </div>
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#64748b",
                  lineHeight: 1.6,
                  padding: "10px 14px",
                  background: "#f8fafc",
                  borderRadius: 8,
                }}
              >
                {q.feedback || "Great effort! Keep practicing."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
