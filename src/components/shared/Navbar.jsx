"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();


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
          className="text-white text-[1rem]"
          as={Link}
          href="/"
          active={pathname === "/" || pathname === "/home"}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem]"
          as={Link}
          href="/all-recipes"
          active={pathname === "/all-recipes"}
        >
          Recipes
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem]"
          as={Link}
          href="/add-recipes"
          active={pathname === "/add-recipes"}
        >
          Add Recipes
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem]"
          as={Link}
          href="/about"
          active={pathname === "/about"}
        >
          About
        </Navbar.Link>
        <Navbar.Link
          className="text-white text-[1rem]"
          as={Link}
          href="/blogs"
          active={pathname === "/blogs"}
        >
          Blogs
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
