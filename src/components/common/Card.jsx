import React from "react";
import { Card as MuiCard, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(MuiCard)({
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
});

export const Card = ({ children, ...props }) => {
  return (
    <StyledCard {...props}>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};
