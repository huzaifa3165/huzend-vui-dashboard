/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/

import { useState, useEffect, useMemo } from "react";
// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { connect } from "react-redux";
// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator, setIsLoggedIn } from "context";

import { auth, createNewUserIfExist } from "./firebase";
import { selectCurrentUser } from "redux/user/user.reselect";
import { setCurrentUser } from "redux/user/user.actions";

const coursesInit = {
  coursesEnrolled: [
    {
      courseName: "App Development",
      courseID: 2,
      activelyTaking: false,
      taskCompleted: [1, 3],
      instructors: [
        {
          name: "Ryan Tompson",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar1.png",
        },
        {
          name: "Romina Hadid",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar2.png",
        },
        {
          name: "Alexander Smith",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar3.png",
        },
        {
          name: "Jessica Doe",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar4.png",
        },
      ],
      students: 900,
    },
  ],
  subscribedToNewsletter: false,
  posts: [],
  rewards: [],
};
const lastYearTimeSpentFullInit = {
  1: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  2: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  3: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  4: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  5: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  6: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  7: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  8: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  9: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  10: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  11: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  12: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
};
const initialUser = {
  displayName: "",
  email: "",
  createdAt: "",
  timeSpentToday: 0,
  courses: coursesInit,
  photoURL:
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/319/robot_1f916.png",
  lastYearTimeSpentFull: lastYearTimeSpentFullInit,
  blogsTraffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rewards: [],
};

const App = ({ currentUser, setCurrentUser }) => {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const unsubscribeAuthOnCalling = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createNewUserIfExist(user);
        userRef.onSnapshot((snapShot) => {
          console.log(snapShot.data());
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(initialUser);
      }
    });
    return () => {
      unsubscribeAuthOnCalling();
    };
  }, [setCurrentUser]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        link
      </Icon>
    </VuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="HUZEND"
              routes={routes(currentUser)}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        {currentUser.email !== "" ? (
          <Switch>
            {getRoutes(routes(currentUser))}
            <Redirect from="*" to="/dashboard" />
            {/* ////////////////////////////////////////////////////////////////////////////// change the dashboard to sign in with respect to current user */}
          </Switch>
        ) : (
          <Redirect from="*" to="/authentication/sign-in" />
        )}
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="HUZEND"
            routes={routes(currentUser)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Switch>
        {getRoutes(routes(currentUser))}
        <Redirect
          from="*"
          to={currentUser.email !== "" ? `/dashboard` : `authentication/sign-in`}
        />
      </Switch>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
