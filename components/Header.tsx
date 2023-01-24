import Image from "next/image";
import Link from "next/link";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src={"https://rb.gy/vsvv2o"}
              fill
              style={{ objectFit: "contain" }}
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5 ">
        <BiSearch className="headerIcon" />
        <Link href={"/checkout"}>
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <BiShoppingBag className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <FaUserCircle className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
}

export default Header;
