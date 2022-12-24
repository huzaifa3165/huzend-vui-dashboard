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
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

import { Universal } from "../../../data";

function Author({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

export default {
  columns: [
    { name: "name", align: "left" },
    { name: "instructor", align: "left" },
    { name: "upload", align: "center" },
    { name: "date", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: Universal.courses.map((course) => {
    return {
      name: <Author image={avatar4} name={course.courseName} email={`${course.duration} Hrs`} />,
      instructor: <Function job={course.instructor.name} org={course.instructor.role} />,
      upload: (
        <VuiBadge
          variant="standard"
          badgeContent={course.uploadCompleted ? "Complete" : "Ongoing"}
          color={course.uploadCompleted ? "success" : "white"}
          size="xs"
          container
          sx={
            course.uploadCompleted
              ? ({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
                  background: success.main,
                  border: `${borderWidth[1]} solid ${success.main}`,
                  borderRadius: borderRadius.md,
                  color: white.main,
                })
              : ({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
                  background: "unset",
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderRadius: borderRadius.md,
                  color: white.main,
                })
          }
        />
      ),
      date: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {course.createdOn}
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Enroll
        </VuiTypography>
      ),
    };
  }),
};
