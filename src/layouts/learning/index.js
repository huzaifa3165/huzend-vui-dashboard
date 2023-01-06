import React from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import VuiBox from "components/VuiBox";
import { Card } from "@mui/material";
import RadioCard from "./components/RadioCard";
import Footer from "examples/Footer";
import Description from "./components/description";
import SourceCode from "./components/SourceCode";
import Video from "./components/Video";
import axios from "../../data/axios";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "redux/user/user.reselect";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectCongratulationsCourse } from "redux/profile/profile.reselect";
import Congratulations from "examples/Congratulations";

const Learning = ({ currentUser, congratulations }) => {
  const [fetchData, useFetchData] = useState(undefined);
  const learnID = useLocation().pathname;
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

  return congratulations ? (
    <>
      <DashboardLayout>
        <DashboardNavbar />

        <Congratulations
          courseName={congratulations.courseName}
          courseId={congratulations.courseId}
        />
        <Footer />
      </DashboardLayout>
    </>
  ) : (
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
    congratulations: selectCongratulationsCourse(state),
  };
};

export default connect(mapStateToProps)(Learning);
