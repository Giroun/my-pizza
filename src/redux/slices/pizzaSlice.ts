import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzaArgs = {
  sortType: string;
  categoryId: number;
  searchValue: string;
  currentPage: string;
};

type PizzaItems = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  type: number[];
  rating: number;
};

export interface PizzaSliceState {
  loading: boolean;
  items: PizzaItems[];
  errorStatus: boolean;
  error: string;
}
export const fetchPizzas = createAsyncThunk<PizzaItems[], FetchPizzaArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortType, categoryId, searchValue, currentPage } = params;
    const { data } = await axios.get(
      `http://localhost:3001/pizza?${categoryId > 0 ? `category=${categoryId}` : ''}${
        searchValue ? `&title=${searchValue}` : ''
      }&_sort=${sortType}&_page=${currentPage}&_per_page=4`,
    );
    return data.data as PizzaItems[];
  },
);

const initialState: PizzaSliceState = {
  loading: false,
  items: [],
  errorStatus: false,
  error: '',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItems[]>) {
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
        state.error = action.error.message!;
        state.items = [];
      });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
