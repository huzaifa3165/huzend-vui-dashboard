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

/* eslint-disable react/prop-types */
// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import { profile, Universal } from "../../../data";
let tasksTotalLength;

const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <VuiAvatar
        src={image}
        alt="name"
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { dark } }) =>
            `${borderWidth[2]} solid ${dark.focus}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));
function Completion({ value, color }) {
  return (
    <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
        {value}%&nbsp;
      </VuiTypography>
      <VuiBox width="8rem">
        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={false} />
      </VuiBox>
    </VuiBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectsTableData = (currentUser, universal) => {
  return {
    columns: [
      { name: "title", align: "left" },
      { name: "instructors", align: "left" },
      { name: "students", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: currentUser.courses.coursesEnrolled.map((data) => {
      universal.courses.map((course) => {
        if (data.courseID === course.courseID) {
          tasksTotalLength = course.learnModule.length;
        }
      });
      return {
        title: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              {data.courseName}
            </VuiTypography>
          </VuiBox>
        ),
        instructors: (
          <VuiBox display="flex" py={1}>
            {avatars(
              data.instructors.map((data2) => {
                let list = [data2.image, data2.name];
                return list;
              })
            )}
          </VuiBox>
        ),
        students: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            {Universal.courses.map((course) => {
              if (data.courseID === course.courseID) {
                return course.totalEnrollments;
              }
            })}
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              {Math.round((data.taskCompleted.length / tasksTotalLength) * 100)} %
            </VuiTypography>
            <VuiProgress
              value={Math.round((data.taskCompleted.length / tasksTotalLength) * 100)}
              color="info"
              label={false}
              sx={{ background: "#2D2E5F" }}
            />
          </VuiBox>
        ),
      };
    }),
  };
};

export default projectsTableData;
