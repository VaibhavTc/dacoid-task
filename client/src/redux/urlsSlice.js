// src/redux/urlsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set auth token for all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all URLs
export const fetchUrls = createAsyncThunk(
  "urls/fetchUrls",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/urls`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUrl = createAsyncThunk(
  "urls/createUrl",
  async (urlData, { rejectWithValue }) => {
    console.log("urlData");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/urls`,
        urlData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  urls: [],
  loading: false,
  error: null,
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch URLs";
      })
      .addCase(createUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = [action.payload, ...state.urls];
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create URL";
      });
  },
});

export default urlsSlice.reducer;
