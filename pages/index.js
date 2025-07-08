import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://gsx2json.com/api?id=1ohekz-AFToTFeiP6q4uZP_JUZtBgxI0iBuNVlpk7wL0&sheet=top")
      .then((res) => res.json())
      .then((data) => {
        if (!data.columns) return;

        const processed = Object.entries(data.columns).map(([name, rawScores]) => {
          // Фильтруем только настоящие числовые значения (без пробелов, букв и пустых ячеек)
          const scores = rawScores
            .map((v) => v.trim())
            .filter((v) => v !== "" && !isNaN(v))
            .map((v) => parseInt(v));

          const games = scores.length;
          const average = games
            ? (scores.reduce((a, b) => a + b, 0) / games).toFixed(1)
            : 0;
          const max = Math.max(...scores, 0);

          return {
            name,
            games,
            average: parseFloat(average),
            max,
          };
        });

        setPlayers(processed);
      });
  }, []);

  const sortBy = (key) => [...players].sort((a, b) => b[key] - a[key]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🌍 TOP Lost Worlds</h1>

      <section>
        <h2>📊 Средний результат</h2>
        <ol>
          {sortBy("average").map((p) => (
            <li key={p.name}>
              {p.name}: {p.average}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>🏆 Рекорды</h2>
        <ol>
          {sortBy("max").map((p) => (
            <li key={p.name}>
              {p.name}: {p.max}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>🎮 Количество игр</h2>
        <ol>
          {sortBy("games").map((p) => (
            <li key={p.name}>
              {p.name}: {p.games}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
