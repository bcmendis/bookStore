import Link from "next/link";
import { Book, deleteBook } from "@/store/bookSlice";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";

export interface propsBook {
  book: Book;
}

const BookSmall = ({ book }: propsBook) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  };
  return (
    <div className="flex sm:flex-col w-full sm:w-[200px] lg:w-[300px] sm:aspect-[3/5] lg:aspect-[3/4] text-sm lg:text-lg rounded-lg bg-slate-500 hover:scale-105 shadow-lg overflow-hidden">
      <Link
        href={{
          pathname: "/updateBook",
          query: {
            id: book.id,
            name: book.name,
            price: book.price,
            category: book.category,
            description: book.description,
          },
        }}
        className="flex flex-col w-full grow sm:justify-between p-3"
      >
        <div className="flex w-full justify-center text-center text-sm sm:text-base lg:text-xl font-semibold">
          <span>{book.name}</span>
        </div>
        <div className="flex flex-col w-full h-[40%]">
          <div className="flex w-full justify-between items-center p-2 sm:p-1">
            <span className="font-semibold text-orange-300">
              ${book.price.toFixed(2)}
            </span>
            <span className="rounded-full bg-slate-700 py-1 px-2">
              {book.category}
            </span>
          </div>
          <p className="grow">
            {book.description.length > 60
              ? book.description.substring(0, 60) + "..."
              : book.description}
          </p>
        </div>
      </Link>
      <div className="flex justify-center items-center w-1/3 sm:w-full bg-black p-1">
        <TiDelete
          size="40"
          onClick={() => handleDelete(book.id)}
          className=" hover:text-red-500 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BookSmall;
