import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';

const persistConfigPizza = {
  key: 'pizza',
  storage,
};
const persistConfigCart = {
  key: 'cart',
  storage,
};
const persistConfigFilter = {
  key: 'filter',
  storage,
};

const persistedReducerPizza = persistReducer(persistConfigPizza, pizza);
const persistedReducerCart = persistReducer(persistConfigCart, cart);
const persistedReducerFilter = persistReducer(persistConfigFilter, filter);

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    persistedReducerPizza,
    persistedReducerCart,
    persistedReducerFilter,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
