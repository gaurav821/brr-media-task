import React from "react";
import { CardContent, Avatar, Typography, Box } from "@mui/material";
import { Card } from "./Card";

export const StatCard = ({ icon, label, value, avatarClass, cardClass }) => {
  return (
    <Card className={cardClass}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          "&:last-child": { paddingBottom: "8px !important" },
        }}
      >
        <Avatar className={avatarClass}>{icon}</Avatar>
        <Box>
          <Typography color="textSecondary" variant="subtitle2">
            {label}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
