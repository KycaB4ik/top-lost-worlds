<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>TOP Lost Worlds</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 600px;
    }
    h1 {
      text-align: center;
    }
    h2 {
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TOP Lost Worlds</h1>
    <div id="results"></div>
  </div>

  <script>
    const SHEET_ID = "1ohekz-AFToTFeiP6q4uZP_JUZtBgxI0iBuNVlpk7wL0"; // например: 1ohEkz-AFToFTeiP6q4uZP_JUZtBgxToiBuNVlpK7wL0
    const SHEET_NAME = "top";

    fetch(`https://gsx2json.com/api?id=${SHEET_ID}&sheet=${SHEET_NAME}`)
      .then(r => r.json())
      .then(data => {
        if (!data.rows) throw new Error("Нет данных");

        const stats = {};
        data.rows.forEach(row => {
          for (let name in row) {
            const value = Number(row[name]);
            if (!isNaN(value)) {
              if (!stats[name]) stats[name] = [];
              stats[name].push(value);
            }
          }
        });

        const average = {};
        const max = {};
        const count = {};

        for (let name in stats) {
          const values = stats[name];
          const sum = values.reduce((a, b) => a + b, 0);
          average[name] = +(sum / values.length).toFixed(1);
          max[name] = Math.max(...values);
          count[name] = values.length;
        }

        const resultsDiv = document.getElementById("results");

        const section = (title, object) => {
          const sorted = Object.entries(object).sort((a, b) => b[1] - a[1]);
          return `
            <h2>${title}</h2>
            <ul>
              ${sorted.map(([name, value]) => `<li>${name}: ${value}</li>`).join('')}
            </ul>
          `;
        };

        resultsDiv.innerHTML =
          section("🏆 Средний результат", average) +
          section("📈 Рекорды", max) +
          section("👾 Количество игр", count);
      })
      .catch(err => {
        document.getElementById("results").innerHTML = `<pre>${err}</pre>`;
      });
  </script>
</body>
</html>
