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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import { Stack, IconButton, Icon } from "@mui/material";
import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import rgba from "assets/theme/functions/rgba";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { auth, signInWithGoogle, signInWithFacebook, signInWithGithub } from "../../../firebase";
import { Redirect } from "react-router-dom";
import { selectCurrentUser } from "redux/user/user.reselect";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

function SignIn({ currentUser }) {
  const [redirect, setRedirect] = useState(undefined);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    await auth
      .signInWithEmailAndPassword(event.target.email.value, event.target.password.value)
      .then(() => {
        setRedirect(true);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") alert("Wrong password");
        if (error.code === "auth/user-not-found") alert("No User Exist with this email!");
      });
  };
  console.log(currentUser);
  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="HUZEND:"
      motto="LEARNING DIGITAL SKILLS"
      image={bgSignIn}
    >
      <Switch>{currentUser.email === "" ? "" : <Redirect from="*" to="/dashboard" />}</Switch>

      <VuiBox component="form" role="form" onSubmit={handleSubmit}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Your email..."
              fontWeight="500"
              name="email"
              id="email"
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password..."
              name="password"
              id="password"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>

        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            SIGN IN
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          color="text"
          fontWeight="bold"
          textAlign="center"
          mb="14px"
          sx={({ typography: { size } }) => ({ fontSize: size.lg })}
        >
          or
        </VuiTypography>
        <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
          <GradientBorder borderRadius="xl">
            <a href="#">
              <IconButton
                transition="all .25s ease"
                justify="center"
                align="center"
                bg="rgb(19,21,54)"
                borderradius="15px"
                sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                  borderRadius: borderRadius.xl,
                  padding: "25px",
                  backgroundColor: secondary.focus,
                  "&:hover": {
                    backgroundColor: rgba(secondary.focus, 0.9),
                  },
                })}
                onClick={signInWithFacebook}
              >
                <Icon
                  as={FaFacebook}
                  w="30px"
                  h="30px"
                  sx={({ palette: { white } }) => ({
                    color: white.focus,
                  })}
                />
              </IconButton>
            </a>
          </GradientBorder>
          <GradientBorder borderRadius="xl">
            <a href="#">
              <IconButton
                transition="all .25s ease"
                justify="center"
                align="center"
                bg="rgb(19,21,54)"
                borderradius="15px"
                sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                  borderRadius: borderRadius.xl,
                  padding: "25px",
                  backgroundColor: secondary.focus,
                  "&:hover": {
                    backgroundColor: rgba(secondary.focus, 0.9),
                  },
                })}
                onClick={signInWithGithub}
              >
                <Icon
                  as={FaGithub}
                  w="30px"
                  h="30px"
                  sx={({ palette: { white } }) => ({
                    color: white.focus,
                  })}
                />
              </IconButton>
            </a>
          </GradientBorder>
          <GradientBorder borderRadius="xl">
            <a href="#">
              <IconButton
                transition="all .25s ease"
                justify="center"
                align="center"
                bg="rgb(19,21,54)"
                borderradius="15px"
                sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                  borderRadius: borderRadius.xl,
                  padding: "25px",
                  backgroundColor: secondary.focus,
                  "&:hover": {
                    backgroundColor: rgba(secondary.focus, 0.9),
                  },
                })}
                onClick={signInWithGoogle}
              >
                <Icon
                  as={FaGoogle}
                  w="30px"
                  h="30px"
                  sx={({ palette: { white } }) => ({
                    color: white.focus,
                  })}
                />
              </IconButton>
            </a>
          </GradientBorder>
        </Stack>
      </VuiBox>
    </CoverLayout>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
  };
};

export default connect(mapStateToProps)(SignIn);
