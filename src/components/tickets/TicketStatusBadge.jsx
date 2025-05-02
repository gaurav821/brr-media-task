import React from "react";
import { Chip } from "@mui/material";

const statusStyles = {
  open: {
    label: "Open",
    bg: "#f0f0f0",
    color: "#333",
  },
  "in-progress": {
    label: "In Progress",
    bg: "#e3f2fd",
    color: "#1565c0",
  },
  resolved: {
    label: "Resolved",
    bg: "#e8f5e9",
    color: "#2e7d32",
  },
  closed: {
    label: "Closed",
    bg: "#ffebee",
    color: "#c62828",
  },
  "on-hold": {
    label: "On Hold",
    bg: "#fff3e0",
    color: "#ef6c00",
  },
  escalated: {
    label: "Escalated",
    bg: "#f3e5f5",
    color: "#8e24aa",
  },
};

export const TicketStatusBadge = ({ status }) => {
  const defaultStyle = {
    label: status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    bg: "#eeeeee",
    color: "#555555",
  };

  const { label, bg, color } = statusStyles[status] || defaultStyle;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: bg,
        color: color,
        fontWeight: 500,
      }}
    />
  );
};
