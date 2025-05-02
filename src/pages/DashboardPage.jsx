import React from "react";
import { Container } from "@mui/material";
import { WelcomeBanner } from "../components/dashboard/WelcomeBanner";
import { DashboardStats } from "../components/dashboard/DashboardStats";

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WelcomeBanner />
      <DashboardStats />
    </Container>
  );
}
