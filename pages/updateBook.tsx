import { useState, ChangeEvent, FormEvent } from "react";
import type { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { updateBook } from "@/store/bookSlice";
import { Book } from "@/store/bookSlice";

const AddBookPage = (props: Book) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [updateBookData, setUpdateBookData] = useState<Book>({
    id: props.id,
    name: props.name,
    price: Number(props.price),
    category: props.category,
    description: props.description,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "price") {
      const numValue = Number(value);
      setUpdateBookData((prevState) => ({
        ...prevState,
        [name]: numValue,
      }));
    } else {
      setUpdateBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateBook(updateBookData));
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
          value={updateBookData.name}
          onChange={handleChange}
          required
          className="text-red-500 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="price">Price ($):</label>
        <input
          type="number"
          step=".01"
          id="price"
          name="price"
          value={updateBookData.price}
          onChange={handleChange}
          className="text-red-500 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={updateBookData.category}
          onChange={handleChange}
          required
          className="text-red-500 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          value={updateBookData.description}
          onChange={handleChange}
          required
          className="text-red-500 p-2 rounded-sm sm:rounded-lg font-semibold"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-black p-4 rounded-full hover:text-orange-300"
      >
        Update Book
      </button>
    </form>
  );
};

export default AddBookPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: context.query,
  };
};
