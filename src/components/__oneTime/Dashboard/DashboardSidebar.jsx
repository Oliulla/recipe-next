"use client";

// Assuming you are using Tailwind CSS or a similar utility-first framework
import { Button, Sidebar } from "flowbite-react";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import styles from "./Dashboard.module.css";

export function DashboardSidebar() {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className={styles.sidebar}
    >
      <Sidebar.Logo
        href="/dashboard"
        as={Link}
        img="faviconImg.png"
        imgAlt="NextRecipe"
      >
        NextRecipe
      </Sidebar.Logo>
      <Sidebar.Items className="__sidebar_links">
        <Sidebar.ItemGroup className="__sidebar_link_ul">
          <Sidebar.Item
            href="/dashboard/user"
            icon={FaUserAlt}
            className="hover:bg-gray-900"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/my-recipes"
            icon={IoFastFoodSharp}
            className="my-4 hover:bg-gray-900"
          >
            Your Recipes
          </Sidebar.Item>
          <Sidebar.Item
            as={Button}
            className="text-white w-full mt-8"
            icon={HiArrowSmRight}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
