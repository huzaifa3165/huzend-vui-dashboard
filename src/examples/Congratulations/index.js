import React from "react";
import VuiBox from "components/VuiBox";
import { Card, Divider } from "@mui/material";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { connect } from "react-redux";
import gif from "../../assets/images/achievement.png";
import { addCongratulations } from "redux/profile/profile.actions";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "redux/user/user.actions";
import { selectCurrentUser } from "redux/user/user.reselect";
import { selectCongratulationsCourse } from "redux/profile/profile.reselect";
import { addToDB } from "../../firebase";

const Congratulations = ({
  courseName,
  courseId,
  setCongratulations,
  currentUser,
  setCurrentUser,
}) => {
  const history = useHistory();
  const handleContinue = (e) => {
    e.preventDefault();
    const newArray = currentUser.courses.coursesEnrolled.filter((obj) => obj.courseID !== courseId);
    setCongratulations({ course: null });
    addToDB(
      "users",
      {
        ...currentUser,
        courses: {
          ...currentUser.courses,
          coursesEnrolled: newArray,
        },
      },
      currentUser.id
    );
    setCurrentUser({
      ...currentUser,
      courses: {
        ...currentUser.courses,
        coursesEnrolled: newArray,
      },
    });
    history.push("/courses");
  };
  return (
    <Card sx={{ margin: "0px 20%" }}>
      <VuiBox>
        <VuiBox
          sx={{
            backgroundImage: `url(${gif})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50%",
            width: "100%",
            height: "35.5vh",
            marginBottom: "2vh",
          }}
        ></VuiBox>
        <VuiTypography
          color="light"
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "0.8vh" }}
        >
          Congratulations
        </VuiTypography>
        <VuiTypography variant="body2" color="text" sx={{ textAlign: "center" }}>
          You have completed {courseName} Course
        </VuiTypography>
        <Divider light />
        <VuiBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <VuiButton variant="contained" color="info" onClick={handleContinue}>
            Continue
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCongratulations: (profile) => dispatch(addCongratulations(profile)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Congratulations);
