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
  nav: { display: "flex", gap: 8 },
  navButton: (active) => ({
    borderRadius: 9999,
    padding: "6px 12px",
    border: "1px solid #1f2632",
    background: active ? "#1a2230" : "#0f1520",
    color: "#e6e9ef",
    fontSize: 12,
    cursor: "pointer",
  }),

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
  tableWrapper: {
    background: "#0f1520",
    border: "1px solid #1f2632",
    borderRadius: 16,
    padding: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#9aa4b2",
    borderBottom: "1px solid #1f2632",
    padding: "8px 6px",
  },
  td: {
    padding: "10px 6px",
    borderBottom: "1px solid #1f2632",
  },
  teamCell: { display: "flex", alignItems: "center", gap: 10 },
  pos: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#151c26",
    border: "1px solid #1f2632",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
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

function TableOverview({ onTeam }) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Lag</th>
            <th style={styles.th}>K</th>
            <th style={styles.th}>MF</th>
            <th style={styles.th}>P</th>
          </tr>
        </thead>
        <tbody>
          {dummyTable.map((row) => (
            <tr key={row.team}>
              <td style={styles.td}>
                <span style={styles.pos}>{row.pos}</span>
              </td>
              <td style={styles.td}>
                <button
                  type="button"
                  onClick={() => onTeam(row.team)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    color: "#e6e9ef",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  <span style={styles.teamCell}>
                    <strong>{row.team}</strong>
                  </span>
                </button>
              </td>
              <td style={styles.td}>{row.played}</td>
              <td style={styles.td}>{row.gd}</td>
              <td style={styles.td}>
                <strong>{row.points}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("LIST");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [previousView, setPreviousView] = useState("LIST");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>🏑 Eliteserien Menn</h1>
          <div style={styles.nav}>
            <button
              type="button"
              style={styles.navButton(view === "LIST")}
              onClick={() => setView("LIST")}
            >
              Kamper
            </button>
            <button
              type="button"
              style={styles.navButton(view === "TABLE")}
              onClick={() => setView("TABLE")}
            >
              Tabell
            </button>
          </div>
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
              setPreviousView("MATCH");
              setSelectedTeam(team);
              setView("TEAM");
            }}
          />
        )}

        {view === "TABLE" && (
          <TableOverview
            onTeam={(team) => {
              setPreviousView("TABLE");
              setSelectedTeam(team);
              setView("TEAM");
            }}
          />
        )}

        {view === "TEAM" && selectedTeam && (
          <TeamProfile team={selectedTeam} onBack={() => setView(previousView)} />
        )}
      </div>
    </div>
  );
}
