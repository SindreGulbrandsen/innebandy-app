import { useState } from "react";

const dummyMatches = [
  {
    id: 1,
    date: "2026-02-10",
    time: "18:00",
    home: "Storvreta IBK",
    away: "Slevik IBK",
    score: "5–3",
    status: "FT",
    venue: "Stjernehallen",
  },
  {
    id: 2,
    date: "2026-02-11",
    time: "19:30",
    home: "Tunet IBK",
    away: "Vålerenga IBK",
    score: "2–2",
    status: "FT",
    venue: "Apalløkka",
  },
  {
    id: 3,
    date: "2026-02-13",
    time: "17:00",
    home: "Greåker IBK",
    away: "Sarpsborg Sharks",
    score: "",
    status: "UPCOMING",
    venue: "Tindlundhallen",
  },
];

const dummyTable = [
  { team: "Storvreta IBK", pos: 1, played: 18, gd: "+22", points: 42 },
  { team: "Tunet IBK", pos: 2, played: 18, gd: "+18", points: 39 },
  { team: "Slevik IBK", pos: 3, played: 18, gd: "+10", points: 34 },
  { team: "Greåker IBK", pos: 4, played: 18, gd: "+4", points: 29 },
  { team: "Vålerenga IBK", pos: 5, played: 18, gd: "-3", points: 24 },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0f14",
    color: "#e6e9ef",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  container: { maxWidth: 900, margin: "0 auto", padding: 24 },

  // ✅ FIX: align + gap prevents weird stretching
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },

  title: { fontSize: 28, fontWeight: 700 },

  // ✅ FIX: force pill to stay a pill (no wrapping / no stretching)
  pill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    height: 28,
    padding: "0 12px",
    fontSize: 12,
    borderRadius: 9999,
    background: "#141a22",
    border: "1px solid #1f2632",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
    gap: 16,
  },
  card: {
    background: "#0f1520",
    border: "1px solid #1f2632",
    borderRadius: 16,
    padding: 16,
    cursor: "pointer",
  },
};

function MatchCard({ match, onOpen }) {
  return (
    <div style={styles.card} onClick={() => onOpen(match)}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {match.date} • {match.time}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          gap: 10,
        }}
      >
        <strong>{match.home}</strong>
        <span>{match.status === "FT" ? match.score : "VS"}</span>
        <strong>{match.away}</strong>
      </div>
    </div>
  );
}

function MatchDetail({ match, onBack, onTeam }) {
  return (
    <div>
      <button onClick={onBack}>← Tilbake</button>
      <h2 style={{ marginTop: 16 }}>
        {match.home} vs {match.away}
      </h2>
      <p>
        {match.date} kl {match.time}
      </p>
      <p>Hall: {match.venue}</p>
      <p>Status: {match.status}</p>
      {match.status === "FT" && <h3>Resultat: {match.score}</h3>}
      <div style={{ marginTop: 12 }}>
        <button onClick={() => onTeam(match.home)}>Gå til {match.home}</button>
        <button onClick={() => onTeam(match.away)} style={{ marginLeft: 8 }}>
          Gå til {match.away}
        </button>
      </div>
    </div>
  );
}

function TeamProfile({ team, onBack }) {
  const row = dummyTable.find((t) => t.team === team);
  return (
    <div>
      <button onClick={onBack}>← Tilbake</button>
      <h2 style={{ marginTop: 16 }}>{team}</h2>
      {row && (
        <ul>
          <li>Plass: {row.pos}</li>
          <li>Kamper: {row.played}</li>
          <li>Målforskjell: {row.gd}</li>
          <li>Poeng: {row.points}</li>
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("LIST");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>🏑 Eliteserien Menn</h1>
          <span style={styles.pill}>Innebandy</span>
        </header>

        {view === "LIST" && (
          <div style={styles.grid}>
            {dummyMatches.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                onOpen={(match) => {
                  setSelectedMatch(match);
                  setView("MATCH");
                }}
              />
            ))}
          </div>
        )}

        {view === "MATCH" && selectedMatch && (
          <MatchDetail
            match={selectedMatch}
            onBack={() => setView("LIST")}
            onTeam={(team) => {
              setSelectedTeam(team);
              setView("TEAM");
            }}
          />
        )}

        {view === "TEAM" && selectedTeam && (
          <TeamProfile team={selectedTeam} onBack={() => setView("LIST")} />
        )}
      </div>
    </div>
  );
}
