
import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://gsx2json.com/api?id=1ohekz-AFToTFeiP6q4uZP_JUZtBgxI0iBuNVlpk7wL0&sheet=top")
      .then((res) => res.json())
      .then((data) => {
        if (!data.columns) return;

        const names = Object.keys(data.columns);
        const processed = names.map((name) => {
          const scores = rawScores
  .filter((v) => /^\d+$/.test(v)) // только строки, состоящие из цифр
  .map((v) => parseInt(v));



          const totalGames = scores.length;
          const average = totalGames ? (scores.reduce((a, b) => a + b, 0) / totalGames).toFixed(1) : 0;
          const maxScore = Math.max(...scores, 0);

          return {
            name,
            games: totalGames,
            average: parseFloat(average),
            max: maxScore,
          };
        });

        setPlayers(processed);
      });
  }, []);

  const sortBy = (key) => [...players].sort((a, b) => b[key] - a[key]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>TOP Lost Worlds</h1>

      <section>
        <h2>🏆 Средний результат</h2>
        <ul>
          {sortBy("average").map((p) => (
            <li key={p.name}>{p.name}: {p.average}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🥇 Рекорды</h2>
        <ul>
          {sortBy("max").map((p) => (
            <li key={p.name}>{p.name}: {p.max}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🎮 Количество игр</h2>
        <ul>
          {sortBy("games").map((p) => (
            <li key={p.name}>{p.name}: {p.games}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
