export async function fetchFixtures(league: number, season: number) {
  const apiKey =
    process.env.REACT_APP_FOOTBALL_API_KEY ||
    "0774d39c344ba71e677b524f4926d1aa";
  const apiHost =
    process.env.REACT_APP_FOOTBALL_API_HOST || "v3.football.api-sports.io";
  const url = `https://${apiHost}/fixtures?league=${league}&season=${season}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fixtures");
  }
  const data = await response.json();
  return data;
}

export async function fetchLeaguesByCountry(country: string) {
  const apiKey =
    process.env.REACT_APP_FOOTBALL_API_KEY ||
    "0774d39c344ba71e677b524f4926d1aa";
  const apiHost =
    process.env.REACT_APP_FOOTBALL_API_HOST || "v3.football.api-sports.io";
  const url = `https://${apiHost}/leagues?country=${encodeURIComponent(
    country
  )}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch leagues");
  }
  const data = await response.json();
  return data;
}

export async function fetchFixtureStatistics(fixtureId: number) {
  const apiKey =
    process.env.REACT_APP_FOOTBALL_API_KEY ||
    "0774d39c344ba71e677b524f4926d1aa";
  const apiHost =
    process.env.REACT_APP_FOOTBALL_API_HOST || "v3.football.api-sports.io";
  const url = `https://${apiHost}/fixtures/statistics?fixture=${fixtureId}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fixture statistics");
  }
  const data = await response.json();
  return data;
}

export async function fetchFixtureDetails(fixtureId: number) {
  const apiKey =
    process.env.REACT_APP_FOOTBALL_API_KEY ||
    "0774d39c344ba71e677b524f4926d1aa";
  const apiHost =
    process.env.REACT_APP_FOOTBALL_API_HOST || "v3.football.api-sports.io";
  const url = `https://${apiHost}/fixtures?id=${fixtureId}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fixture details");
  }
  const data = await response.json();
  return data;
}

export async function fetchPlayerProfile(playerId: number) {
  const apiKey =
    process.env.REACT_APP_FOOTBALL_API_KEY ||
    "0774d39c344ba71e677b524f4926d1aa";
  const apiHost =
    process.env.REACT_APP_FOOTBALL_API_HOST || "v3.football.api-sports.io";
  const url = `https://${apiHost}/players/profiles?player=${playerId}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch player profile");
  }
  const data = await response.json();
  return data;
}
