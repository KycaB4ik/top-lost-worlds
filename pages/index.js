import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://gsx2json.com/api?id=1ohEkz-AFToFTeiP6q4uZP_JUZtBgxToiBuNVlpK7wL0&sheet=top")
      .then((res) => res.json())
      .then((json) => {
        console.log("📊 Полученные данные:", json);
        setData(json);
      })
      .catch((error) => console.error("❌ Ошибка при загрузке:", error));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>TOP Lost Worlds</h1>
      {!data && <p>Загрузка...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
