"use client";

import { useState } from "react";
import Image from "next/image";
// import Files from '../../components/Files';

export default function Home() {
  const [formEntries, setFormEntries] = useState({
    name: "",
    description: "",
  });

  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadJSON = async (JsonObjectToUpload) => {
    console.log("JsonObjectToUpload =", JsonObjectToUpload);
    try {
      const jwtRes = await fetch("/api/files", { method: "POST" });
      if (!jwtRes.ok) {
        console.error("Failed to fetch JWT");
        return;
      }

      const { JWT } = await jwtRes.json();

      console.log("user JWT =", JWT);

      const data = JSON.stringify({
        pinataContent: JsonObjectToUpload,
        pinataMetadata: {
          name: "metadata.json",
        },
      });

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
            "Content-Type": "application/json",
          },
          body: data,
        },
      );

      const resData = await res.json();
      console.log("resData =", resData);
      console.log("resData.IpfsHash =", resData.IpfsHash);
      setCid(resData.IpfsHash);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEntries({
      ...formEntries,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formEntries) {
      formData.append(key, formEntries[key]);
    }
    const eventDetails = Object.fromEntries(formData.entries());
    console.log("eventDetails =", eventDetails);

    uploadJSON(eventDetails);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-around min-h-screen py-24 space-y-12 md:flex-row md:p-24 md:space-y-0">
        <div className="flex flex-col items-center w-full md:w-1/2">
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
                value={formEntries.name}
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
                value={formEntries.description}
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
      </main>
    </>
  );
}
