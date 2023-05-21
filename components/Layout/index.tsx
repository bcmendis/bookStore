import { ReactNode, FC } from "react";
import Image from "next/image";
import Navigation from "./Navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface MyProps {
  children?: ReactNode;
}

const Layout: FC<MyProps> = (props) => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center bg-slate-700">
      <Navigation />
      <Image
        src="/images/bookshelf.jpg"
        width={1000}
        height={1000}
        alt="Book Shelf"
        className="w-screen top-0 h-[8rem] sm:h-[15rem] object-cover overflow-hidden"
      />
      <div
        className={`flex flex-col w-[90%] items-center sm:w-[80%] py-5 sm:py-10 ${inter.className}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
