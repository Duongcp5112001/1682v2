import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import rootReducer from "./reducer/rootReducer";
import rootSaga from "~/saga";

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export const { dispatch } = store;

export const useDispatch = () => useAppDispatch<typeof store.dispatch | any>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;

import Counteractions from "./reducer/counterReducer";
import { RootState } from "~/types/reduxs";

export { Counteractions };
