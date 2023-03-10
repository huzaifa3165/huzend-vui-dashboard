import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { CardMedia } from "@mui/material";
import { Card } from "@mui/material";

const SourceCode = ({ sourceCode }) => {
  return (
    <>
      <VuiTypography color="white" my={1} mb={2} variant="h4">
        Source Code
      </VuiTypography>
      <VuiBox mb={2}>
        <CardMedia
          component="iframe"
          src={`https://www.thiscodeworks.com/embed/${sourceCode}`}
          sx={{ width: "96%", height: "208px", overflow: "hidden", borderRadius: "none" }}
          frameBorder="0"
        />
      </VuiBox>
    </>
  );
};

export default SourceCode;
