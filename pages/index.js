import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://gsx2json.com/api?id=1ohEkz-AFToTFeiP6q4uZP_JUZtBgxToiBuNVlpk7wL0&sheet=top")
      .then((res) => res.json())
      .then((data) => {
        if (!data.columns) return;

        const processed = Object.entries(data.columns).map(([name, rawScores]) => {
          const scores = rawScores
            .filter((v) => /^\d+$/.test(v)) // только строки-числа
            .map((v) => parseInt(v));

          const games = scores.length;
          const average = games ? (scores.reduce((a, b) => a + b, 0) / games).toFixed(1) : 0;
          const max = Math.max(...scores, 0);

          return { name, games, average, max };
        });

        setPlayers(processed);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 TOP Lost Worlds</h1>

      <h2>👾 Игроки</h2>
      <ul>
        {players.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong>: игр: {p.games}, ср. результат: {p.average}, рекорд: {p.max}
          </li>
        ))}
      </ul>
    </div>
  );
}
