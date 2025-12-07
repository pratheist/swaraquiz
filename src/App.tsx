// src/App.tsx
import React, { useRef, useState } from "react";
import WarpShaderBackground from "./components/ui/wrap-shader";
import { GradientButton } from "./components/ui/gradient-button";

type Note = {
  western: string;
  label: string;
  file: string;
  isMajor: boolean;
};

const noteBank: Note[] = [
  { western: "C#", label: "Sa",        file: "Csharp.wav",  isMajor: true },
  { western: "D",  label: "Komal Re",  file: "D.wav",       isMajor: false },
  { western: "D#", label: "Re",        file: "Dsharp.wav",  isMajor: true },
  { western: "E",  label: "Komal Ga",  file: "E.wav",       isMajor: false },
  { western: "E#", label: "Ga",        file: "Esharp.wav",  isMajor: true },
  { western: "F#", label: "Ma",        file: "Fsharp.wav",  isMajor: true },
  { western: "G",  label: "Teevra Ma", file: "G.wav",       isMajor: false },
  { western: "G#", label: "Pa",        file: "Gsharp.wav",  isMajor: true },
  { western: "A",  label: "Komal Dha", file: "A.wav",       isMajor: false },
  { western: "A#", label: "Dha",       file: "Asharp.wav",  isMajor: true },
  { western: "B",  label: "Komal Ni",  file: "B.wav",       isMajor: false },
  { western: "B#", label: "Ni",        file: "Bsharp.wav",  isMajor: true },
];

const scales = {
  major: noteBank.filter((n) => n.isMajor),
  chromatic: noteBank,
};

type ScaleKey = keyof typeof scales;

const App: React.FC = () => {
  const [scale, setScale] = useState<ScaleKey>("major");
  const [quizNote, setQuizNote] = useState<Note | null>(null);
  const [result, setResult] = useState<string>("");
  const noteAudioRef = useRef<HTMLAudioElement | null>(null);

  const notes = scales[scale];

  const playRandomNote = () => {
    const note = notes[Math.floor(Math.random() * notes.length)];
    setQuizNote(note);
    setResult("");
    if (noteAudioRef.current) {
      noteAudioRef.current.src = `/audio/${note.file}`;
      noteAudioRef.current.play();
    }
  };

  const replayNote = () => {
    if (!quizNote || !noteAudioRef.current) return;
    noteAudioRef.current.src = `/audio/${quizNote.file}`;
    noteAudioRef.current.play();
  };

  const handleAnswer = (btnNote: Note) => {
    if (!quizNote) return;
    setResult(
      btnNote.western === quizNote.western
        ? "✅ Correct!"
        : `❌ Wrong! Answer: ${quizNote.label} (${quizNote.western})`
    );
  };

  return (
    <WarpShaderBackground>
      <audio ref={noteAudioRef} />

      {/* Glass card */}
      <div
        style={{
          background: "rgba(6, 15, 25, 0.78)",
          borderRadius: 32,
          boxShadow: "0 18px 40px rgba(15,23,42,0.65)",
          maxWidth: 500,
          width: "96vw",
          padding: "32px 24px 26px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(26px) saturate(1.6)",
          border: "1px solid rgba(148,191,233,0.55)",
        }}
      >
        <h1
          style={{
            color: "#e5f2ff",
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: ".02em",
            marginBottom: 10,
          }}
        >
          Swara Quiz
        </h1>

        <label
          style={{
            marginBottom: 16,
            fontWeight: 500,
            color: "#cbd5f5",
            fontSize: 15,
          }}
        >
          Scale:{" "}
          <select
            value={scale}
            onChange={(e) => {
              const value = e.target.value as ScaleKey;
              setQuizNote(null);
              setResult("");
              setScale(value);
            }}
            style={{
              fontSize: 14,
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(148,191,233,0.75)",
              background: "rgba(15,23,42,0.9)",
              color: "#e2f1ff",
              outline: "none",
            }}
          >
            <option value="major">C# Major (Sa Re Ga Ma Pa Dha Ni)</option>
            <option value="chromatic">C# Chromatic (All 12 notes)</option>
          </select>
        </label>

        {/* Top control buttons – gradient buttons */}
        <div
          style={{
            margin: "8px 0 18px 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <GradientButton className="gradient-button" onClick={playRandomNote}>
            ▶️ Quiz Me
          </GradientButton>
          <GradientButton className="gradient-button gradient-button-variant"  onClick={replayNote} disabled={!quizNote}>
            🔁 Replay
          </GradientButton>
        </div>

        {quizNote && (
          <>
            <div
              style={{
                margin: "18px 0 15px 0",
                fontWeight: 600,
                color: "#e5f2ff",
                fontSize: 18,
              }}
            >
              Which swara is this note?
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  scale === "major" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "0.1em",
                width: "100%",
                margin: "0 5px 5px 5px",
              }}
            >
              {notes.map((btnNote) => (
                <button
                  key={btnNote.western}
                  onClick={() => handleAnswer(btnNote)}
                  className="answer-button"
                  style={{
                    ...glassAnsBtn,
                    fontWeight: 600,
                    border:
                      quizNote &&
                      btnNote.western === quizNote.western &&
                      result.startsWith("✅")
                        ? "2.2px solid #50dfa7"
                        : "1.5px solid rgba(148,191,233,0.45)",
                    background:
                      quizNote &&
                      btnNote.western === quizNote.western &&
                      result.startsWith("✅")
                        ? "linear-gradient(135deg,#22c55e,#4ade80)"
                        : "rgba(15,23,42,0.9)",
                    boxShadow:
                      quizNote &&
                      btnNote.western === quizNote.western &&
                      result.startsWith("✅")
                        ? "0 1px 17px rgba(34,197,94,0.6)"
                        : "0 12px 26px rgba(15,23,42,0.75)",
                    color: "#e5f2ff",
                    cursor: result ? "not-allowed" : "pointer",
                    transition: "all .16s",
                  }}
                  disabled={!!result}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 650,
                      letterSpacing: ".01em",
                      lineHeight: "1.26",
                      padding: "0 2px",
                    }}
                  >
                    {btnNote.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12.3,
                      fontWeight: 520,
                      color: "#5badce",
                      marginTop: 2,
                      letterSpacing: ".03em",
                      display: "block",
                    }}
                  >
                    {btnNote.western}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        <div
          style={{
            minHeight: 24,
            marginTop: 18,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: ".02em",
            color: result.startsWith("✅") ? "#4ade80" : "#f97373",
          }}
        >
          {result}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 26,
          fontSize: 15.6,
          letterSpacing: ".01em",
          color: "#66aee3",
          textShadow: "0 1px 0 #fff",
          position: "fixed",
          left: 0,
          bottom: 16,
          width: "100vw",
          textAlign: "center",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
      </div>
    </WarpShaderBackground>
  );
};


// Answer buttons base style
const glassAnsBtn: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 54,
  borderRadius: 18,
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(148,191,233,0.45)",
  color: "#e5f2ff",
  fontSize: 18,
  fontWeight: 600,
  boxShadow: "0 12px 26px rgba(15,23,42,0.75)",
  cursor: "pointer",
  padding: "0 10px",
  margin: "0 auto",
  textAlign: "center",
  outline: "none",
  userSelect: "none",
};

export default App;
