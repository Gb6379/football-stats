"use client";
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Tabs, Tab, List, ListItem, Avatar, Divider, Stack, Button } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

// Mock data
const mockMatches = [
  {
    country: "England",
    league: "Premier League",
    logo: "/premier-league.png",
    matches: [
      { time: "3:00 PM", home: "Man City", away: "Arsenal", score: "-", status: "upcoming" },
      { time: "5:00 PM", home: "Liverpool", away: "Chelsea", score: "2-1", status: "finished" },
    ],
  },
  {
    country: "Spain",
    league: "La Liga",
    logo: "/la-liga.png",
    matches: [
      { time: "4:00 PM", home: "Real Madrid", away: "Barcelona", score: "1-1", status: "finished" },
    ],
  },
];

const mockFeatured = {
  time: "7:00 PM",
  home: "Estudiantes",
  away: "Huracán",
  odds: { home: 2.3, draw: 2.95, away: 4.0 },
};

const mockPlayers = [
  { name: "Christopher Forrester", team: "St. Patrick's vs. UCC", rating: 9.8 },
  { name: "Miguel Santos", team: "Jaro vs. B36", rating: 9.6 },
  { name: "Stefán Ingi Sigurðarson", team: "Sandefjord vs. Kristiansund", rating: 9.5 },
  { name: "Guilherme Smith", team: "Kjellerup vs. K. Telavi", rating: 9.4 },
  { name: "Marin Petkov", team: "Levski Sofia vs. Montana", rating: 9.3 },
];

const mockCompetitions = [
  "Brasileirão Betano",
  "FIFA Club World Cup",
  "UEFA Champions League",
  "UEFA Europa League",
];

export default function HomePage() {
  const [tab, setTab] = React.useState(2); // Default to 'Upcoming'
  return (
    <Box sx={{ bgcolor: '#181A20', minHeight: '100vh', py: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box sx={{ bgcolor: '#23252B', borderRadius: 3, boxShadow: 2, p: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="fullWidth"
              sx={{
                mb: 2,
                '& .MuiTabs-indicator': { bgcolor: '#1E90FF', height: 4, borderRadius: 2 },
                '& .MuiTab-root': {
                  color: '#b0b3b8',
                  fontWeight: 700,
                  borderRadius: 2,
                  minHeight: 36,
                  '&.Mui-selected': { color: '#fff', bgcolor: '#1E90FF22' },
                },
              }}
            >
              <Tab label="LIVE" />
              <Tab label="FINISHED" />
              <Tab label="UPCOMING" />
            </Tabs>
            <List>
              {mockMatches.map((group) => (
                <React.Fragment key={group.league}>
                  <ListItem sx={{ py: 1 }}>
                    <Avatar src={group.logo} sx={{ width: 28, height: 28, mr: 1, bgcolor: '#222' }}>
                      <SportsSoccerIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={700} color="#fff">{group.league}</Typography>
                  </ListItem>
                  {group.matches
                    .filter((m) =>
                      (tab === 0 && m.status === "live") ||
                      (tab === 1 && m.status === "finished") ||
                      (tab === 2 && m.status === "upcoming")
                    )
                    .map((m, i) => (
                      <ListItem key={i} sx={{ pl: 5, py: 0.5, color: '#d1d5db', cursor: 'pointer', '&:hover': { bgcolor: '#23252B' } }}>
                        <Stack direction="row" spacing={1} alignItems="center" width="100%">
                          <Typography variant="caption" sx={{ minWidth: 50, color: '#b0b3b8' }}>{m.time}</Typography>
                          <Typography variant="body2" sx={{ flex: 1, color: '#fff' }}>{m.home} <b style={{ color: '#1E90FF' }}>vs</b> {m.away}</Typography>
                          <Typography variant="body2" fontWeight={700} color="#fff">{m.score}</Typography>
                        </Stack>
                      </ListItem>
                    ))}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Featured Match */}
          <Box sx={{ bgcolor: '#23252B', borderRadius: 3, boxShadow: 2, mb: 3, p: 3 }}>
            <Typography variant="h6" color="#fff" fontWeight={700}>Featured</Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={2}>
              <Avatar src="/team1.png" sx={{ width: 40, height: 40, bgcolor: '#222' }} />
              <Typography variant="h6" color="#fff" fontWeight={700}>{mockFeatured.home}</Typography>
              <Typography variant="body1" color="#b0b3b8">vs</Typography>
              <Typography variant="h6" color="#fff" fontWeight={700}>{mockFeatured.away}</Typography>
              <Avatar src="/team2.png" sx={{ width: 40, height: 40, bgcolor: '#222' }} />
              <Box flex={1} />
              <Typography variant="caption" color="#b0b3b8">{mockFeatured.time}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} mt={3}>
              <Box sx={{ bgcolor: '#1E90FF', color: '#fff', px: 2, py: 1, borderRadius: 2, fontWeight: 700, fontSize: 15 }}>FULL-TIME {mockFeatured.odds.home}</Box>
              <Box sx={{ bgcolor: '#23252B', color: '#1E90FF', px: 2, py: 1, borderRadius: 2, fontWeight: 700, fontSize: 15, border: '1px solid #1E90FF' }}>DRAW {mockFeatured.odds.draw}</Box>
              <Box sx={{ bgcolor: '#23252B', color: '#1E90FF', px: 2, py: 1, borderRadius: 2, fontWeight: 700, fontSize: 15, border: '1px solid #1E90FF' }}>AWAY {mockFeatured.odds.away}</Box>
            </Stack>
          </Box>

          {/* Rankings and Top Players */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: '#23252B', borderRadius: 3, boxShadow: 2, p: 3, mb: 2 }}>
                <Typography variant="subtitle1" color="#fff" fontWeight={700}>Rankings</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="contained" size="small" sx={{ bgcolor: '#1E90FF', color: '#fff', fontWeight: 700, borderRadius: 2, boxShadow: 0, '&:hover': { bgcolor: '#1565c0' } }} startIcon={<EmojiEventsIcon />}>FIFA RANKINGS</Button>
                  <Button variant="outlined" size="small" sx={{ color: '#1E90FF', borderColor: '#1E90FF', fontWeight: 700, borderRadius: 2 }} startIcon={<StarIcon />}>UEFA RANKINGS</Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: '#23252B', borderRadius: 3, boxShadow: 2, p: 3, mb: 2 }}>
                <Typography variant="subtitle1" color="#fff" fontWeight={700}>Top Players</Typography>
                <Box mt={2} mb={2}>
                  {/* Mock heatmap */}
                  <Box sx={{ width: '100%', height: 100, bgcolor: '#2e7d32', borderRadius: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/heatmap.png" alt="heatmap" style={{ width: '90%', height: '90%', objectFit: 'contain', borderRadius: 8 }} />
                  </Box>
                </Box>
                {mockPlayers.map((p, i) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={p.name} mb={0.5}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#1E90FF', fontSize: 16 }}>{i + 1}</Avatar>
                    <Typography variant="body2" color="#fff">{p.name}</Typography>
                    <Typography variant="caption" color="#b0b3b8">{p.team}</Typography>
                    <Box flex={1} />
                    <Typography variant="body2" fontWeight={700} color="#1E90FF">{p.rating}</Typography>
                  </Stack>
                ))}
                <Button size="small" sx={{ color: '#1E90FF', fontWeight: 700, mt: 1 }}>SHOW MORE</Button>
              </Box>
            </Grid>
          </Grid>

          {/* Top Competitions */}
          <Box sx={{ bgcolor: '#23252B', borderRadius: 3, boxShadow: 2, mt: 3, p: 3 }}>
            <Typography variant="subtitle1" color="#fff" fontWeight={700}>Top Competitions</Typography>
            <List>
              {mockCompetitions.map((c, idx) => (
                <ListItem key={c} sx={{ color: '#fff', py: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, mr: 1, bgcolor: '#1E90FF22' }}>
                    {idx % 2 === 0 ? <SportsEsportsIcon /> : <EmojiEventsIcon />}
                  </Avatar>
                  <Typography variant="body2" color="#fff">{c}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
