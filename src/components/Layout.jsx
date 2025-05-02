import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Directory", path: "/directory" },
  { label: "IT Request", path: "/it-request" },
  { label: "My Tickets", path: "/tickets" },
  { label: "To-Do", path: "/todos" },
];

export const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate()

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const getButtonStyle = (path) => {
    return location.pathname === path
      ? { backgroundColor: theme.palette.action.selected, fontWeight: 700 }
      : {};
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700,cursor:"pointer" }} onClick={() => navigate("/")}>
            BRR Media Dashboard
          </Typography>
          {isTabletOrMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <List>
                    {navLinks.map((item) => (
                      <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={item.label}
                        sx={
                          location.pathname === item.path
                            ? {
                                backgroundColor: theme.palette.action.selected,
                              }
                            : {}
                        }
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            navLinks.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 600,
                  ...getButtonStyle(item.path),
                  borderRadius: 2,
                  px: 3,
                  mx: 0.5,
                }}
              >
                {item.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  );
};
