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

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import { useVisionUIController } from "context";
function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      py={2}
      pb={0}
    >
      <VuiBox item xs={12} sx={{ textAlign: "center" }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          &copy; Copyright 2023 &nbsp;|&nbsp; Made by&nbsp;
          <VuiTypography
            component="a"
            variant="button"
            href="https://youtube.com/huzend"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="info"
            mr="2px"
          >
            Huzend&nbsp;&nbsp;
          </VuiTypography>
          | &nbsp;Designed by&nbsp;
          <VuiTypography
            component="a"
            variant="button"
            href="https://creative-tim.com/"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="info"
            mr="2px"
          >
            Creative-Tim&nbsp;
          </VuiTypography>
        </VuiTypography>
      </VuiBox>
      <VuiBox item xs={10}>
        <VuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography component="a" href="#" variant="body2" color="white">
              Contact
            </VuiTypography>
          </VuiBox>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography component="a" href="#" variant="body2" color="white">
              Blog
            </VuiTypography>
          </VuiBox>
          <VuiBox>
            <VuiTypography component="a" href="#" variant="body2" color="white">
              Channel
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

export default Footer;
