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
const emptyLastYearTimeSpent = {
  1: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  2: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  3: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  4: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  5: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  6: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  7: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  8: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  9: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  10: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  11: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  12: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
};
function convertToNewObject(lastYearTimeSpentFull) {
  const result = {};
  for (const month in lastYearTimeSpentFull) {
    result[month] = {};
    for (let day = 1; day <= 31; day++) {
      const week = Math.ceil(day / 7);
      if (!result[month][`w${week}`]) {
        result[month][`w${week}`] = Array(7).fill(0);
      }
      result[month][`w${week}`][(day - 1) % 7] = lastYearTimeSpentFull[month][day];
    }
  }
  return result;
}

const TimeSpentLastYearPerMonth = (dataObj) => {
  let dataArray = [];
  Object.entries(dataObj).map(([key, value], index) => {
    const { w1, w2, w3, w4, w5 } = value;
    const a1 = w1.reduce((a, b) => a + b, 0);
    const a2 = w2.reduce((a, b) => a + b, 0);
    const a3 = w3.reduce((a, b) => a + b, 0);
    const a4 = w4.reduce((a, b) => a + b, 0);
    const a5 = w5.reduce((a, b) => a + b, 0);
    dataArray.push(Math.round((a1 + a2 + a3 + a4 + a5) * 60)); // 4(average) * 60(toMinutes)
  });
  return dataArray;
};
const lineChartDataDashboard = (profile) => {
  return [
    {
      name: "Time Spent (Minutes)",
      data: profile
        ? TimeSpentLastYearPerMonth(convertToNewObject(profile.lastYearTimeSpentFull))
        : TimeSpentLastYearPerMonth(emptyLastYearTimeSpent),
    },
    {
      name: "Blogs Traffic",
      data: profile ? profile.blogsTraffic : [0, 0, 0, 0, 0, 0, 0],
    },
  ];
};

export default lineChartDataDashboard;
