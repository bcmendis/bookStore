import {
  combineReducers,
  ThunkAction,
  configureStore,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { Action } from "@reduxjs/toolkit";
import bookReducer, { Library } from "./bookSlice";
import { DUMMY_DATA } from "@/lib/DUMMY_DATA";

const combinedReducer = combineReducers({
  books: bookReducer,
});

const masterReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
      // books: [...state.books.library, action.payload.books.library],
      // books: [action.payload.books.library, ...state.books.library],
    };
    // console.log(action.payload);
    return nextState;
  } else return combinedReducer(state, action);
};

const store = () =>
  configureStore({
    reducer: masterReducer,
  });

// export default store;

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store, { debug: true });
