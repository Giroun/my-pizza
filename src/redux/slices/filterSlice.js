import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelector = (state) => state.filter;
export const sortSelector = (state) => state.filter.sort;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filter.actions;

export default filter.reducer;
