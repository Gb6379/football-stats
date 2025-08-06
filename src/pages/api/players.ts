import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const apiKey = process.env.FOOTBALL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured." });
  }

  const url = new URL("https://v3.football.api-sports.io/players/profiles");
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.append(key, value as string);
    }
  });

  try {
    const apiRes = await fetch(url.toString(), {
      headers: {
        "x-apisports-key": apiKey,
        Accept: "application/json",
      },
    });
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from football API." });
  }
}
