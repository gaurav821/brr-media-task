import React from "react";
import { useTickets } from "../hooks/useTickets";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { TicketRow } from "../components/tickets/TicketRow";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export default function TicketsPage() {
  const { tickets, loading, error } = useTickets("1");
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ fontWeight: { xs: 500, md: 600 } }}>
          My Tickets
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/it-request")}
        >
          New Request
        </Button>
      </Box>

      {tickets.length === 0 ? (
        <Typography variant="body1">No tickets submitted yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>Issue Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
