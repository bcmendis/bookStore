import type { GetServerSideProps } from "next";
import { useState, ChangeEvent, FormEvent } from "react";
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
      const numValue = Math.abs(Number(value));
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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateBook(updateBookData));
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
          value={updateBookData.name}
          onChange={handleChange}
          required
          className="text-red-500 p-2 rounded-sm sm:rounded-lg font-semibold"
        />
        <label htmlFor="price">Price ($):</label>
        <input
          type="number"
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
          maxLength={10}
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
      <div className="flex flex-col lg:flex-row justify-between items-center w-full md:w-[60%] px-5 gap-3">
        <button
          type="submit"
          className="w-full lg:max-w-[200px] bg-black p-4 rounded-full hover:text-orange-300"
        >
          Update Book
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: context.query,
  };
};
