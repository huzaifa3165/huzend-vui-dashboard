/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";

// Vision UI Dashboard React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// redux
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.reselect";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Vision UI Dashboard React context
import {
  useVisionUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images

import team2 from "assets/images/team-2.jpg";
// ===== use these images as demo when you want to design your owns for sending notifications to the users=====

import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import VuiAvatar from "components/VuiAvatar";
import { selectUniversal } from "redux/user/user.reselect";

function getTimeDifference(time) {
  // Convert the time object to a Date object
  var date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

  // Calculate the difference between the date and the current date
  var difference = Date.now() - date.getTime();

  // Convert the difference to a human-readable format
  if (difference < 60000) {
    // 1 minute
    return Math.floor(difference / 1000) + " seconds ago";
  } else if (difference < 3600000) {
    // 1 hour
    return Math.floor(difference / 60000) + " minutes ago";
  } else if (difference < 86400000) {
    // 1 day
    return Math.floor(difference / 3600000) + " hours ago";
  } else if (difference < 604800000) {
    // 1 week
    return Math.floor(difference / 86400000) + " days ago";
  } else if (difference < 2592000000) {
    // 30 days
    return Math.floor(difference / 604800000) + " weeks ago";
  } else if (difference < 31536000000) {
    // 365 days
    return Math.floor(difference / 2592000000) + " months ago";
  } else {
    return Math.floor(difference / 31536000000) + " years ago";
  }
}

function DashboardNavbar({ absolute, light, isMini, currentUser, universal }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [latestThree, setLatestThree] = useState([]);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  useEffect(() => {
    if (universal) {
      const latest3 = universal.notifications
        .sort((a, b) => {
          // Compare the time properties of the two objects
          if (a.time.seconds < b.time.seconds) {
            return -1;
          } else if (a.time.seconds > b.time.seconds) {
            return 1;
          } else {
            // If the seconds are equal, compare the nanoseconds
            if (a.time.nanoseconds < b.time.nanoseconds) {
              return -1;
            } else if (a.time.nanoseconds > b.time.nanoseconds) {
              return 1;
            } else {
              // If the nanoseconds are also equal, consider the items equal
              return 0;
            }
          }
        })
        .slice(-3);
      setLatestThree(latest3);
    }
  }, [universal]);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {universal && latestThree
        ? latestThree.map((notification) => {
            return (
              <NotificationItem
                image={<img src={notification.image} alt="person" style={{ padding: "6px" }} />}
                title={[notification.boldText, notification.lightText]}
                date={getTimeDifference(notification.time)}
                onClick={handleCloseMenu}
              />
            );
          })
        : ""}
      {/* logoSpotify */}
      {/* <NotificationItem
        image={
          <img
            src="https://www.linkpicture.com/q/mastercard_3.png"
            alt="person"
            style={{ padding: "6px" }}
          />
        }
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="text"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      /> */}
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </VuiBox>
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <VuiBox pr={1}>
              <VuiInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                sx={({ breakpoints }) => ({
                  [breakpoints.down("sm")]: {
                    maxWidth: "80px",
                  },
                  [breakpoints.only("sm")]: {
                    maxWidth: "80px",
                  },
                  backgroundColor: "info.main !important",
                })}
              />
            </VuiBox>
            <VuiBox color={light ? "white" : "inherit"}>
              {currentUser ? (
                <Link to="/profile">
                  <IconButton sx={navbarIconButton}>
                    <VuiAvatar src={currentUser.photoURL} alt="profile" size="xs"></VuiAvatar>
                  </IconButton>
                </Link>
              ) : (
                <Link to="/authentication/sign-in">
                  <IconButton sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    >
                      Sign in
                    </VuiTypography>
                  </IconButton>
                </Link>
              )}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>local_library</Icon>
              </IconButton>

              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={"text-white"}>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
              {renderMenu()}
            </VuiBox>
          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};

export default connect(mapStateToProps)(DashboardNavbar);
