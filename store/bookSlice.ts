import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DUMMY_DATA } from "@/lib/DUMMY_DATA";
import { AppState } from "./store";

export interface Book {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface Library {
  library: Book[];
}

const initialState: Library = {
  library: DUMMY_DATA,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      const newId = (state.library.length + 1).toString();
      const newBook = { ...action.payload, id: newId };
      state.library.push(newBook);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.library = state.library.filter(
        (book) => book.id !== action.payload
      );
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const { id } = action.payload;
      const bookIndex = state.library.findIndex((book) => book.id === id);
      if (bookIndex !== -1) {
        state.library[bookIndex] = {
          ...state.library[bookIndex],
          ...action.payload,
        };
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
export const selectLibrary = (state: AppState) => state.books.library;
export default bookSlice.reducer;
