/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { DataFunc } from "layouts/courses/data/authorsTableData";
import projectsTableData from "layouts/courses/data/projectsTableData";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.reselect";
import { setCurrentUser } from "redux/user/user.actions";
import { useEffect, useState } from "react";
import axios from "../../data/axios";
import { selectUniversal } from "redux/user/user.reselect";
import { useHistory } from "react-router-dom";

function Courses({ currentUser, universal, setCurrentUser }) {
  const history = useHistory();
  const [courses, useCourses] = useState(undefined);
  const { columns: prCols, rows: prRows } = projectsTableData(
    currentUser,
    universal,
    history,
    setCurrentUser
  );
  const coursesDataFetch = async () => {
    try {
      const res = await axios.get("/courses");
      useCourses(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    coursesDataFetch();
  }, []);

  const { columns, rows } = DataFunc(courses, currentUser, setCurrentUser, universal, history);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center">
              <VuiTypography variant="lg" color="white">
                Enrolled Courses
              </VuiTypography>
            </VuiBox>
            {currentUser.courses.coursesEnrolled.length !== 0 ? (
              <VuiBox
                sx={{
                  "& th": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                        `${borderWidth[1]} solid ${grey[700]}`,
                    },
                  },
                }}
              >
                <Table columns={prCols} rows={prRows} />
              </VuiBox>
            ) : (
              <VuiTypography variant="body2" sx={{ marginTop: "5px" }}>
                0 course enrolled
              </VuiTypography>
            )}
          </Card>
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
            <VuiTypography variant="lg" color="white">
              New Courses
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            {!(rows === "") ? <Table columns={columns} rows={rows} /> : ""}
          </VuiBox>
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    universal: selectUniversal(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (profile) => dispatch(setCurrentUser(profile)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
