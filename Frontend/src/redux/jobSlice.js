import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    adminJobs: [],
    allJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
  },
});

export const { setAllJobs, setAllAdminJobs } = jobSlice.actions;
export default jobSlice.reducer;
