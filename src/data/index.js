// all time is in seconds

import { array } from "prop-types";
import { Provider } from "react-redux";

// functions

// data
export const profile = {
  name: "Mark Johnson",
  email: "mark@huzend.com",
  timeSpentToday: 3480,
  lastYearTimeSpentFull: {
    1: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 9600, 3630, 5234, 4120, 6649],
    },
    2: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 234],
      w2: [1400, 3120, 2300, 234, 345, 4324, 421],
      w3: [5400, 3300, 200, 5400, 3425, 2342, 400],
      w4: [1009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    3: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    4: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    5: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    6: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    7: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [4890, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 4890, 5234, 4120, 6649],
    },
    8: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 4890, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    9: {
      w1: [3100, 6500, 3400, 2350, 5240, 48944, 3234],
      w2: [4890, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    10: {
      w1: [3100, 6500, 3400, 2350, 4890, 2344, 3234],
      w2: [1400, 3120, 4890, 5234, 5345, 4324, 5421],
      w3: [5400, 4890, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 4899],
    },
    11: {
      w1: [3100, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 5234, 5345, 4324, 5421],
      w3: [5400, 3300, 6200, 5400, 3425, 4892, 7400],
      w4: [3009, 3400, 1600, 3630, 5234, 4120, 6649],
    },
    12: {
      w1: [4890, 6500, 3400, 2350, 5240, 2344, 3234],
      w2: [1400, 3120, 2300, 4894, 5345, 4324, 5421],
      w3: [4890, 3300, 6200, 5400, 3425, 2342, 7400],
      w4: [3009, 3400, 1600, 4890, 5234, 4120, 6649],
    },
  },

  courses: {
    coursesEnrolled: [
      {
        courseName: "App Development",
        courseID: 2,
        activelyTaking: false,
        taskCompleted: {
          videos: ["7sd8d", "asdfc", "adsfa", "8asfd", "vcxbf"],
          tasks: ["igvbm", "iovjg", "lkfvd", "dfdff", "dfjkl"],
        },
        instructors: [
          {
            name: "Ryan Tompson",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar1.png",
          },
          {
            name: "Romina Hadid",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar2.png",
          },
          {
            name: "Alexander Smith",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar3.png",
          },
          {
            name: "Jessica Doe",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar4.png",
          },
        ],
        students: 900,
      },
      {
        courseName: "Game Development",
        courseID: 3,
        activelyTaking: false,
        taskCompleted: {
          videos: [
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
          ],
          tasks: [
            "igvbm",
            "iovjg",
            "lkfvd",
            "dfdff",
            "dfjkl",
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
            "7sd8d",
            "asdfc",
            "adsfa",
            "8asfd",
            "vcxbf",
          ],
        },
        instructors: [
          {
            name: "Ryan Tompson",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar1.png",
          },
          {
            name: "Romina Hadid",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar2.png",
          },
          {
            name: "Alexander Smith",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar3.png",
          },
          {
            name: "Jessica Doe",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar4.png",
          },
        ],
        students: 900,
      },
      {
        courseName: "Web Development",
        courseID: 1,
        activelyTaking: true,
        taskCompleted: {
          videos: ["7sd8d", "ljdf"],
          tasks: ["igvbm", "iovjg", "lkfvd", "dfdff", "dfjkl"],
        },
        instructors: [
          {
            name: "Ryan Tompson",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar1.png",
          },
          {
            name: "Romina Hadid",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar2.png",
          },
          {
            name: "Alexander Smith",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar3.png",
          },
          {
            name: "Jessica Doe",
            image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar4.png",
          },
        ],
        students: 900,
      },
    ],
  },
  subscribedToNewsletter: true,
  posts: [
    {
      postID: "2d5a8dc",
    },
    {
      postID: "2d5a8dc",
    },
    {
      postID: "d5as8dc",
    },
  ],
  rewards: [
    {
      title: "Unstoppable Learner",
      description: "Watched courses for more than 5 hours without break",
      image: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
    },
    {
      title: "Unstoppable Learner",
      description: "Watched courses for more than 5 hours without break",
      image: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
    },
    {
      title: "Unstoppable Learner",
      description: "Watched courses for more than 5 hours without break",
      image: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
    },
    {
      title: "Unstoppable Learner",
      description: "Watched courses for more than 5 hours without break",
      image: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
    },
    {
      title: "Unstoppable Learner",
      description: "Watched courses for more than 5 hours without break",
      image: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
    },
  ],
};

export const Universal = {
  courses: [
    {
      courseID: 1,
      courseName: "Web Development",
      totalEnrollments: 3234,
      learnModule: [
        {
          id: 1,
          moduleName: "Introduction To the HTML",
          video: "https://youtube.com/",
          description: "This is a description",
          sourceCode: "32gjh45g43g5k4jg",
          questions: [
            {
              key: 1,
              title: "Which is the World's Best man Ever in the history",
              options: [
                { option: "Muhammad P.B.U.H", opValue: "correct" },
                { option: "Anyone else", opValue: "incorrect1" },
                { option: "Someone else", opValue: "incorrect2" },
              ],
            },
            {
              key: 2,
              title: "Which is the World's Best place",
              options: [
                { option: "Meka", opValue: "correct" },
                { option: "Dubai", opValue: "incorrect1" },
                { option: "Australia", opValue: "incorrect2" },
              ],
            },
          ],
        },
        {
          id: 1,
          moduleName: "Introduction To the HTML",
          video: "https://youtube.com/",
          description: "This is a description",
          sourceCode: "32gjh45g43g5k4jg",
          questions: [
            {
              key: 1,
              title: "Which is the World's Best man Ever in the history",
              options: [
                { option: "Muhammad P.B.U.H", opValue: "correct" },
                { option: "Anyone else", opValue: "incorrect1" },
                { option: "Someone else", opValue: "incorrect2" },
              ],
            },
            {
              key: 2,
              title: "Which is the World's Best place",
              options: [
                { option: "Meka", opValue: "correct" },
                { option: "Dubai", opValue: "incorrect1" },
                { option: "Australia", opValue: "incorrect2" },
              ],
            },
          ],
        },
        {
          id: 1,
          moduleName: "Introduction To the HTML",
          video: "https://youtube.com/",
          description: "This is a description",
          sourceCode: "32gjh45g43g5k4jg",
          questions: [
            {
              key: 1,
              title: "Which is the World's Best man Ever in the history",
              options: [
                { option: "Muhammad P.B.U.H", opValue: "correct" },
                { option: "Anyone else", opValue: "incorrect1" },
                { option: "Someone else", opValue: "incorrect2" },
              ],
            },
            {
              key: 2,
              title: "Which is the World's Best place",
              options: [
                { option: "Meka", opValue: "correct" },
                { option: "Dubai", opValue: "incorrect1" },
                { option: "Australia", opValue: "incorrect2" },
              ],
            },
          ],
        },
      ],
    },
    {
      courseID: 2,
      courseName: "App Development",
      totalEnrollments: 3234,
      learnModule: {
        id: 1,
        moduleName: "Introduction To the HTML",
        video: "https://youtube.com/",
        description: "This is a description",
        sourceCode: "32gjh45g43g5k4jg",
        questions: [
          {
            key: 1,
            title: "Which is the World's Best man Ever in the history",
            options: [
              { option: "Muhammad P.B.U.H", opValue: "correct" },
              { option: "Anyone else", opValue: "incorrect1" },
              { option: "Someone else", opValue: "incorrect2" },
            ],
          },
          {
            key: 2,
            title: "Which is the World's Best place",
            options: [
              { option: "Meka", opValue: "correct" },
              { option: "Dubai", opValue: "incorrect1" },
              { option: "Australia", opValue: "incorrect2" },
            ],
          },
        ],
      },
    },
    {
      courseID: 3,
      courseName: "Game Development",
      totalEnrollments: 3234,
      learnModule: {
        id: 1,
        moduleName: "Introduction To the HTML",
        video: "https://youtube.com/",
        description: "This is a description",
        sourceCode: "32gjh45g43g5k4jg",
        questions: [
          {
            key: 1,
            title: "Which is the World's Best man Ever in the history",
            options: [
              { option: "Muhammad P.B.U.H", opValue: "correct" },
              { option: "Anyone else", opValue: "incorrect1" },
              { option: "Someone else", opValue: "incorrect2" },
            ],
          },
          {
            key: 2,
            title: "Which is the World's Best place",
            options: [
              { option: "Meka", opValue: "correct" },
              { option: "Dubai", opValue: "incorrect1" },
              { option: "Australia", opValue: "incorrect2" },
            ],
          },
        ],
      },
    },
    {
      courseID: 4,
      courseName: "OS Development",
      totalEnrollments: 3234,
      learnModule: {
        id: 1,
        moduleName: "Introduction To the HTML",
        video: "https://youtube.com/",
        description: "This is a description",
        sourceCode: "32gjh45g43g5k4jg",
        questions: [
          {
            key: 1,
            title: "Which is the World's Best man Ever in the history",
            options: [
              { option: "Muhammad P.B.U.H", opValue: "correct" },
              { option: "Anyone else", opValue: "incorrect1" },
              { option: "Someone else", opValue: "incorrect2" },
            ],
          },
          {
            key: 2,
            title: "Which is the World's Best place",
            options: [
              { option: "Meka", opValue: "correct" },
              { option: "Dubai", opValue: "incorrect1" },
              { option: "Australia", opValue: "incorrect2" },
            ],
          },
        ],
      },
    },
  ],
};
