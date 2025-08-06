"use client";
import React from 'react';
import { Typography } from '@mui/material';

const Standings: React.FC = () => (
  <div>
    <Typography variant="h5" gutterBottom>
      Standings
    </Typography>
    <iframe
      src="/widget-standings.html"
      style={{ width: '100%', height: '800px', border: 'none', background: '#181A20' }}
      title="Standings Widget"
      allowFullScreen
    />
  </div>
);

export default Standings; 