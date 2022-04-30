import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  IconButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Button,
  ListItemButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Routes, Route, Link } from "react-router-dom";
import useWindowDimensions from "./../../hooks/useWindowDimensions";
import Logo from "./../Logo/Logo";
import EditingForm from "./EditingForm";
import Cart from "./Cart";
import vector from "../../assets/vector.svg";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import "./Account.scss";

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
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const drawerStyle = {
  backgroundColor: "#efefefde",
  border: "none",
};
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
    "& .MuiDrawer-paper": { ...openedMixin(theme), ...drawerStyle },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": { ...closedMixin(theme), ...drawerStyle },
  }),
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  backgroundColor: theme.palette.primary.main,

  transition: theme.transitions.create(["all"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function Account() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  let { width } = useWindowDimensions();

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

  useEffect(() => {
    if (window.location.pathname === "/account/settings") setSelectedIndex(0);
    if (window.location.pathname === "/account/cart") setSelectedIndex(1);
  }, []);

  useEffect(() => {
    if (width < 600) setOpen(false);
    else setOpen(true);
  }, [width]);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        display: { sm: "flex" },
        background: ` url(${vector}) no-repeat 110% 74%`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Box
        className="accountNavbar"
        sx={{
          position: "fixed",
          top: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "25px 7%",
          transition: theme.transitions.create(["margin-left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: {
            sm: open === true ? `${drawerWidth}px` : `70px`,
            xs: "65px",
          },
          width: {
            sm:
              open === true
                ? `calc(100% - ${drawerWidth}px)`
                : `calc(100% - 65px)`,
            xs: `calc(100% - 65px)`,
          },
        }}
      >
        <Logo />
        <Button
          component={Link}
          to="/"
          sx={{
            color: "black",
            mb: 1,
          }}
        >
          Home
        </Button>
      </Box>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallAvatar
                component={Link}
                to="/"
                alt="Remy Sharp"
                src=""
                sx={{
                  width: open ? 30 : 0,
                  height: open ? 30 : 0,
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                }}
              >
                <PhotoCameraOutlinedIcon fontSize="small" />
              </SmallAvatar>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { sm: "1% 7%", xs: "1% 7% 1% 85px" } }}
      >
        <DrawerHeader />
        <Box sx={{ width: { xs: "100%", md: "75%" } }}>
          <Routes>
            <Route path="settings" element={<EditingForm />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
