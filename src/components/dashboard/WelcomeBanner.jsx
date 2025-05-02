import React from "react";
import { Typography, Paper } from "@mui/material";
import DashboardStyles from "./Dashboard.module.css";
export const WelcomeBanner = () => {
  return (
    <Paper elevation={0} className={DashboardStyles.bannerWrapper}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottomn
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Welcome to BRR Media Dashboard
      </Typography>
      <Typography variant="body1">
        Manage your tasks, submit IT requests, and connect with your team.
      </Typography>
    </Paper>
  );
};
