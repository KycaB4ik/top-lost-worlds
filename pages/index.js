import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://gsx2json.com/api?id=1ohEkz-AFToTFeiP6q4uZP_JUZtBgxToiBuNVlpk7wL0&sheet=Лист1")
      .then((res) => res.json())
      .then((data) => {
        if (!data.columns) return;

        const processed = Object.entries(data.columns).map(([name, rawScores]) => {
          // Оставляем только строки, которые состоят из цифр (то есть — очки)
          const scores = rawScores
            .filter((v) => /^\d+$/.test(v))
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

  // Универсальная сортировка по ключу
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
