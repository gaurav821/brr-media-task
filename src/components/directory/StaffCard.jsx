import React from "react";
import { Avatar, Box, Typography, Chip } from "@mui/material";
import { Card } from "../common/Card";
import StaffCardStyles from "./StaffCard.module.css";
export const StaffCard = ({ staff }) => {
  return (
    <Card className={StaffCardStyles.container}>
      <Box className={StaffCardStyles.header} mb={2}>
        <Avatar
          src={staff.avatar}
          alt={staff.name}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">{staff.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {staff.role}
          </Typography>
        </Box>
      </Box>
      <Box mb={1}>
        <Typography variant="body2">
          <strong>Email:</strong> {staff.email}
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography variant="body2">
          <strong>Status:</strong>
          <Chip
            label={staff.status}
            size="small"
            color={staff.status === "active" ? "success" : "default"}
            sx={{ ml: 1 }}
          />
        </Typography>
      </Box>
      {staff.lastLogin && (
        <Box mb={1}>
          <Typography variant="body2">
            <strong>Last Login:</strong>{" "}
            {new Date(staff.lastLogin).toLocaleString()}
          </Typography>
        </Box>
      )}
      {staff.driveStorageUsed && (
        <Box mb={1}>
          <Typography variant="body2">
            <strong>Drive Storage:</strong> {staff.driveStorageUsed}
          </Typography>
        </Box>
      )}
      {staff.deviceType && (
        <Box>
          <Typography variant="body2">
            <strong>Device:</strong> {staff.deviceType}
          </Typography>
        </Box>
      )}
    </Card>
  );
};
