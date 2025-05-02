import React from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import { TicketStatusBadge } from "./TicketStatusBadge";

export const TicketRow = ({ ticket }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="body2">{ticket.issueType}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{ticket.description}</Typography>
      </TableCell>
      <TableCell>
        <TicketStatusBadge status={ticket.status} />
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
