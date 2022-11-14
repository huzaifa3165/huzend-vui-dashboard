import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";

const Description = () => {
  return (
    <>
      <VuiTypography color="white" my={1} mb={2} variant="h4">
        Description
      </VuiTypography>
      <VuiBox ml={2}>
        <VuiTypography variant="h6">
          In this video, we are going to learn the basics of the html css and javascript to continue
          the react js course. But before starting it is important to setup our environment so go
          and install:
          <br />{" "}
          <ul>
            <li>Vs code</li>
            <li>Node Js</li>
            <li>Google Chrome</li>
          </ul>
          After installing them all you can continue with the course.
        </VuiTypography>
      </VuiBox>
    </>
  );
};

export default Description;
