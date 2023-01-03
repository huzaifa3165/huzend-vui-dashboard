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
import { Universal } from "../../data";
import axios from "../../data/axios";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "redux/user/user.reselect";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const Learning = ({ currentUser }) => {
  const [fetchData, useFetchData] = useState(undefined);
  const learnID = useLocation().pathname; // can change the pathname by adding to the redux
  const learningDataFetch = async (learnID) => {
    try {
      const res = await axios.post("/learningdata", { title: learnID });
      useFetchData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    learningDataFetch(learnID);
  }, [currentUser]);
  // const { data, courseID, moduleID } = fetchData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {console.log(fetchData)}
      {fetchData && (
        <VuiBox p={3}>
          <VuiBox mb={3}>
            <Video videoUrl={fetchData.data.video} />
          </VuiBox>
          <VuiBox>
            <Card>
              <Description desc={fetchData.data.description} />
              <SourceCode sourceCode={fetchData.data.sourceCode} />
              <RadioCard
                Data={fetchData.data.questions}
                crsID={fetchData.courseID}
                mdlID={fetchData.moduleID}
                nextModuleUrl={fetchData.nextUrl}
              />
            </Card>
          </VuiBox>
        </VuiBox>
      )}
      <Footer />
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
  };
};

export default connect(mapStateToProps)(Learning);
