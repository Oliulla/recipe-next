"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function RecipeDeleteModal({ recipeName, id, setIsUpdated }) {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipe/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);

      if (data?.success) {
        setOpenModal(false);
        alert(data?.message);
        setIsUpdated(true);
        return;
      }
    } catch (error) {
      if (error) {
        alert(data?.message);
        return;
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-red-800 rounded px-3 py-2 text-white"
      >
        Delete
      </button>
      {/* <Button onClick={() => setOpenModal(true)}>Update Profile</Button> */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure to delete recipe:{" "}
              <span className="text-violet-900 font-semibold">
                {recipeName}
              </span>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteRecipe}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
