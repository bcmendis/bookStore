import {
  combineReducers,
  ThunkAction,
  configureStore,
  AnyAction,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { Action } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

const combinedReducer = combineReducers({
  books: bookReducer,
});

// See below for a better solution

const masterReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {

    // If the Client side state is already populated with items, set the state to the current Client side state

    if (state.books.library.length > 0) {
      return {
        books: state.books
      };
    } else

    // If the Client side state is not populated, then set its state to match the Server side state

      return {
        books: action.payload.books,
      };
  }

    // If it's not a HYDRATE action, handle it with the regular Redux reducers

    return combinedReducer(state, action);
};

const store = () =>
  configureStore({
    reducer: masterReducer,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store, { debug: false });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// A better way to write the masterReducer function would be to merge the Clientside and Serverside data:

// This way assumes the Server data is up to date, and any deleted books are reflected on the Serverside.
// Since the Serverside data cannot be updated in this assignment, this results in any Clientside deleted books being added back into the Client state.

// const masterReducer = (state: any, action: AnyAction) => {
//   if (action.type === HYDRATE) {
//     const mergedLibrary = [
//       ...state.books.library,
//       ...action.payload.books.library.filter(
//         (serverBook: Book) =>
//           !state.books.library.some(
//             (clientBook: Book) => clientBook.id === serverBook.id
//           )
//       ),
//     ];

//     return {
//       ...state,
//       books: {
//         ...state.books,
//         library: mergedLibrary,
//       },
//     };
//   }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////