import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getType();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload;
    });
  }
});

export default typeSlice.reducer;