"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchFixtureStatistics, fetchFixtureDetails, fetchPlayerProfile } from '../../../lib/api';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Divider,
  Button,
  Avatar,
  Grid
} from '@mui/material';



const BAR_COLORS = ['#2196f3', '#43a047']; // Home: blue, Away: green

const getStatValue = (stat: any) => {
  if (stat.value === null || stat.value === undefined) return 0;
  if (typeof stat.value === 'string' && stat.value.endsWith('%')) {
    return parseFloat(stat.value);
  }
  return Number(stat.value);
};

interface MatchDetailsProps {
  params: Promise<{ fixtureId: string }>;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ params }) => {
  const { fixtureId } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [fixtureDetails, setFixtureDetails] = useState<any>(null);
  const [tab, setTab] = useState<'STATISTICS' | 'LINEUPS' | 'PLAYERS'>('STATISTICS');
  // Add a cache for player photos
  const [playerPhotos, setPlayerPhotos] = useState<Record<number, string>>({});
  const router = useRouter();

  useEffect(() => {
    if (!fixtureId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchFixtureStatistics(Number(fixtureId)),
      fetchFixtureDetails(Number(fixtureId)),
    ])
      .then(([statsData, detailsData]) => {
        setStats(statsData.response || []);
        setFixtureDetails(detailsData.response?.[0] || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [fixtureId]);

  // After fixtureDetails is loaded and lineups are available, fetch all player photos
  useEffect(() => {
    if (!fixtureDetails?.lineups) return;
    const allPlayers = [
      ...fixtureDetails.lineups[0]?.startXI?.map((p: any) => p.player.id) || [],
      ...fixtureDetails.lineups[1]?.startXI?.map((p: any) => p.player.id) || [],
    ];
    allPlayers.forEach((playerId: number) => {
      if (!playerPhotos[playerId]) {
        fetchPlayerProfile(playerId).then(data => {
          const photo = data?.response?.[0]?.player?.photo;
          if (photo) {
            setPlayerPhotos(prev => ({ ...prev, [playerId]: photo }));
          }
        }).catch(() => {});
      }
    });
    // eslint-disable-next-line
  }, [fixtureDetails?.lineups]);

  // Prepare stats for side-by-side comparison
  const statRows = useMemo(() => {
    if (stats.length !== 2) return [];
    const homeStats = stats[0].statistics;
    const awayStats = stats[1].statistics;
    const statMap: Record<string, { home: any; away: any }> = {};
    homeStats.forEach((s: any) => {
      statMap[s.type] = { home: s.value, away: null };
    });
    awayStats.forEach((s: any) => {
      if (statMap[s.type]) statMap[s.type].away = s.value;
      else statMap[s.type] = { home: null, away: s.value };
    });
    return Object.entries(statMap).map(([type, values]) => ({
      type,
      home: values.home,
      away: values.away,
    }));
  }, [stats]);

  // Find max value for each stat for bar scaling
  const maxForStat = (row: any) => {
    const home = getStatValue({ value: row.home });
    const away = getStatValue({ value: row.away });
    return Math.max(home, away, 1); // avoid division by zero
  };

  // Fetch player photo if not present
  async function ensurePlayerPhoto(playerId: number) {
    if (playerPhotos[playerId]) return;
    try {
      const data = await fetchPlayerProfile(playerId);
      const photo = data?.response?.[0]?.player?.photo;
      if (photo) {
        setPlayerPhotos(prev => ({ ...prev, [playerId]: photo }));
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: 1, p: { xs: 1, sm: 3 } }}>
      {/* Header Section */}
      {stats.length === 2 && fixtureDetails && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {fixtureDetails.league?.name || ''}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {fixtureDetails.league?.round || ''}
            </Typography>
          </Box>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 0.5 }}>
            {fixtureDetails.fixture?.date ? new Date(fixtureDetails.fixture.date).toLocaleString() : ''}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 0.5 }}>
            {fixtureDetails.fixture?.venue?.name || ''} <b>{fixtureDetails.fixture?.venue?.city || ''}</b>
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
            <span style={{ fontSize: 16 }}>🧑‍⚖️</span> {fixtureDetails.teams?.home?.coach?.name || fixtureDetails.fixture?.referee || ''}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Avatar src={fixtureDetails.teams?.home?.logo} alt={fixtureDetails.teams?.home?.name} sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>{fixtureDetails.teams?.home?.name}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 0 }}>
                {fixtureDetails.goals?.home ?? '-'} <span style={{ color: '#888', fontWeight: 400 }}>-</span> {fixtureDetails.goals?.away ?? '-'}
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight={600}>{fixtureDetails.fixture?.status?.long || ''}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Avatar src={fixtureDetails.teams?.away?.logo} alt={fixtureDetails.teams?.away?.name} sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>{fixtureDetails.teams?.away?.name}</Typography>
            </Box>
          </Box>
        </Box>
      )}
      {/* Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '2px solid #e0e0e0', mb: 3 }}>
        {['STATISTICS', 'LINEUPS', 'PLAYERS'].map(tabName => (
          <Box
            key={tabName}
            sx={{
              flex: 1,
              textAlign: 'center',
              py: 1,
              fontWeight: 600,
              fontSize: 16,
              color: tab === tabName ? 'primary.main' : 'text.secondary',
              borderBottom: tab === tabName ? '3px solid #2196f3' : 'none',
              cursor: 'pointer',
              bgcolor: tab === tabName ? '#f5faff' : 'transparent',
              transition: 'all 0.2s',
            }}
            onClick={() => setTab(tabName as typeof tab)}
          >
            {tabName}
          </Box>
        ))}
      </Box>
      {/* Tab Content */}
      {tab === 'STATISTICS' && (
        loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : stats.length !== 2 ? (
          <Typography>No statistics found for this match.</Typography>
        ) : (
          <Box sx={{ px: { xs: 0, sm: 4 }, py: 2 }}>
            {statRows.map((row, idx) => {
              const max = maxForStat(row);
              const homeVal = getStatValue({ value: row.home });
              const awayVal = getStatValue({ value: row.away });
              // Bar colors
              const homeColor = '#43a047'; // green
              const awayColor = '#e53935'; // red
              return (
                <Box key={row.type} sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: 36 }}>
                  {/* Home bar/value */}
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 1 }}>
                    <Box sx={{
                      bgcolor: homeColor,
                      height: 18,
                      borderRadius: '9px 0 0 9px',
                      width: `${(homeVal / max) * 90}%`,
                      minWidth: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      transition: 'width 0.3s',
                    }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 15, pr: 1 }}>{row.home !== null ? row.home : '-'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: 160, textAlign: 'center' }}>
                    <Typography fontWeight={700} color="text.secondary" sx={{ fontSize: 15, whiteSpace: 'nowrap', letterSpacing: 0.2 }}>
                      {row.type}
                    </Typography>
                  </Box>
                  {/* Away bar/value */}
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pl: 1 }}>
                    <Box sx={{
                      bgcolor: awayColor,
                      height: 18,
                      borderRadius: '0 9px 9px 0',
                      width: `${(awayVal / max) * 90}%`,
                      minWidth: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      transition: 'width 0.3s',
                    }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 15, pl: 1 }}>{row.away !== null ? row.away : '-'}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )
      )}
      {tab === 'LINEUPS' && fixtureDetails?.lineups && (
        <Box sx={{ px: { xs: 0, sm: 4 }, py: 2 }}>
          {/* Team names, coaches, formations */}
          <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
            <Grid item xs={5} sx={{ textAlign: 'center' }}>
              <Avatar src={fixtureDetails.lineups[0]?.team?.logo} alt={fixtureDetails.lineups[0]?.team?.name} sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }} />
              <Typography variant="h6" fontWeight={600}>{fixtureDetails.lineups[0]?.team?.name}</Typography>
              <Typography variant="body2" color="text.secondary">Coach: {fixtureDetails.lineups[0]?.coach?.name || '-'}</Typography>
              <Typography variant="body2" color="text.secondary">Formation: {fixtureDetails.lineups[0]?.formation || '-'}</Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} sx={{ textAlign: 'center' }}>
              <Avatar src={fixtureDetails.lineups[1]?.team?.logo} alt={fixtureDetails.lineups[1]?.team?.name} sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }} />
              <Typography variant="h6" fontWeight={600}>{fixtureDetails.lineups[1]?.team?.name}</Typography>
              <Typography variant="body2" color="text.secondary">Coach: {fixtureDetails.lineups[1]?.coach?.name || '-'}</Typography>
              <Typography variant="body2" color="text.secondary">Formation: {fixtureDetails.lineups[1]?.formation || '-'}</Typography>
            </Grid>
          </Grid>
          {/* Single football pitch layout for both teams */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 800,
            height: 800,
            mx: 'auto',
            mb: 2,
            bgcolor: '#1a1a1a',
            borderRadius: 4,
            boxShadow: 2,
            overflow: 'hidden',
            border: '2px solid #2196f3',
          }}>
            {/* Professional pitch lines (SVG) */}
            <svg width="100%" height="100%" viewBox="0 0 800 800" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
              <rect x="0" y="0" width="800" height="800" fill="none" stroke="#fff" strokeWidth="4" />
              {/* Center circle */}
              <circle cx="400" cy="400" r="60" fill="none" stroke="#fff" strokeWidth="3" />
              {/* Center line */}
              <line x1="1" y1="400" x2="800" y2="400" stroke="#fff" strokeWidth="2" />
              {/* Penalty areas */}
              <rect x="200" y="1" width="400" height="180" fill="none" stroke="#fff" strokeWidth="2" />
              <rect x="200" y="620" width="400" height="180" fill="none" stroke="#fff" strokeWidth="2" />
              {/* Six-yard boxes */}
              <rect x="280" y="1" width="240" height="60" fill="none" stroke="#fff" strokeWidth="2" />
              <rect x="280" y="740" width="240" height="60" fill="none" stroke="#fff" strokeWidth="2" />
              {/* Penalty spots */}
              <circle cx="400" cy="100" r="6" fill="#fff" />
              <circle cx="400" cy="700" r="6" fill="#fff" />
              {/* Penalty arcs - correct orientation */}
              <path d="M320,140 A80,80 0 0,0 480,140" fill="none" stroke="#fff" strokeWidth="2" />
              <path d="M320,660 A80,80 0 0,1 480,660" fill="none" stroke="#fff" strokeWidth="2" />
              {/* Goals */}
              <rect x="360" y="-20" width="80" height="20" fill="none" stroke="#fff" strokeWidth="3" />
              <rect x="360" y="799" width="80" height="20" fill="none" stroke="#fff" strokeWidth="3" />
            </svg>
            {/* Players for both teams */}
            {(() => {
              // Pitch zones (Y):
              // 0: Top goal line (away GK)
              // 80: Top edge (start of field)
              // 140: Six-yard box (away GK)
              // 170: Penalty spot (away)
              // 260: Penalty area (away defenders)
              // 400: Center line
              // 540: Penalty area (home defenders)
              // 630: Penalty spot (home)
              // 660: Six-yard box (home GK)
              // 720: Bottom goal line (home GK)
              // 800: Bottom edge
              const pitchZones = {
                awayGK: 133,
                awayDef: 220,
                awayMid: 320,
                awayAtt: 400,
                homeAtt: 400,
                homeMid: 480,
                homeDef: 580,
                homeGK: 690,
              };
              const pitchWidth = 640;
              const marginX = 80;
              function getLineY(lineIdx: number, numLines: number, isHome: boolean) {
                // For 4 lines: [GK, Def, Mid, Att]
                // For home: GK at 690, Def at 580, Mid at 480, Att at 400
                // For away: GK at 110, Def at 220, Mid at 320, Att at 400
                if (isHome) {
                  if (lineIdx === 0) return pitchZones.homeGK;
                  if (numLines === 2) return pitchZones.homeAtt;
                  if (numLines === 3) return [pitchZones.homeDef, pitchZones.homeAtt][lineIdx - 1];
                  if (numLines === 4) return [pitchZones.homeDef, pitchZones.homeMid, pitchZones.homeAtt][lineIdx - 1];
                  if (numLines === 5) return [pitchZones.homeDef, pitchZones.homeMid, 440, 400][lineIdx - 1];
                } else {
                  if (lineIdx === 0) return pitchZones.awayGK;
                  if (numLines === 2) return pitchZones.awayAtt;
                  if (numLines === 3) return [pitchZones.awayDef, pitchZones.awayAtt][lineIdx - 1];
                  if (numLines === 4) return [pitchZones.awayDef, pitchZones.awayMid, pitchZones.awayAtt][lineIdx - 1];
                  if (numLines === 5) return [pitchZones.awayDef, pitchZones.awayMid, 360, 400][lineIdx - 1];
                }
                // Fallback: spread lines evenly between penalty area and center
                const yStart = isHome ? pitchZones.homeGK : pitchZones.awayGK;
                const yEnd = isHome ? pitchZones.homeAtt : pitchZones.awayAtt;
                return yStart + ((yEnd - yStart) * (lineIdx / (numLines - 1)));
              }
              function getPositions(formation: string, players: any[], isHome: boolean) {
                if (!formation || !players.length) return [];
                const lines = formation.split('-').map(Number);
                const numLines = lines.length + 1;
                const positions: { x: number; y: number; player: any }[] = [];
                // GK
                positions.push({ x:400, y: getLineY(0, numLines, isHome), player: players[0].player });
                let pIdx = 1;
                for (let line = 0; line < lines.length; line++) {
                  const count = lines[line];
                  const y = getLineY(line + 1, numLines, isHome);
                  for (let i = 0; i < count; i++) {
                    const x = marginX + ((pitchWidth / (count + 1)) * (i + 1));
                    if (players[pIdx]) {
                      positions.push({ x, y, player: players[pIdx].player });
                      pIdx++;
                    }
                  }
                }
                return positions;
              }
              // Home team (bottom)
              const home = fixtureDetails.lineups[0];
              const homePositions = getPositions(home?.formation, home?.startXI || [], true);
              // Away team (top)
              const away = fixtureDetails.lineups[1];
              const awayPositions = getPositions(away?.formation, away?.startXI || [], false);
              return [
                ...homePositions.map((pos, i) => (
                  <Box
                    key={pos.player.id + '-home'}
                    sx={{
                      position: 'absolute',
                      left: `${pos.x - 84}px`,
                      top: `${pos.y - -10}px`,
                      width: 56,
                      height: 56,
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/player/${pos.player.id}`)}
                  >
                    <Avatar
                      src={playerPhotos[pos.player.id]}
                      alt={pos.player.name}
                      sx={{ width: 44, height: 44, border: '2px solid #fff', mb: 0.2 }}
                    />
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1 }}>{pos.player.number}</Typography>
                    <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: 12, lineHeight: 1, textAlign: 'center', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pos.player.name.split(' ')[0]}</Typography>
                  </Box>
                )),
                ...awayPositions.map((pos, i) => (
                  <Box
                    key={pos.player.id + '-away'}
                    sx={{
                      position: 'absolute',
                      left: `${pos.x - 84}px`,
                      top: `${pos.y - 80}px`,
                      width: 56,
                      height: 56,
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/player/${pos.player.id}`)}
                  >
                    <Avatar
                      src={playerPhotos[pos.player.id]}
                      alt={pos.player.name}
                      sx={{ width: 44, height: 44, border: '2px solid #fff', mb: 0.2 }}
                    />
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1 }}>{pos.player.number}</Typography>
                    <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: 12, lineHeight: 1, textAlign: 'center', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pos.player.name.split(' ')[0]}</Typography>
                  </Box>
                )),
              ];
            })()}
          </Box>
          {/* Substitutes lists */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[fixtureDetails.lineups[0], fixtureDetails.lineups[1]].map((team, idx) => (
              <Grid item xs={12} md={6} key={team?.team?.id || idx}>
                <Divider sx={{ mb: 1 }}>Substitutes</Divider>
                <Stack spacing={0.5}>
                  {team?.substitutes?.map((p: any) => (
                    <Box key={p.player.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
                      <Typography sx={{ fontWeight: 500 }}>{p.player.number}</Typography>
                      <Typography sx={{ flex: 1, ml: 1 }}>{p.player.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.player.pos}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 'PLAYERS' && fixtureDetails?.players && (
        <Box sx={{ px: { xs: 0, sm: 4 }, py: 2 }}>
          <Grid container spacing={4}>
            {fixtureDetails.players.map((team: any, idx: number) => (
              <Grid item xs={12} md={6} key={team.team.id || idx}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar src={team.team.logo} alt={team.team.name} sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }} />
                  <Typography variant="h6" fontWeight={600}>{team.team.name}</Typography>
                </Box>
                <Divider sx={{ mb: 1 }}>Players</Divider>
                <Stack spacing={0.5}>
                  {team.players.map((p: any) => (
                    <Box key={p.player.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
                      <Typography sx={{ fontWeight: 500 }}>{p.player.number}</Typography>
                      <Typography sx={{ flex: 1, ml: 1 }}>{p.player.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.player.pos}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MatchDetails; 