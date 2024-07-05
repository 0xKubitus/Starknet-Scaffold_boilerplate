"use client";

import { useAccount, useConnect } from "@starknet-react/core";
import { useState } from "react";
// import ConnectModal from "./ConnectModal"; // Adjust the import path if needed
import ConnectModal from "../components/ui_components/ConnectModal";

const NewEventPage = ({ handleSubmit, handleChange, formEntries = {} }) => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [openConnectModal, setOpenConnectModal] = useState(false);

  const toggleModal = () => {
    setOpenConnectModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-around min-h-screen py-24 space-y-12 md:space-y-0 md:p-24">
      {address ? (
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg dark:bg-gray-800"
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="text-lg font-medium dark:text-white"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formEntries.name || ""}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="description"
                className="text-lg font-medium dark:text-white"
              >
                Description:
              </label>
              <textarea
                name="description"
                value={formEntries.description || ""}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Please connect your StarkNet wallet to create an event.
          </p>
          <button
            onClick={toggleModal}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Connect Wallet
          </button>
        </div>
      )}

      <ConnectModal isOpen={openConnectModal} onClose={toggleModal} />
    </div>
  );
};

export default NewEventPage;
