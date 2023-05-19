import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addBook } from "@/store/bookSlice";
import { Book } from "@/store/bookSlice";

const AddBookPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [bookData, setBookData] = useState<Book>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "price") {
      const numValue = Number(value);
      setBookData((prevState) => ({
        ...prevState,
        [name]: numValue,
      }));
    } else {
      setBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBook(bookData));
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 justify-center items-center w-full sm:w-[80%] bg-slate-500 p-4 sm:p-10 rounded-lg text-sm sm:text-xl shadow-lg"
    >
      <div className="grid grid-cols-1 w-full gap-y-2 sm:grid-cols-[20%_80%] items-center p-5">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={bookData.name}
          onChange={handleChange}
          required
          className="text-slate-700 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="price">Price ($):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={bookData.price}
          onChange={handleChange}
          required
          className="text-slate-700 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={bookData.category}
          onChange={handleChange}
          required
          className="text-slate-700 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          value={bookData.description}
          onChange={handleChange}
          required
          className="text-slate-700 p-2 rounded-sm sm:rounded-lg font-semibold"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-black p-4 rounded-full hover:text-orange-300"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookPage;
