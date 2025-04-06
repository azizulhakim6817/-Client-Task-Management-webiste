import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    New: [],
    Completed: [],
    Progress: [],
    Canceled: [],
  },
  reducers: {
    setNewTask: (state, action) => {
      state.New = action.payload;
    },
    setCompletedTask: (state, action) => {
      state.Completed = action.payload;
    },
    setProgressTask: (state, action) => {
      state.Progress = action.payload;
    },
    setCanceled: (state, action) => {
      state.Canceled = action.payload;
    },
  },
});
export const { setNewTask, setCompletedTask, setProgressTask, setCanceled } =
  taskSlice.actions;

export default taskSlice.reducer;
