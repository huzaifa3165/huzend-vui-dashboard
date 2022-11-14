import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { StyledGist } from "./style";
import { CardMedia } from "@mui/material";
import { Card } from "@mui/material";

const SourceCode = () => {
  return (
    <>
      <VuiTypography color="white" my={1} mb={2} variant="h4">
        Source Code
      </VuiTypography>
      <VuiBox mb={2}>
        <CardMedia
          component="iframe"
          src="https://www.thiscodeworks.com/embed/636de3f1258bfe0015555ad8"
          sx={{ width: "96%", height: "208px", overflow: "hidden", borderRadius: "none" }}
          frameBorder="0"
        />
      </VuiBox>
    </>
  );
};

export default SourceCode;
