import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectUniversal } from "redux/user/user.reselect";
import Table from "../../examples/Tables/Table";
import { selectCurrentUser } from "redux/user/user.reselect";
import { setCurrentUser } from "redux/user/user.actions";

const Module = ({ currentUser, universal, setCurrentUser }) => {
  const [data, useData] = useState({ id: "", title: "", moduleItems: [] });
  useEffect(() => {
    if (currentUser.displayName !== "" && universal) {
      // iterate universal and match the currentModule(currentUser) id with the universal course and id
      // add some logic to highlight the one which is the current one
      let iteration = true;
      universal.courses.map((course) => {
        if (course.courseID === currentUser.currentModule.id && iteration) {
          iteration = false;
          useData({
            id: course.courseID,
            title: course.courseName,
            moduleItems: course.learnModule,
          });
        }
      });
    }
  }, [currentUser, universal]);
  const changeCurrentModule = () => {
    // ////////////////////////////////////////////////////////////////////////////////
    // change the current Module

    if (data.id !== currentUser.currentModule.id) {
      let newCurrentModule;
      currentUser.completedCourses.map((crs) => {
        if (crs.id === data.id) {
          newCurrentModule = { id: crs.id, moduleID: crs.moduleID + 1 };
        }
      });
      setCurrentUser({
        ...currentUser,
        currentModule: newCurrentModule,
      });
    }
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Card>
          <VuiBox>
            {currentUser.displayName !== "" && universal ? (
              <>
                <VuiTypography variant="h3" color="light">
                  {data.title}
                </VuiTypography>
                <VuiBox>
                  <VuiBox>
                    <Table
                      columns={[
                        { name: "title", align: "left" },
                        { name: "date", align: "center" },
                        { name: "marks", align: "center" },
                      ]}
                      rows={data.moduleItems.map((moduleItem) => {
                        let newDateStr = new Date(
                          moduleItem.date.seconds * 1000 + moduleItem.date.nanoseconds / 1000000
                        ).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        });
                        return {
                          title: (
                            <Link
                              to={moduleItem.url}
                              key={moduleItem.id}
                              onClick={changeCurrentModule}
                            >
                              <VuiTypography variant="outline" color="primary">
                                {moduleItem.moduleName}
                              </VuiTypography>
                            </Link>
                          ),
                          date: newDateStr,
                          marks: moduleItem.marks,
                        };
                      })}
                    ></Table>
                  </VuiBox>
                </VuiBox>
              </>
            ) : (
              ""
            )}
          </VuiBox>
        </Card>
        <Footer />
      </DashboardLayout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
