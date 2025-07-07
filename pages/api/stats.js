export default async function handler(req, res) {
  const url = 'https://gsx2json.com/api?id=1ohEkz-AFToTFeiP6q4uZP_JUZtBgxToiBuNVlpk7wL0&sheet=top';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
