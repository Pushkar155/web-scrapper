import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUrlData } from "./urlApi";
import type { UrlSearchDataTypes, UrlState } from "./urlTypes";
import toast from "react-hot-toast";

const initialState: UrlState = {
  urlData: [],
  loading: false,
  fetchLoading: false,
  error: null,
};

export const getUrlDataAsync = createAsyncThunk(
  "url/getUrlData",
  async (
    {
      newUrlDataValues,
    }: {
      newUrlDataValues: UrlSearchDataTypes;
    },
    thunkAPI
  ) => {
    try {
      return await getUrlData(newUrlDataValues);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed To Get Url Data"
      );
    }
  }
);

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUrlDataAsync.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getUrlDataAsync.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.urlData = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(getUrlDataAsync.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = (action.payload as string) || "Failed To Get Url Data";
        toast.error(state.error);
      });
  },
});

// export const { increment, decrement } = urlSlice.actions;
export default urlSlice.reducer;
