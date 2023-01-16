import React, { useEffect, useState } from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { FaEllipsisH } from "react-icons/fa";
import linearGradient from "assets/theme/functions/linearGradient";
import CircularProgress from "@mui/material/CircularProgress";
import { Universal } from "../../../../data";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.reselect";
import { selectUniversal } from "redux/user/user.reselect";
import { IoIosArrowForward } from "react-icons/io";
import { useHistory } from "react-router-dom";

function ReferralTracking({ currentUser, universal }) {
  const { info, gradients } = colors;
  const { cardContent } = gradients;
  const [activeCourse, setActiveCourse] = useState({});
  const [activeCourseUniversal, setActiveCourseUniversal] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (universal && currentUser.displayName) {
      currentUser.courses.coursesEnrolled.map((course) => {
        if (course.courseID === currentUser.currentModule.id) {
          setActiveCourse(course);
          universal.courses.map((crs) => {
            if (crs.courseID === currentUser.currentModule.id) {
              setActiveCourseUniversal(crs);
            }
          });
        }
      });
    }
  }, [currentUser, universal]);

  const percentage = activeCourse.taskCompleted
    ? Math.round(
        (activeCourse.taskCompleted.length / activeCourseUniversal.learnModule.length) * 100
      )
    : 0;

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
            {activeCourse.courseName ? activeCourse.courseName : ""} Course
          </VuiTypography>
          <VuiBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="#22234B"
            sx={{ width: "37px", height: "37px", cursor: "pointer", borderRadius: "12px" }}
            onClick={() => history.push("/module")}
          >
            <IoIosArrowForward color={info.main} size="18px" />
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
              {activeCourseUniversal.learnModule ? (
                <VuiTypography color="white" variant="lg" fontWeight="bold">
                  {activeCourseUniversal.learnModule.length === 1
                    ? "1 Video"
                    : `${activeCourseUniversal.learnModule.length} Videos`}
                </VuiTypography>
              ) : (
                <VuiTypography color="white" variant="lg" fontWeight="bold">
                  0 Videos
                </VuiTypography>
              )}
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
              {activeCourse.taskCompleted ? (
                <VuiTypography color="white" variant="lg" fontWeight="bold">
                  {activeCourse.taskCompleted.length === 1
                    ? "1 Video"
                    : `${activeCourse.taskCompleted.length} Videos`}{" "}
                </VuiTypography>
              ) : (
                <VuiTypography color="white" variant="lg" fontWeight="bold">
                  0 Video
                </VuiTypography>
              )}
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
                  Out of
                  {activeCourseUniversal.learnModule
                    ? activeCourseUniversal.learnModule.length
                    : () => null}
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};

export default connect(mapStateToProps)(ReferralTracking);
