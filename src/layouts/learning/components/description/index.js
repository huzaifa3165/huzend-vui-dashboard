import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";

const Description = ({ desc }) => {
  return (
    <>
      <VuiTypography color="white" my={1} mb={2} variant="h4">
        Description
      </VuiTypography>
      <VuiBox ml={2}>
        <VuiTypography variant="h6">{desc}</VuiTypography>
      </VuiBox>
    </>
  );
};

export default Description;
