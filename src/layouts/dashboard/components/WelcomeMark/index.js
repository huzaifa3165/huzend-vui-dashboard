import { useState, useEffect } from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/cardimgfree.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.reselect";
const WelcomeMark = ({ currentUser }) => {
  const [redirect, useRedirect] = useState(false);
  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      })}
    >
      {redirect ? <Redirect from="*" to="/learning/123" /> : ""}
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Welcome back,
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            {currentUser ? currentUser.displayName : {}}
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Glad to see you again!
            <br /> Let's start Learning.
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          onClick={() => {
            useRedirect(true);
          }}
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Tap to continue
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
  };
};

export default connect(mapStateToProps)(WelcomeMark);
