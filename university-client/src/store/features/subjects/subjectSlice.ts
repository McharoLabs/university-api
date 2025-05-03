/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SubjectListResponse } from "../../../types/subjectType";
import { axiosClient } from "../../../client/axiosClient";
import { SUBJECT_ENDPOINTS } from "../../../client/endpoints";

interface SubjectState {
  loading: boolean;
  subjectList: SubjectListResponse | null;
  error: string | null;
}

const initialState: SubjectState = {
  loading: false,
  subjectList: null,
  error: null,
};

export const fetchSubjects = createAsyncThunk<
  SubjectListResponse,
  void,
  { rejectValue: any }
>("subjects/fetchSubjects", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(
      SUBJECT_ENDPOINTS.fetchSubjects.build()
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

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    clearSubjects(state) {
      state.subjectList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubjects.fulfilled,
        (state, action: PayloadAction<SubjectListResponse>) => {
          state.loading = false;
          state.subjectList = action.payload;
        }
      )
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.subjectList = null;
        state.error = action.payload || "Failed to fetch subjects";
      });
  },
});

export const { clearSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
