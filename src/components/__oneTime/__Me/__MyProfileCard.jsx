"use client";

import { Card } from "flowbite-react";
import ProfileUpdateModal from "./__ProfileUpdateModal";

export default function MyProfileCardComponent({ user }) {

  return (
    <Card className="w-full h-full">
      <div className="flex flex-col items-center pb-10">
        <img
          alt={user?.name}
          src={user?.image}
          className="mb-3 rounded-full shadow-lg h-24 w-24"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </span>
        <div className="mt-4">
          <p className="text-2xl text-red-500 mt-8 mb-6">Danger Zone</p>
          {/* <button className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            Update Profile
          </button> */}
          <ProfileUpdateModal />
        </div>
      </div>
    </Card>
  );
}
