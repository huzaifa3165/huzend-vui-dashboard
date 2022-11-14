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
import { profile } from "../../../data";
const TimeSpentLastYearPerMonth = (dataObj) => {
  let dataArray = [];
  Object.entries(dataObj).map(([key, value], index) => {
    const { w1, w2, w3, w4 } = value;
    const a1 = w1.reduce((a, b) => a + b, 0) / w1.length;
    const a2 = w2.reduce((a, b) => a + b, 0) / w2.length;
    const a3 = w3.reduce((a, b) => a + b, 0) / w3.length;
    const a4 = w4.reduce((a, b) => a + b, 0) / w4.length;
    dataArray.push(Math.round((a1 + a2 + a3 + a4) / 240)); // 4(average) * 60(toMinutes)
  });
  console.log(dataArray);
  return dataArray;
};

export const lineChartDataDashboard = [
  {
    name: "Time Spent",
    data: TimeSpentLastYearPerMonth(profile.lastYearTimeSpentFull),
  },
  {
    name: "Courses Watched",
    data: [200, 230, 300, 350, 370, 420, 550, 350, 400, 500, 330, 550],
  },
];
