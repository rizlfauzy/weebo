import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "animes",
  initialState: {
    list: [],
    selected: {}
  },
  reducers: {
    create_list: (state, action) => {
      try {
        state.list = action.payload;
      } catch (e) {
        console.log(e.message);
      }
    },
    selected_anime: (state, action) => {
      try {
        state.selected = action.payload;
      } catch (e) {
        console.log(e.message);
      }
    }
  }
})

const store = configureStore({
  reducer: {
    animes: slice.reducer
  }
})

export const { create_list, selected_anime } = slice.actions;
export default store;