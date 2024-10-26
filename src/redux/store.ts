import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

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

export const persistedReducerPizza = persistReducer(persistConfigPizza, pizza);
export const persistedReducerCart = persistReducer(persistConfigCart, cart);
export const persistedReducerFilter = persistReducer(persistConfigFilter, filter);

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    persistedReducerPizza,
    persistedReducerCart,
    persistedReducerFilter,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
