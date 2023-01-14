import { useState, useEffect } from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/cardimgfree.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.reselect";
import { selectUniversal } from "redux/user/user.reselect";
import { useHistory } from "react-router-dom";

const WelcomeMark = ({ currentUser, universal }) => {
  const [redirect, useRedirect] = useState(false);
  const [learningLink, useLearningLink] = useState("");
  const history = useHistory();
  useEffect(() => {
    let iteration = true;
    if (universal) {
      universal.courses.map((course) => {
        if (currentUser.currentModule) {
          if (course.courseID === currentUser.currentModule.id) {
            course.learnModule.map((module) => {
              if (module.id === currentUser.currentModule.moduleID && iteration) {
                iteration = false;
                useLearningLink(module.moduleName);
              }
            });
          }
        }
      });
    }
  }, [currentUser]);
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
          onClick={() => history.push(learningLink ? `/learning/${learningLink}` : "/courses")}
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
    universal: selectUniversal(state),
  };
};

export default connect(mapStateToProps)(WelcomeMark);
