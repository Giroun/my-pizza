import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortType, categoryId, searchValue, currentPage } = params;
  const { data } = await axios.get(
    `http://localhost:3001/pizza?${categoryId > 0 ? `category=${categoryId}` : ''}${
      searchValue ? `&title=${searchValue}` : ''
    }&_sort=${sortType}&_page=${currentPage}&_per_page=4`,
  );
  return data.data;
});
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    loading: false,
    items: [],
    errorStatus: false,
    error: '',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.items = [];
        state.errorStatus = false;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.errorStatus = false;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.errorStatus = true;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const pizzaDataSelector = (state) => state.pizza;

// export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
