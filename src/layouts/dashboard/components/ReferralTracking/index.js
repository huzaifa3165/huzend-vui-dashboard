import React from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { FaEllipsisH } from "react-icons/fa";
import linearGradient from "assets/theme/functions/linearGradient";
import CircularProgress from "@mui/material/CircularProgress";
import { profile, Universal } from "../../../../data";

function ReferralTracking() {
  const { info, gradients } = colors;
  const { cardContent } = gradients;
  let activeCourse = {};
  profile.courses.coursesEnrolled.map((course) => {
    if (course.activelyTaking) {
      activeCourse = course;
    }
  });
  let activeCourseUniversal = {};
  Universal.courses.map((course) => {
    console.log(course.courseID, activeCourse.courseID);
    if (course.courseID === activeCourse.courseID) {
      activeCourseUniversal = course;
    }
  });
  const percentage = Math.round(
    (profile.courses.coursesEnrolled.filter((obj) => obj.activelyTaking)[0].taskCompleted.videos
      .length /
      activeCourseUniversal.learnModule.length) *
      100
  );

  // const percentage = Math.round(
  //   ((activeCourse.tasksCompleted.videos.length + activeCourse.tasksCompleted.tasks.length) / 200) *
  //     100
  // );
  return (
    <Card
      sx={{
        height: "100%",
        background: linearGradient(
          gradients.cardDark.main,
          gradients.cardDark.state,
          gradients.cardDark.deg
        ),
      }}
    >
      <VuiBox sx={{ width: "100%" }}>
        <VuiBox
          display="flex"
          alignItems="center"
          justifyContent="space-beetween"
          sx={{ width: "100%" }}
          mb="40px"
        >
          <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
            {activeCourse.courseName} Tracking
          </VuiTypography>
          <VuiBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="#22234B"
            sx={{ width: "37px", height: "37px", cursor: "pointer", borderRadius: "12px" }}
          >
            <FaEllipsisH color={info.main} size="18px" />
          </VuiBox>
        </VuiBox>
        <VuiBox
          display="flex"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            },
            [breakpoints.up("md")]: {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          })}
        >
          <Stack
            direction="column"
            spacing="20px"
            width="500px"
            maxWidth="50%"
            sx={({ breakpoints }) => ({
              mr: "auto",
              [breakpoints.only("md")]: {
                mr: "75px",
              },
              [breakpoints.only("xl")]: {
                width: "500px",
                maxWidth: "40%",
              },
            })}
          >
            <VuiBox
              display="flex"
              width="220px"
              p="20px 22px"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                [breakpoints.up("xl")]: {
                  maxWidth: "110px !important",
                },
                [breakpoints.up("xxl")]: {
                  minWidth: "180px",
                  maxWidth: "100% !important",
                },
              })}
            >
              <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
                Total Videos
              </VuiTypography>
              <VuiTypography color="white" variant="lg" fontWeight="bold">
                {activeCourseUniversal.learnModule.length === 1
                  ? "1 Video"
                  : `${activeCourseUniversal.learnModule.length} Videos`}
              </VuiTypography>
            </VuiBox>
            <VuiBox
              display="flex"
              width="220px"
              p="20px 22px"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                [breakpoints.up("xl")]: {
                  maxWidth: "110px !important",
                },
                [breakpoints.up("xxl")]: {
                  minWidth: "180px",
                  maxWidth: "100% !important",
                },
              })}
            >
              <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
                Watched
              </VuiTypography>
              <VuiTypography color="white" variant="lg" fontWeight="bold">
                {profile.courses.coursesEnrolled.filter((obj) => obj.activelyTaking)[0]
                  .taskCompleted.videos.length === 1
                  ? "1 Video"
                  : `${
                      profile.courses.coursesEnrolled.filter((obj) => obj.activelyTaking)[0]
                        .taskCompleted.videos.length
                    } Videos`}{" "}
              </VuiTypography>
            </VuiBox>
          </Stack>
          <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
              color="success"
            />
            <VuiBox
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VuiBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <VuiTypography color="text" variant="button" mb="4px">
                  Watched
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="d5"
                  fontWeight="bold"
                  mb="4px"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "32px",
                    },
                  })}
                >
                  {percentage}%
                </VuiTypography>
                <VuiTypography color="text" variant="button">
                  Out of {activeCourseUniversal.learnModule.length}
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;
