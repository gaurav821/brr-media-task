import React from "react";
import { useStaff } from "../../hooks/useStaff";
import { StaffCard } from "../../components/directory/StaffCard";
import { Grid, Container, Typography, Alert } from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import Styles from "./styles.module.css";
export default function DirectoryPage() {
  const { staff, loading, error } = useStaff();

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography gutterBottom className={Styles.header}>
        Staff Directory
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        {staff.map((member) => (
          <Grid
            item
            key={member.id}
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <StaffCard staff={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
