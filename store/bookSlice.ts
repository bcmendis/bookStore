import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  library: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    createLibrary: (state, action: PayloadAction<Library>) => {
      state.library = action.payload.library;
    },

    addBook: (state, action: PayloadAction<Book>) => {
      let lastIndex = 0;
      let lastId = 0;
      if (state.library.length !== 0) {
        lastIndex = state.library.length - 1;
        lastId = Number(state.library[lastIndex].id);
      }
      const newId = (lastId + 1).toString();
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

export const { addBook, deleteBook, updateBook, createLibrary } = bookSlice.actions;
export const selectLibrary = (state: AppState) => state.books.library;
export default bookSlice.reducer;
