import { GetServerSideProps, NextPage } from "next";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import { Book, selectLibrary, createLibrary } from "../store/bookSlice";
import BookSmall from "@/components/UI/BookSmall";
import { DUMMY_DATA } from "@/lib/DUMMY_DATA";
import { wrapper } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const books = useSelector(selectLibrary);

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:justify-center grow w-full sm:items-start gap-2 sm:gap-4 py-0 sm:py-1 transition-all ease-in-out flex-wrap">
        {books?.map((book: Book) => (
          <BookSmall key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    store.dispatch(createLibrary({ library: DUMMY_DATA }));
    return { props: {} };
  });

export default Home;
