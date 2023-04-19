import { apiGet } from '../function/apiGET';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getLabels = createAsyncThunk('labels/getLabels', async () => {
    const response = await apiGet('http://localhost:5000/api/labels');
    return response;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        apiData: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getLabels.pending, (state) => {
          state.apiData = 'loading';
        })
        .addCase(getLabels.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.apiData = action.payload;
        })
        .addCase(getLabels.rejected, (state, action) => {
          state.status = 'failed';
          state.apiData = null;
        });
    },
  });;

export default dataSlice.reducer;
