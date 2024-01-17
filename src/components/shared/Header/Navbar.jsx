"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
// import { useRouter } from "next/router";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HeaderNav({ user }) {
  const [currentLoginUser, setCurrentLoginUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const pushToLoginPageHandler = async () => {
    router.push("/login");
  };

  const handleRedirectToDashboar = async () => {
    if (!user?.email || !user?.name) {
      return;
    }
    router.push("/dashboard");
  };

  // console.log(user);

  useEffect(() => {
    async function getUser() {
      const res = await fetch(
        `http://localhost:3000/api/users?email=${user?.email}`
      );
      const data = await res.json();
      setCurrentLoginUser(data?.data);
    }

    getUser();
  }, []);

  // console.log(currentLoginUser);

  return (
    <Navbar
      fluid
      className="border-b border-gray-600 shadow-lg bg-gray-700 text-white"
    >
      <Navbar.Brand as={Link} href="/">
        <img
          src="faviconImg.png"
          className="mr-3 h-6 sm:h-9"
          alt="RecipeNext Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RecipeNext
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          className="text-white text-[1rem] mt-2"
          as={Link}
          href="/"
          active={pathname === "/" || pathname === "/home"}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem] mt-2"
          as={Link}
          href="/all-recipes"
          active={pathname === "/all-recipes"}
        >
          Recipes
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem] mt-2"
          as={Link}
          href="/add-recipes"
          active={pathname === "/add-recipes"}
        >
          Add Recipes
        </Navbar.Link>
        {/* <Navbar.Link
          className="text-white text-[1rem] mt-2"
          as={Link}
          href="/login"
          active={pathname === "/login"}
        >
          Login
        </Navbar.Link> */}
        {!user?.email ||
        !user?.name ||
        !currentLoginUser?.email ||
        !currentLoginUser?.userName ? (
          <button
            type="button"
            onClick={pushToLoginPageHandler}
            className="bg-cyan-500 px-3 rounded"
          >
            Login
          </button>
        ) : (
          <div
            onClick={handleRedirectToDashboar}
            className={`flex items-center gap-x-2 mt-2 ml-2 cursor-pointer`}
          >
            {/* <button onClick={() => signOut()}>Sign out</button> */}
            <button className="flex lg:hidden">Profile</button>
            <img
              src={user?.image}
              className="h-10 w-10 rounded-full border-gray-800"
            />
          </div>
        )}

        {/* <Navbar.Link
          className="text-white text-[1rem]"
          as={Link}
          href="/blogs"
          active={pathname === "/blogs"}
        >
          Blogs
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
