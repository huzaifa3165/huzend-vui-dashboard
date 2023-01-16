import React from "react";
import VuiTypography from "components/VuiTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { Universal } from "../../../../data";
import { connect } from "react-redux";
import { setCurrentUser } from "redux/user/user.actions";
import { useHistory, useLocation } from "react-router-dom";
import { selectCurrentUser } from "redux/user/user.reselect";
import { createBrowserHistory } from "history";
import { addCongratulations } from "redux/profile/profile.actions";
import { selectCongratulations } from "redux/profile/profile.reselect";
import { addToDB } from "../../../../firebase";
import { selectUniversal } from "redux/user/user.reselect";

const RadioCard = ({
  Data,
  crsID,
  mdlID,
  nextModuleUrl,
  currentUser,
  setCurrentUser,
  congratulations,
  setCongratulations,
  universal,
}) => {
  const [ans, setAns] = React.useState("");
  const [error, setError] = React.useState(false);
  const [iteration, setIteration] = React.useState(0);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [answers, setAnswers] = React.useState([]);
  const history = useHistory();
  const handleRadioChange = (event) => {
    setAns(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ans === "") {
      setHelperText("Please select an option.");
      setError(true);
    } else {
      setAnswers([...answers, { key: Data[iteration].key, choose: ans }]);
      setHelperText("Choose wisely");
      setError(false);
      setAns("");
      setIteration(iteration + 1);
    }
  };
  const handleNextLesson = (e) => {
    e.preventDefault();
    setAns("");
    setIteration(0);
    setError(false);
    setHelperText("Choose wisely");
    setAnswers([]);
    if (crsID === currentUser.currentModule.id && mdlID === currentUser.currentModule.moduleID) {
      console.log("this is");
      console.log(crsID, mdlID);
      if (!(nextModuleUrl === "")) {
        console.log("a");
        let thisCourseMarks = 0;
        universal.courses.map((crs) => {
          if (crs.courseID === crsID) {
            crs.learnModule.map((mdl) => {
              if (mdl.id === mdlID) {
                thisCourseMarks = mdl.marks;
              }
            });
          }
        });
        console.log("Marks added", thisCourseMarks);
        const courseList = currentUser.completedCourses.map((currentCourse) => {
          if (currentUser.currentModule.id === currentCourse.id) {
            return {
              ...currentCourse,
              moduleID: currentCourse.moduleID + 1,
              marks: currentCourse.marks + thisCourseMarks,
            };
          } else {
            return currentCourse;
          }
        });
        console.log(crsID, mdlID);
        const newCourses = currentUser.courses.coursesEnrolled.map((crs) => {
          if (crs.courseID === crsID) {
            const taskCompletedNew = [...crs.taskCompleted, mdlID];
            return {
              ...crs,
              taskCompleted: taskCompletedNew,
            };
          } else {
            return crs;
          }
        });
        const newUser = {
          ...currentUser,
          currentModule: {
            ...currentUser.currentModule,
            moduleID: currentUser.currentModule.moduleID + 1,
          },
          completedCourses: courseList,
          courses: { ...currentUser.courses, coursesEnrolled: newCourses },
        };
        addToDB("users", newUser, currentUser.id);
        setCurrentUser(newUser);
        history.push(`${nextModuleUrl}`);
      } else {
        console.log("b");
        let crsName = "";
        universal.courses.map((course) => {
          crsName = course.courseName;
        });
        setCongratulations({
          ...congratulations,
          course: { courseName: crsName, courseId: crsID },
        });
        // send me to a congratulation page and give me a reward
      }
    } else {
      console.log("c");
      if (!(nextModuleUrl === "")) {
        setCurrentUser({
          ...currentUser,
        });
        console.log(nextModuleUrl);
        history.push(`${nextModuleUrl}`);
      } else {
        console.log("e");
        history.push("/module");
      }
    }
  };
  let i = 0;
  const dataLenght = Data.length;

  return (
    <>
      {iteration < dataLenght ? (
        <>
          <VuiBox component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mx: 3 }} error={error} variant="standard">
              <VuiTypography color="white" my={1} mb={3} variant="h4">
                Action Time
              </VuiTypography>
              <VuiTypography variant="h5" color="white" id="demo-error-radios">
                <VuiTypography variant="h6">
                  &nbsp;Question {iteration + 1}/{dataLenght}:
                </VuiTypography>
                {Data[iteration].title}?
              </VuiTypography>
              <VuiBox ml={3}>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="quiz"
                  value={ans}
                  onChange={handleRadioChange}
                  sx={{ marginLeft: 1 }}
                >
                  {Data[iteration].options.map(({ option, opValue }) => {
                    return (
                      <FormControlLabel
                        value={opValue}
                        sx={{
                          color: "white",
                        }}
                        control={<Radio />}
                        label={
                          <VuiTypography color="white" variant="h6">
                            {option}
                          </VuiTypography>
                        }
                      />
                    );
                  })}
                </RadioGroup>
                <FormHelperText sx={{ color: "white" }}>{helperText}</FormHelperText>
              </VuiBox>
              <VuiButton sx={{ mt: 1, mr: 1 }} type="submit" color="info">
                {iteration + 1 == dataLenght ? "Submit" : "Next"}
              </VuiButton>
            </FormControl>
          </VuiBox>
        </>
      ) : (
        <>
          <VuiBox component="form" onSubmit={handleNextLesson}>
            <FormControl sx={{ mx: 3 }} error={error} variant="standard">
              <VuiTypography color="white" my={1} mb={3} variant="h4">
                Result
              </VuiTypography>
              {Data.map((question) => {
                i++;
                return (
                  <>
                    <VuiTypography variant="h5" color="white" id="demo-error-radios">
                      <VuiTypography variant="h6">
                        &nbsp;Question {i}/{dataLenght}:
                      </VuiTypography>
                      {question.title}?
                    </VuiTypography>
                    {answers.map((answer) => {
                      if (question.key === answer.key) {
                        return (
                          <>
                            <VuiBox ml={3}>
                              <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value=""
                                onChange={handleRadioChange}
                                sx={{ marginLeft: 1 }}
                              >
                                {question.options.map(({ option, opValue }) => {
                                  return (
                                    <FormControlLabel
                                      value={opValue}
                                      sx={{
                                        color: "white",
                                      }}
                                      control={<Radio />}
                                      label={
                                        <VuiTypography
                                          color={
                                            opValue === "correct"
                                              ? "success"
                                              : opValue === answer.choose
                                              ? "error"
                                              : "white"
                                          }
                                          variant="h6"
                                        >
                                          {option}
                                        </VuiTypography>
                                      }
                                    />
                                  );
                                })}
                              </RadioGroup>
                            </VuiBox>
                          </>
                        );
                      }
                    })}
                  </>
                );
              })}
              <VuiButton sx={{ mt: 1, mr: 1 }} type="submit" color="info">
                Next Lesson
              </VuiButton>
            </FormControl>
          </VuiBox>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    congratulations: selectCongratulations(state),
    universal: selectUniversal(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCongratulations: (profile) => dispatch(addCongratulations(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioCard);
