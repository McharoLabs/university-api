import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/students/studentsSlice";
import subjectReducer from "./features/subjects/subjectSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    subject: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
