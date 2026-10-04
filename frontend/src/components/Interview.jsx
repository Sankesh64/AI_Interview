import React, { useState, useEffect, useRef } from "react";
import { startInterview, submitAnswer, endInterview } from "../services/interview";
import useSpeechToText from "../hooks/useSpeechToText";
import { speakText, stopSpeaking } from "../util/audio";
import speakGif from "../assets/speak.gif";
import listeningGif from "../assets/listening.gif";

import LoaderScreen from "./LoaderScreen";

const Interview = ({ sessionId, onComplete }) => {
  const [introText, setIntroText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const {
    isListening,
    transcript,
    error: sttError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  const answerRef = useRef("");

  useEffect(() => {
    answerRef.current = transcript;
    setAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    const loadStart = async () => {
      try {
        setLoading(true);
        const data = await startInterview(sessionId);
        setIntroText(data.introText || "");
        setCurrentQuestion(data.firstQuestion || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load interview. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadStart();

    return () => {
      stopSpeaking();
    };
  }, [sessionId]);

  const handleStartSpeaking = () => {
    if (!started) return;
    resetTranscript();
    setAnswer("");
    setSpeaking(true);
    speakText(currentQuestion, () => setSpeaking(false));
  };

  const handleSubmit = async (skip = false) => {
    setSubmitting(true);
    setError("");
    try {
      stopSpeaking();
      if (isListening) stopListening();
      const finalAnswer = skip ? "" : answer.trim();
      const result = await submitAnswer(sessionId, finalAnswer, skip);
      if (result.interviewEnded) {
        onComplete();
      } else {
        setCurrentQuestion(result.nextQuestion || "");
        setAnswer("");
        resetTranscript();
        setStarted(true);
        setSpeaking(true);
        speakText(result.nextQuestion || "", () => setSpeaking(false));
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.detail || "Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndInterview = async () => {
    try {
      stopSpeaking();
      if (isListening) stopListening();
      await endInterview(sessionId);
      onComplete();
    } catch (err) {
      console.error(err);
      onComplete();
    }
  };

  if (loading) {
    return (
      <LoaderScreen
        title="Initializing Interview Room..."
        subtitle="Setting up AI persona and loading your first question."
        type="scale"
      />
    );
  }

  return (
    <div className="container" style={{ flex: 1, padding: "32px 24px", maxWidth: 1000 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <span className="badge" style={{ marginBottom: 8 }}>
            AI Interview in progress
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>Interview Session</h1>
        </div>
        <button className="btn btn-outline" onClick={handleEndInterview}>
          End interview
        </button>
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

      {!started && (
        <div className="card" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 22,
              }}
            >
              ✨
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>AI interviewer</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                <p style={{ fontSize: 13, color: "#64748b" }}>Ready to start</p>
              </div>
            </div>
          </div>

          {introText && (
            <div
              style={{
                background: "#0f172a",
                color: "white",
                padding: "20px 24px",
                borderRadius: 16,
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              {introText}
            </div>
          )}

          <div
            style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              height: 60,
              marginBottom: 24,
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: 6 + ((i * 5) % 28),
                  background: "#4f46e5",
                  borderRadius: 2,
                  opacity: speaking || isListening ? 1 : 0.35,
                }}
              />
            ))}
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%" }}
            onClick={() => {
              setStarted(true);
              setSpeaking(true);
              speakText(currentQuestion, () => setSpeaking(false));
            }}
          >
            ▶ Start the interview
          </button>
        </div>
      )}

      {started && (
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f172a",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
              }}
            >
              {speaking ? (
                <img src={speakGif} alt="AI Speaking" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : isListening ? (
                <img src={listeningGif} alt="AI Listening" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 24 }}>✨</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 16 }}>AI Interviewer</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: speaking ? "#6366f1" : isListening ? "#10b981" : "#94a3b8",
                  }}
                />
                <p style={{ fontSize: 13, fontWeight: 500, color: speaking ? "#4f46e5" : isListening ? "#059669" : "#64748b" }}>
                  {speaking ? "🗣️ Speaking..." : isListening ? "🎧 Listening..." : "Ready"}
                </p>
              </div>
            </div>
            <button
              className="btn btn-outline"
              style={{ borderRadius: 8, padding: "6px 12px" }}
              onClick={handleStartSpeaking}
              disabled={speaking}
            >
              🔊 Replay
            </button>
          </div>

          <div
            style={{
              background: "#0f172a",
              color: "white",
              padding: "20px 24px",
              borderRadius: 16,
              marginBottom: 24,
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {currentQuestion}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label className="label" style={{ margin: 0 }}>
                Your answer
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-outline"
                  style={{
                    borderRadius: 9999,
                    padding: "6px 14px",
                    background: isListening ? "#fef2f2" : "transparent",
                    borderColor: isListening ? "#ef4444" : undefined,
                    color: isListening ? "#dc2626" : undefined,
                  }}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? "⏹ Stop recording" : "🎙 Record answer"}
                </button>
              </div>
            </div>
            <textarea
              className="textarea"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                answerRef.current = e.target.value;
              }}
              rows={6}
              placeholder="Type your answer here, or use the record button to speak..."
            />
            {sttError && (
              <p style={{ color: "#dc2626", fontSize: 12, marginTop: 6 }}>
                Speech recognition error: {sttError}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              className="btn btn-outline"
              style={{ borderRadius: 9999 }}
              disabled={submitting}
              onClick={() => handleSubmit(true)}
            >
              Skip question
            </button>
            <button
              className="btn btn-primary"
              style={{ borderRadius: 9999 }}
              disabled={submitting || (!answer.trim())}
              onClick={() => handleSubmit(false)}
            >
              {submitting ? "Submitting..." : "Submit answer →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
