"use client"
import React, { useEffect, useState, use } from 'react';
import { fetchPlayerProfile } from '../../../lib/api';
import { Box, Typography, Avatar, Card, CardContent, CircularProgress, Alert } from '@mui/material';

interface PlayerPageProps {
  params: { playerId: string };
}

const PlayerPage: React.FC<PlayerPageProps> = ({ params }) => {
  // Support both direct and use(params) access for compatibility
  let playerId: string;
  if (typeof (params as any).then === 'function') {
    // params is a Promise, unwrap with use()
    playerId = (use(params) as { playerId: string }).playerId;
  } else {
    // params is a plain object
    playerId = (params as { playerId: string }).playerId;
  }
  const playerIdNum = Number(playerId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPlayerProfile(playerIdNum)
      .then(data => {
        setPlayer(data?.response?.[0]?.player || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [playerIdNum]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!player) return <Typography>No player data found.</Typography>;

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar src={player.photo} alt={player.name} sx={{ width: 120, height: 120, mb: 2 }} />
          <Typography variant="h5" fontWeight={700}>{player.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{player.nationality}</Typography>
        </Box>
        <CardContent>
          <Typography><b>Age:</b> {player.age}</Typography>
          <Typography><b>Height:</b> {player.height}</Typography>
          <Typography><b>Weight:</b> {player.weight}</Typography>
          <Typography><b>Birth:</b> {player.birth?.date} ({player.birth?.place}, {player.birth?.country})</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlayerPage; 