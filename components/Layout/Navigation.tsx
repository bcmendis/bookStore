import { BiBookAdd } from "react-icons/bi";
import Link from "next/link";

const Navigation = () => {
  return (
    <div
      className="flex flex-row items-center justify-between 
    w-full h-20 
    m-0 
    shadow-lg bg-slate-800 z-50"
    >
      <Link href="/">
        <h1 className="text-2xl md:text-3xl p-2 ml-5"><span className="font-semibold text-orange-400">Blaze</span>books</h1>
      </Link>
      <Link href="/addBook" className="p-2 mr-2 hover:text-orange-400">
        <BiBookAdd size="40" />
      </Link>
    </div>
  );
};

export default Navigation;
