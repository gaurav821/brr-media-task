import React from "react";
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTickets } from "../../hooks/useTickets";
import { useTodos } from "../../hooks/useTodos";
import { useStaff } from "../../hooks/useStaff";
import DashboardStyles from "./Dashboard.module.css";
import { TicketStatusBadge } from "../tickets/TicketStatusBadge";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
export const DashboardStats = () => {
  const { tickets, loading: ticketsLoading } = useTickets("1");
  const { todos, loading: todosLoading, toggleTodo } = useTodos();
  const { staff, loading: staffLoading } = useStaff();
  const openTickets = ticketsLoading
    ? 0
    : tickets.filter((t) => t.status === "open").length;
  const pendingTasks = todosLoading
    ? 0
    : todos.filter((t) => !t.completed).length;
  const activeStaffCount = staffLoading ? 0 : staff?.length;

  return (
    <Box className="min-h-[100vh]">
      <Container className={DashboardStyles.container}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} sx={{ width: { xs: "100%", md: "auto" } }}>
            <StatCard
              icon={<PeopleAltIcon sx={{ color: "#4287f5" }} />}
              label="Active Staff"
              value={activeStaffCount}
              avatarClass={DashboardStyles.staffAvatar}
              cardClass={DashboardStyles.staffCard}
            />
          </Grid>

          <Grid item xs={6} md={4} sx={{ width: { xs: "100%", md: "auto" } }}>
            <StatCard
              icon={<ConfirmationNumberIcon sx={{ color: "#ff9800" }} />}
              label="Open Tickets"
              value={openTickets}
              avatarClass={DashboardStyles.ticketAvatar}
              cardClass={DashboardStyles.ticketCard}
            />
          </Grid>

          <Grid item xs={6} md={4} sx={{ width: { xs: "100%", md: "auto" } }}>
            <StatCard
              icon={<AssignmentIcon sx={{ color: "#4caf50" }} />}
              label="Pending Tasks"
              value={pendingTasks}
              avatarClass={DashboardStyles.taskAvatar}
              cardClass={DashboardStyles.taskCard}
            />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 4 }}>
        <Card sx={{ "&:last-child": { paddingBottom: 0 } }}>
          <CardContent sx={{ "&:last-child": { paddingBottom: 0 } }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Recent Tickets
            </Typography>

            {ticketsLoading ? (
              <Box className={DashboardStyles.loaderWrapper}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {tickets.length > 0 ? (
                  tickets.slice(0, 3).map((ticket, index) => (
                    <React.Fragment key={ticket.id}>
                      <Box sx={{ py: 2 }}>
                        <Box className={DashboardStyles.ticketWrapper}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              fontWeight="medium"
                            >
                              {ticket.issueType.charAt(0).toUpperCase() +
                                ticket.issueType.slice(1)}{" "}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {ticket.description}
                            </Typography>
                          </Box>
                          <TicketStatusBadge status={ticket.status} />
                        </Box>
                      </Box>

                      {index < tickets.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        ml: 1,
                      }}
                    >
                      No tickets available.
                    </Typography>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mb: 4 }}>
        <Card>
          <CardContent sx={{ "&:last-child": { paddingBottom: 0 } }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Your To-Do List
            </Typography>

            {todosLoading ? (
              <Box className={DashboardStyles.loaderWrapper}>
                <CircularProgress />
              </Box>
            ) : todos.length > 0 ? (
              todos.map((todo) => (
                <Box key={todo.id} className={DashboardStyles.todoContainer}>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 1,
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "text.disabled" : "text.primary",
                    }}
                  >
                    {todo.text}
                  </Typography>
                </Box>
              ))
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    ml: 1,
                  }}
                >
                  No task available.
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
