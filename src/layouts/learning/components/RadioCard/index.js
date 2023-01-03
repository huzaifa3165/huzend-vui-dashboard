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

const RadioCard = ({ Data, crsID, mdlID, nextModuleUrl, currentUser, setCurrentUser }) => {
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
    console.log("submitting");
    let newUser = {};
    if (crsID === currentUser.currentModule.id && mdlID === currentUser.currentModule.moduleID) {
      const courseList = currentUser.completedCourses.map((currentCourse) => {
        if (currentUser.currentModule.id === currentCourse.id) {
          let crs = currentCourse;

          console.log("before", crs);
          crs.moduleID += 1;
          console.log("after", crs);
          return crs;
        } else {
          return currentCourse;
        }
      });
      console.log(crsID, mdlID);
      setCurrentUser({
        ...currentUser,
        currentModule: {
          ...currentUser.currentModule,
          moduleID: currentUser.currentModule.moduleID + 1,
        },
        completedCourses: courseList,
      });
      history.push(`${nextModuleUrl}`);
      console.log(history);
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioCard);
