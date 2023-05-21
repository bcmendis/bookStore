import { NextPage } from "next";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addBook } from "@/store/bookSlice";
import { Book } from "@/store/bookSlice";

const AddBookPage: NextPage = () => {
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
      const numValue = Math.abs(Number(value));
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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBook(bookData));
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-y-2 justify-center items-center w-full lg:w-[90%] max-w-[1000px] bg-slate-500 p-4 sm:p-10 rounded-lg text-sm sm:text-lg lg:text-xl shadow-lg"
    >
      <div className="grid grid-cols-1 w-full gap-y-2 lg:grid-cols-[20%_80%] items-center p-5">
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
          maxLength={10}
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
      <div className="flex flex-col lg:flex-row justify-between items-center w-full md:w-[60%] px-5 gap-3">
        <button
          type="submit"
          className="w-full lg:max-w-[200px] bg-black p-4 rounded-full hover:text-orange-300"
        >
          Add Book
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full lg:max-w-[200px] bg-black p-4 rounded-full hover:text-orange-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddBookPage;
