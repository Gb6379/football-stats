"use client";
import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItemIcon, ListItemText, Box, Divider, ListItemButton, TextField, InputAdornment, Popper, Paper, List as MUIList, ListItem as MUIListItem } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TableChartIcon from "@mui/icons-material/TableChart";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Link from "next/link";

const drawerWidth = 220;

const navItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Matches", icon: <SportsSoccerIcon />, path: "/matches" },
  { label: "Standings", icon: <TableChartIcon />, path: "/standings" },
  { label: "Teams", icon: <GroupIcon />, path: "/teams" },
];

// Mock data for search
const mockData = [
  { type: "match", label: "Man City vs Arsenal", path: "/match/123" },
  { type: "team", label: "Manchester City", path: "/teams/1" },
  { type: "team", label: "Arsenal", path: "/teams/2" },
  { type: "player", label: "Erling Haaland", path: "/player/1234" },
  { type: "player", label: "Bukayo Saka", path: "/player/5678" },
];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [results, setResults] = useState<typeof mockData>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      setResults(
        mockData.filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(e.target as HTMLElement);
    if (search) {
      setResults(
        mockData.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const handleBlur = () => {
    setTimeout(() => setResults([]), 150); // Delay to allow click
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#23252B', color: '#fff', boxShadow: 2, borderRadius: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
            Football Statistics
          </Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="Search matches, competitions, teams, players, and more"
              size="small"
              value={search}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={{ width: 400, bgcolor: "#181A20", borderRadius: 1, color: '#fff', input: { color: '#fff' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#fff' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Popper open={results.length > 0} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1301 }}>
              <Paper sx={{ width: 400, bgcolor: '#23252B', color: '#fff' }}>
                <MUIList>
                  {results.map((item) => (
                    <MUIListItem key={item.label} disablePadding>
                      <ListItemButton component={Link} href={item.path} sx={{ color: '#fff', '&:hover': { bgcolor: '#181A20' } }}>
                        <Typography variant="body2" sx={{ color: '#fff' }}>{item.label}</Typography>
                      </ListItemButton>
                    </MUIListItem>
                  ))}
                </MUIList>
              </Paper>
            </Popper>
          </Box>
          <Box />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", bgcolor: '#23252B', color: '#fff' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.path}
                sx={{ color: '#fff', '&:hover': { bgcolor: '#181A20' } }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: '#fff' }} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ bgcolor: '#181A20' }} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
} 