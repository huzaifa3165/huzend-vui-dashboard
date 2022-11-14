import React from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import RadioCard from "./components/RadioCard";
import Footer from "examples/Footer";
import Description from "./components/description";
import SourceCode from "./components/SourceCode";
import Video from "./components/Video";

const Learning = () => {
  const learnID = useParams().learnID;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox p={3}>
        <VuiBox mb={3}>
          <Video />
        </VuiBox>

        <VuiBox>
          <Card>
            <Description />
            <SourceCode />
            <RadioCard />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Learning;
