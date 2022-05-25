import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { PageContainer } from "./../../App";
import useWindowDimensions from "./../../hooks/useWindowDimensions";
import "./Navbar.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "./../Logo/Logo";
import AccountMenu from "./../AccountMenu/AccountMenu";
import { useAuth } from "../Auth/Auth";
import { set } from "date-fns";

const NavBar = ({ handleTabsChange, loggingValue }) => {
  /* Close the drawer when the user clicks outside of it */
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerRef = useRef(null);
  const StyledBurgerRef = useRef(null);
  const { width } = useWindowDimensions();
  // const navHeightRef = useRef(null);
  const [showBg, setShowBg] = useState(false);
  const pathName = useLocation().pathname;
  // const [navHeight, setNavHeight] = useState(null);
  const user = useAuth().user;

  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setShowBg(true);
    } else {
      setShowBg(false);
    }
  };

  //will be true when user login successfully
  useEffect(() => {
    setOpenDrawer(false);
    // setNavHeight(navHeightRef.current.clientHeight);
    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => setShowBg(false);
  });

  const closeDrawer = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      StyledBurgerRef.current &&
      !StyledBurgerRef.current.contains(event.target)
    )
      setOpenDrawer(false);
  };

  const showBgStyle = {
    backdropFilter: "blur(20px)",
    // backdropFilter: openDrawer ? " none" : "blur(20px)",
    backgroundColor: "#ffffff6b",
    boxShadow: " 0 5px 10px -8px rgba(0, 0, 0, 0.2)",
  };

  if (pathName.startsWith("/account")) return "";
  return (
    <>
      {width < 640 && <PageOverlay openDrawer={openDrawer} />}
      <Navbar.Fixed
        //  ref={navHeightRef}
        style={showBg ? showBgStyle : {}}
      >
        <PageContainer>
          <Navbar.Wrapper>
            <Logo />
            <StyledBurger
              ref={StyledBurgerRef}
              open={openDrawer}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </StyledBurger>

            <Navbar.Items ref={drawerRef} open={openDrawer} width={width}>
              <Navbar.Item>
                <Link to="/account/cart">
                  <ShoppingCartOutlinedIcon className="navbarCart" />
                </Link>
              </Navbar.Item>
              <Navbar.Item>
                <Button
                  variant="contained"
                  className="navbarBtn"
                  component={Link}
                  to="/manager"
                >
                  Admin Dashbord
                </Button>
              </Navbar.Item>
              {!user && pathName !== "/logging" ? (
                <>
                  <Navbar.Item>
                    <Button
                      variant="outlined"
                      className="navbarBtn"
                      endIcon={<LoginIcon color="primary" />}
                      onClick={() => handleTabsChange("event", 0)}
                      component={Link}
                      to="/logging"
                    >
                      Login
                    </Button>
                  </Navbar.Item>
                  <Navbar.Item>
                    <Button
                      variant="outlined"
                      className="navbarBtn link"
                      onClick={() => handleTabsChange("event", 1)}
                      component={Link}
                      to="/logging"
                    >
                      Signup
                    </Button>
                  </Navbar.Item>
                </>
              ) : (
                ""
              )}
              {user && pathName !== "/logging" ? (
                <Navbar.Item>
                  <AccountMenu />
                </Navbar.Item>
              ) : (
                ""
              )}
            </Navbar.Items>
          </Navbar.Wrapper>
        </PageContainer>
      </Navbar.Fixed>
    </>
  );
};

//Styled Components
const Navbar = {
  Fixed: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1002;
    border-top: 3px solid #24dc89;
    width: 100%;
    transition: background 0.5s ease;
    /* box-shadow: 0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.2); */
  `,

  Wrapper: styled.nav`
    align-self: flex-start;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 4px 0;
    z-index: 1003;
    /* background-color: #ffffff; */

    //40em == 640px
  `,

  Logo: styled.span`
    display: inline-block;
    margin: 0px 0px 9px -15px;
    font-size: 3.5rem;
    font-weight: 600;
    color: #f0534a;
  `,

  Items: styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    height: 100%;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100vh;
      width: 65%;

      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: flex-start;

      background-color: #ffffff;
      padding: 4rem 9vw 1rem;

      transition: ${({ width }) =>
        width <= 640 ? "transform 0.3s ease" : "no"};

      transform: ${({ open }) => (open ? `translateX(0)` : `translateX(100%)`)};
    }
  `,

  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 0.7rem 0;
    }
  `,
};
const StyledBurger = styled.button`
  display: none;
  @media only screen and (max-width: 40em) {
    display: flex;
  }
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  &:focus {
    outline: none;
  }

  div {
    width: 100%;
    height: 0.12rem;
    background: #4b4b4b;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
const PageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(105, 105, 105, 0.438);
  opacity: ${({ openDrawer }) => (openDrawer ? 1 : 0)};
  visibility: ${({ openDrawer }) => (openDrawer ? "visibile" : "hidden")};
  transition: all 0.5s ease;
`;
export default NavBar;
