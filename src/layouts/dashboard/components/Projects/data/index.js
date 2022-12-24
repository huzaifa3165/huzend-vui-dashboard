// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
// import Atlassian from "examples/Icons/Atlassian";
// import Slack from "examples/Icons/Slack";
// import Spotify from "examples/Icons/Spotify";
// import Jira from "examples/Icons/Jira";
// import Invision from "examples/Icons/Invision";
// import avatar1 from "assets/images/avatar1.png";
// import avatar2 from "assets/images/avatar2.png";
// import avatar3 from "assets/images/avatar3.png";
// import avatar4 from "assets/images/avatar4.png";
import { Universal } from "../../../../../data";
let tasksTotalLength;

export default function data(profile) {
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

  return {
    columns: [
      { name: "title", align: "left" },
      { name: "instructors", align: "left" },
      { name: "students", align: "center" },
      { name: "completion", align: "center" },
    ],
    rows: profile.courses.coursesEnrolled.map((data) => {
      Universal.courses.map((course) => {
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
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {Universal.courses.map((course) => {
              if (course.courseID === data.courseID) {
                return course.totalEnrollments;
              }
            })}
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              {Math.round((data.taskCompleted.length / tasksTotalLength) * 100)}%
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
}
