import { createSlice } from "@reduxjs/toolkit";

interface SiteConfig {
  loading: boolean;
  darkMode: boolean;
}

const initialState: SiteConfig = {
  loading: false,
  darkMode: false,
};

const siteConfigSlice = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.loading = true;
    },
    hideSpinner: (state) => {
      state.loading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = siteConfigSlice.actions;

export const siteConfigReducer = siteConfigSlice.reducer;
