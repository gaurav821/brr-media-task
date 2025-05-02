import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert 
      elevation={6} 
      ref={ref} 
      variant="filled" 
      role="alert"
      aria-live="assertive"
      {...props} 
    />
  );
});

export const AlertToast = ({
  open,
  onClose,
  message,
  severity = "info",
  autoHideDuration = 6000,
  position = { vertical: "top", horizontal: "right" },
}) => {
  const alertId = React.useId();
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={position}
      aria-describedby={alertId}
      sx={{
        '& .MuiSnackbar-root': {
          zIndex: 1400,
        }
      }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: "100%" }}
        id={alertId}
        action={
          <IconButton
            size="small"
            aria-label="close alert"
            color="inherit"
            onClick={onClose}
            sx={{
              padding: '4px',
              '&:focus': {
                outline: '2px solid',
                outlineOffset: '2px'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <span>{message}</span>
      </Alert>
    </Snackbar>
  );
};