import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCurrentUser } from "../services/auth";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) navigate("/dashboard");
    });
  }, [navigate]);

  const features = [
    {
      icon: "🎙️",
      title: "Realistic practice",
      desc: "Simulate role-specific interviews that feel like the real thing.",
    },
    {
      icon: "📈",
      title: "Instant feedback",
      desc: "See clear, actionable feedback on every answer.",
    },
    {
      icon: "📖",
      title: "A library that grows",
      desc: "Prepare with expert guides, question banks, and frameworks.",
    },
  ];

  return (
    <div className="page">
      <Header />

      <main style={{ flex: 1 }}>
        <section
          style={{
            padding: "80px 0 60px",
          }}
        >
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow">AI-POWERED INTERVIEW PRACTICE</span>
              <h1
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: 24,
                  color: "#0f172a",
                }}
              >
                Walk into every interview ready.
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: "#64748b",
                  marginBottom: 32,
                  lineHeight: 1.6,
                  maxWidth: 480,
                }}
              >
                Practice realistic interviews, get instant feedback, and build
                the confidence to land the role you want.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Start practicing free
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                  onClick={() => {
                    document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  See how it works →
                </button>
              </div>
              <p style={{ fontSize: 13, color: "#64748b" }}>No credit card required</p>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  background:
                    "linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(124,58,237,0.1) 100%)",
                  borderRadius: 32,
                  filter: "blur(40px)",
                }}
              />
              <div
                className="card"
                style={{
                  position: "relative",
                  padding: 0,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                    padding: 32,
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: 16,
                      padding: 24,
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        Product Manager interview
                      </h3>
                      <span style={{ color: "#64748b" }}>⋯</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: 18,
                        }}
                      >
                        ✨
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>AI interviewer</p>
                        <p style={{ fontSize: 13, color: "#64748b" }}>
                          AI interviewer is ready
                        </p>
                      </div>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#10b981",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        background: "#0f172a",
                        color: "white",
                        padding: "16px 20px",
                        borderRadius: 16,
                        marginBottom: 16,
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      Tell me about a product you launched and what you learned.
                    </div>

                    <div
                      style={{
                        background: "#eef2ff",
                        padding: "16px",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                        height: 64,
                      }}
                    >
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 3,
                            height: 8 + ((i * 7) % 24),
                            background: "#4f46e5",
                            borderRadius: 2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{
                  position: "absolute",
                  bottom: -24,
                  right: -24,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#d1fae5",
                    color: "#059669",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  📈
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "#64748b" }}>Interview score</p>
                  <p style={{ fontSize: 16, fontWeight: 700 }}>86 / 100</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" style={{ padding: "60px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-eyebrow">EVERYTHING YOU NEED TO GET HIRED</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {features.map((f, i) => (
                <div key={i} className="card" style={{ padding: 28 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#eef2ff",
                      color: "#4f46e5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: 20,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    {f.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <div
              style={{
                background: "#0f172a",
                borderRadius: 32,
                padding: "80px 48px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h2
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Your next great opportunity starts here.
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: "#94a3b8",
                  marginBottom: 32,
                }}
              >
                Turn interview anxiety into interview momentum.
              </p>
              <button
                className="btn btn-primary btn-lg"
                style={{
                  background: "#4f46e5",
                }}
                onClick={() => navigate("/login")}
              >
                Create your free account
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
