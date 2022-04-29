import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./Account.scss";
import { Avatar, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./../Logo/Logo";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Routes, Route } from "react-router-dom";
import EditingForm from "./EditingForm";
import Cart from "./Cart";
import useWindowDimensions from "./../../hooks/useWindowDimensions";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function Account({ setNavHeight }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const listBtnStyle = {
      minHeight: 48,
      justifyContent: open ? "initial" : "center",
      px: 2.5,
    },
    listIconStyle = {
      minWidth: 0,
      mr: open ? 3 : "auto",
      justifyContent: "center",
    };
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  let { width } = useWindowDimensions();
  useEffect(() => {
    if (window.location.pathname === "/account/settings") setSelectedIndex(0);
    if (window.location.pathname === "/account/cart") setSelectedIndex(1);
  }, []);
  useEffect(() => {
    if (width < 600) setOpen(false);
    else setOpen(true);
  }, [width]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        className="accountNavbar"
        sx={{
          position: "fixed",
          top: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: open === true ? `${drawerWidth}px` : `70px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Logo />
      </Box>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallAvatar
                component={Link}
                to="/"
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: open ? 40 : 0,
                  height: open ? 40 : 0,
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                  transition: theme.transitions.create(["all"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                }}
              />
            }
          >
            <Avatar
              sx={{
                width: open ? 100 : 40,
                height: open ? 100 : 40,
                transition: theme.transitions.create(["width", "height"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }}
            />
          </Badge>
        </Box>
        <List>
          <ListItemButton
            component={Link}
            to="/account/settings"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            key={"settings"}
            sx={listBtnStyle}
          >
            <ListItemIcon sx={listIconStyle}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/account/cart"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            key={"Cart"}
            sx={listBtnStyle}
          >
            <ListItemIcon sx={listIconStyle}>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Cart"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="settings" element={<EditingForm />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </Box>
    </Box>
  );
}
