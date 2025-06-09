import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import testResultSlice from "./testResultSlice";
import educationSlice from "./educationSlice";
import iqTestSlice from "./iqTestSlice";
import userRoleSlice from "./userRoleSlice";
import resultSlice from "./resultSlice";
import roadmapReducer from "./roadmapSlice"; 


const store = configureStore({
  reducer: {
    auth: authReducer,
    testResult: testResultSlice,
    education: educationSlice,
    iqTest: iqTestSlice,
    userRole: userRoleSlice,
    result: resultSlice,
        roadmap: roadmapReducer,

  },
});

export default store;
