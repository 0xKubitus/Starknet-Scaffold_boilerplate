"use client";

import { useState } from "react";

const NewEventPage = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Hello, ${name}!`);

    let eventData = {
      event_name: name,
    };

    alert(`name = ${eventData.event_name}!`);
    console.log("EventData =", eventData);

    // // save `eventData` in: `./data/newEventData.json'
    // // Creating or modifying files directly within a user's local file system from a web application without any backend server is restricted due to web browser security policies.
    // // Browsers are designed to prevent web pages from accessing or altering files on a user's local file system to avoid potential security risks.

    //TODO: post the JSON Object to IPFS using Pinata
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around py-24 md:p-24">
      <h1>NewEventPage</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="text-lg font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 dark:text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewEventPage;
