import React, { useState } from "react";
import { generateQuestions } from "../services/interview";
import { ROLES, DEFAULT_JOB_DESCRIPTION } from "../util/constant";
import LoaderScreen from "./LoaderScreen";

const StartInterview = ({ onSessionCreated }) => {
  const [jobTitle, setJobTitle] = useState(ROLES[0]);
  const [jobDescription, setJobDescription] = useState(DEFAULT_JOB_DESCRIPTION);
  const [mode, setMode] = useState("demo"); // "demo" or "full"
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload your resume");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await generateQuestions(jobTitle, jobDescription, resumeFile, mode);
      onSessionCreated(result.session_id);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.detail || "Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoaderScreen
        title={mode === "demo" ? "Preparing Demo Interview..." : "Crafting Full Interview Assessment..."}
        subtitle={
          mode === "demo"
            ? "Preparing 3 warm-up questions to help you get familiar with the interface..."
            : "Extracting resume experience & generating 10-15 medium-to-hard questions..."
        }
        type="propagate"
      />
    );
  }

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: "48px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: 680, padding: 40, borderRadius: 20 }}>
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              marginBottom: 16,
            }}
          >
            🚀
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Start Your AI Interview
          </h1>
          <p style={{ color: "#64748b", fontSize: 15 }}>
            Choose your interview mode and share your details to generate personalized questions.
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Mode Selection */}
          <div>
            <label className="label" style={{ marginBottom: 12, display: "block", fontWeight: 600 }}>
              Select Interview Mode
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div
                onClick={() => setMode("demo")}
                style={{
                  border: `2px solid ${mode === "demo" ? "#4f46e5" : "#e2e8f0"}`,
                  background: mode === "demo" ? "#f5f3ff" : "#ffffff",
                  borderRadius: 14,
                  padding: 18,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🧪</span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: mode === "demo" ? "#4f46e5" : "#1e293b" }}>
                    Demo Interview
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                  <strong>3 Questions:</strong> Quick practice session to get familiar with voice recording & flow.
                </p>
              </div>

              <div
                onClick={() => setMode("full")}
                style={{
                  border: `2px solid ${mode === "full" ? "#4f46e5" : "#e2e8f0"}`,
                  background: mode === "full" ? "#f5f3ff" : "#ffffff",
                  borderRadius: 14,
                  padding: 18,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>💼</span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: mode === "full" ? "#4f46e5" : "#1e293b" }}>
                    Full Interview
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                  <strong>10–15 Questions:</strong> Medium to Hard level questions based on your resume & internships.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="label">Target Job Title</label>
            <select
              className="select"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Job Description</label>
            <textarea
              className="textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste the job description here..."
            />
          </div>

          <div>
            <label className="label">Resume (PDF or PNG / Image)</label>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: 28,
                border: "2px dashed #cbd5e1",
                borderRadius: 12,
                cursor: "pointer",
                background: resumeFile ? "#eef2ff" : "white",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontSize: 28 }}>📄</div>
              {resumeFile ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 600, color: "#4f46e5", fontSize: 14 }}>
                    {resumeFile.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#64748b" }}>Click to change file</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 500, color: "#334155", fontSize: 14 }}>
                    Click to upload your resume
                  </p>
                  <p style={{ fontSize: 12, color: "#94a3b8" }}>Supports PDF, PNG, JPG up to 10MB</p>
                </div>
              )}
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                style={{ display: "none" }}
                onChange={(e) => setResumeFile(e.target.files[0] || null)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{
              marginTop: 8,
              borderRadius: 12,
              fontSize: 16,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Generating questions..."
              : `Start ${mode === "demo" ? "Demo (3 Questions)" : "Full Interview (10-15 Questions)"} →`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartInterview;
