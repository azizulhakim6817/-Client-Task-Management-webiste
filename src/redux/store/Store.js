import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../state-slice/SittingsSlice";
import taskReducer from "../state-slice/taskSlice";
import summaryReducer from "../state-slice/SummarySlice";
import ProfileReducer from "../state-slice/ProfileSlice";

export default configureStore({
  reducer: {
    settings: settingReducer,
    task: taskReducer,
    summary: summaryReducer,
    profile: ProfileReducer,
  },
});
