import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, Sort } from './types';

export enum SortPropertyEnum {
  RATING_P = 'rating',
  RATING_M = '-rating',
  PRICE_P = 'price',
  PRICE_M = '-price',
  TITLE_P = '-title',
  TITLE_M = 'title',
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_P },
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_P,
        };
      }
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } =
  filter.actions;

export default filter.reducer;
