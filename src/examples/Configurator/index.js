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

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Vision UI Dashboard React context
import {
  useVisionUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";
import { selectCurrentUser } from "redux/user/user.reselect";
import { selectUniversal } from "redux/user/user.reselect";
import { setCurrentUser } from "redux/user/user.actions";

function Configurator({ universal, currentUser, setCurrentUser }) {
  const [controller, dispatch] = useVisionUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "info", "success", "warning", "error"];
  const [data, useData] = useState({ id: "", title: "", moduleItems: [] });
  const history = useHistory();

  useEffect(() => {
    if (currentUser.displayName !== "" && universal && currentUser.currentModule) {
      // iterate universal and match the currentModule(currentUser) id with the universal course and id
      // add some logic to highlight the one which is the current one
      let iteration = true;
      universal.courses.map((course) => {
        if (currentUser.currentModule) {
          if (course.courseID === currentUser.currentModule.id && iteration) {
            iteration = false;
            useData({
              id: course.courseID,
              title: course.courseName,
              moduleItems: course.learnModule,
            });
          }
        }
      });
    }
  }, [currentUser, universal]);
  const changeCurrentModule = () => {
    // ////////////////////////////////////////////////////////////////////////////////
    // change the current Module

    if (data.id !== currentUser.currentModule.id) {
      let newCurrentModule;
      currentUser.completedCourses.map((crs) => {
        if (crs.id === data.id) {
          newCurrentModule = { id: crs.id, moduleID: crs.moduleID + 1 };
        }
      });
      addToDB(
        "universal",
        {
          ...currentUser,
          currentModule: newCurrentModule,
        },
        currentUser.id
      );
      setCurrentUser({
        ...currentUser,
        currentModule: newCurrentModule,
      });
    }
  };
  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <VuiBox
        backgroundColor="black"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        {currentUser.displayName !== "" && universal ? (
          <VuiBox>
            <VuiTypography color="white" variant="h5" fontWeight="bold">
              Learning
            </VuiTypography>
            <VuiTypography variant="body2" color="white" fontWeight="bold">
              {data.title}
            </VuiTypography>
          </VuiBox>
        ) : (
          ""
        )}
        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { white, dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: `${white.main} !important`,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </VuiBox>

      <Divider light />

      <VuiBox pb={1} px={3}>
        <VuiBox px={3.2}>
          {currentUser.displayName !== "" && universal ? (
            <>
              {data.moduleItems.map((moduleItem) => {
                return (
                  <>
                    <VuiTypography variant="caption" color="light" sx={{ display: "block" }}>
                      {moduleItem.id === currentUser.currentModule.moduleID ? (
                        <Link to={moduleItem.url} key={moduleItem.id} onClick={changeCurrentModule}>
                          <VuiTypography variant="body2" color="primary">
                            {moduleItem.moduleName}
                          </VuiTypography>
                        </Link>
                      ) : (
                        <VuiTypography variant="body2" color="text">
                          {moduleItem.moduleName}
                        </VuiTypography>
                      )}
                    </VuiTypography>
                  </>
                );
              })}
            </>
          ) : (
            ""
          )}
          {/* 
          <VuiBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                // below, the object given to arrow function is all the css methods from which we explicitly choosed using destructuring
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
                />
                ))}
              </VuiBox> */}
        </VuiBox>
        <Divider light />
        {/* {window.innerWidth >= 1440 && (
          <VuiBox mt={3} lineHeight={1}>
            <VuiTypography variant="h6" color="white">
              Sidenav Type
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Choose between 2 different sidenav types.
            </VuiTypography>

            <VuiBox
              sx={{
                display: "flex",
                mt: 2,
              }}
            >
              <VuiButton
                color="info"
                variant={transparentSidenav ? "contained" : "outlined"}
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={{
                  mr: 1,
                  ...sidenavTypeButtonsStyles,
                }}
              >
                Transparent
              </VuiButton>
              <VuiButton
                color="info"
                variant={transparentSidenav ? "outlined" : "contained"}
                onClick={handleWhiteSidenav}
                disabled={disabled}
                fullWidth
                sx={sidenavTypeButtonsStyles}
              >
                Opaque
              </VuiButton>
            </VuiBox>
          </VuiBox>
        )} */}

        {/* <VuiBox mt={3} mb={2} lineHeight={1}>
          <VuiTypography variant="h6" color="white">
            Navbar Fixed
          </VuiTypography>

          <VuiSwitch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" />
        </VuiBox> 

        <Divider light />
         */}

        <VuiBox mt={3} mb={2}>
          <VuiBox mb={2}>
            <VuiButton
              component="a"
              href="https://youtube.com/@huzend?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="contained"
              fullWidth
            >
              SUBSCRIBE ON YOUTUBE
            </VuiButton>
          </VuiBox>
          <VuiButton
            component="a"
            href="https://www.patreon.com/user?u=71272467"
            target="_blank"
            rel="noreferrer"
            color="info"
            variant="outlined"
            fullWidth
          >
            SUPPORT ON PATREON
          </VuiButton>
        </VuiBox>

        <VuiBox mt={3} textAlign="center">
          <VuiBox mb={0.5}>
            <VuiTypography variant="h6" color="white">
              Thank you for sharing!
            </VuiTypography>
          </VuiBox>

          <VuiBox display="flex" justifyContent="center">
            <VuiBox mr={1.5}>
              <VuiButton
                component={Link}
                href="https://twitter.com/intent/tweet?text=I'm%20learning%20premium%20courses%20from%20%40huzendofficial%20for%20free%20%23huzend%20%23youtube%20%23webdevelopment%20%23mobileappsdevelopment&url=https%3A%2F%2Fhuzend.com%2Fdashboard"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </VuiButton>
            </VuiBox>
            <VuiButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://huzend.com/dashboard"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </ConfiguratorRoot>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Configurator);
