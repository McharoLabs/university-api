/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { StudentListResponse } from "../../../types/studentType";
import { STUDENT_ENDPOINTS } from "../../../client/endpoints";
import { AxiosError } from "axios";
import { axiosClient } from "../../../client/axiosClient";

interface StudentState {
  loading: boolean;
  detail: any | null;
  studentList: StudentListResponse | null;
}

const initialState: StudentState = {
  loading: false,
  detail: null,
  studentList: null,
};

export const fetchStudents = createAsyncThunk<
  StudentListResponse,
  void,
  { rejectValue: any }
>("students/fetchStudents", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(
      STUDENT_ENDPOINTS.fetchStudents.build()
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    } else {
      return rejectWithValue(error);
    }
  }
});

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setDetail(state, action: PayloadAction<any>) {
      state.detail = action.payload;
    },
    clearDetail(state) {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.studentList = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.studentList = null;
        console.error("Fetch students failed", action.payload);
      });
  },
});

export const { setDetail, clearDetail } = studentSlice.actions;
export default studentSlice.reducer;
