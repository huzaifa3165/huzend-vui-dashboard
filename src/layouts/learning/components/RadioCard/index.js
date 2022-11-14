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
let Data = [];
Universal.courses.map((course) => {
  if (course.courseID === 1) {
    Data = course.learnModule.questions;
  }
});

const RadioCard = () => {
  const [ans, setAns] = React.useState("");
  const [error, setError] = React.useState(false);
  const [iteration, setIteration] = React.useState(0);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [answers, setAnswers] = React.useState([]);
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
  const handleNextLesson = () => {};
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

export default RadioCard;
