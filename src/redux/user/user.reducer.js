import { userTypes } from "./user.types";
const coursesInit = {
  coursesEnrolled: [
    {
      courseName: "App Development",
      courseID: 2,
      activelyTaking: false,
      taskCompleted: [1, 3],
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
  subscribedToNewsletter: false,
  posts: [],
  rewards: [],
};
const lastYearTimeSpentFullInit = {
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
const INITIAL_STATE = {
  currentUser: {
    displayName: "",
    email: "",
    createdAt: "",
    timeSpentToday: 0,
    courses: coursesInit,
    photoURL:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/319/robot_1f916.png",
    lastYearTimeSpentFull: lastYearTimeSpentFullInit,
    blogsTraffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rewards: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
