import { useState, useEffect } from "react";
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
import { connect } from "react-redux";
// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

import axios from "./data/axios";
import { auth, createNewUserIfExist } from "./firebase";
import { selectCurrentUser } from "redux/user/user.reselect";
import { setCurrentUser } from "redux/user/user.actions";
import { initialUser } from "data";
import { selectUniversal } from "redux/user/user.reselect";
import { setUniversal } from "redux/user/user.actions";
import usePageVisibility from "utils/usePageVisibility";

const App = ({ currentUser, universal, setUniversal, setCurrentUser }) => {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  usePageVisibility((time) => time >= 0 && axios.post("/timeSpent", { time, id: currentUser.id }));

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

  useEffect(async () => {
    const res = await axios.get("/universal");
    console.log(res);
    setUniversal(res.data);
  }, []);

  useEffect(() => {
    const unsubscribeAuthOnCalling = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createNewUserIfExist(user);
        userRef.onSnapshot((snapShot) => {
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
        local_library
      </Icon>
    </VuiBox>
  );

  return (
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
          to={currentUser.email !== "" ? `/dashboard` : `/authentication/sign-in`}
        />
      </Switch>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setUniversal: (user) => dispatch(setUniversal(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
