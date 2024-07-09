"use client";

import { useState, useRef } from "react";

export default function NewEventPage() {
  const [formEntries, setFormEntries] = useState({
    name: "",
    description: "",
  });
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadJSON = async (JsonObjectToUpload) => {
    console.log("JsonObjectToUpload =", JsonObjectToUpload);

    // Get a one-time use signed JWT to use for uploading directly from the frontend
    const jwtRes = await fetch("/api/files", { method: "POST" });
    const jwtData = await jwtRes.json();
    const JWT = jwtData.JWT;

    console.log("user JWT =", JWT);
    console.log("type of user JWT =", typeof JWT);

    try {
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
      setCid(resData.IpfsHash); // Set the CID in the state
    } catch (error) {
      console.log(error);
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
      <main className="flex flex-col items-center justify-center w-full min-h-screen m-auto">
        <div className="flex flex-col items-center justify-center w-full h-full m-auto bg-center bg-cover bg-heroImage">
          <div className="h-full max-w-screen-xl">
            <div className="flex items-center justify-center w-full h-full gap-8 m-auto">
              <div className="flex flex-col w-1/2 gap-6">
                <h1>Pinata + Next.js</h1>

                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-4"
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
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {cid && (
                  <div className="mt-4">
                    <h2 className="text-lg font-medium dark:text-white">
                      Uploaded JSON CID:
                    </h2>
                    <p className="break-words">{cid}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ------------------------------------------------------------------------------------------------

// "use client";

// import { useState, useRef } from "react";

// export default function NewEventPage() {
//   const [formEntries, setFormEntries] = useState({
//     name: "",
//     description: "",
//   });
//   const [cid, setCid] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const uploadJSON = async (JsonObjectToUpload) => {
//     console.log("JsonObjectToUpload =", JsonObjectToUpload);

//     // Get a one-time use signed JWT to use for uploading directly from the frontend
//     const jwtRes = await fetch("/api/files", { method: "POST" });
//     const jwtData = await jwtRes.json();
//     const JWT = jwtData.JWT;

//     console.log("user JWT =", JWT);
//     console.log("type of user JWT =", typeof JWT);

//     try {
//       const data = JSON.stringify({
//         pinataContent: JsonObjectToUpload,
//         pinataMetadata: {
//           name: "metadata.json",
//         },
//       });
//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${JWT}`,
//             "Content-Type": "application/json",
//           },
//           body: data,
//         },
//       );
//       const resData = await res.json();
//       console.log("resData =", resData);
//       console.log("resData.IpfsHash =", resData.IpfsHash);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormEntries({
//       ...formEntries,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in formEntries) {
//       formData.append(key, formEntries[key]);
//     }
//     const eventDetails = Object.fromEntries(formData.entries());
//     console.log("eventDetails =", eventDetails);

//     uploadJSON(eventDetails);
//   };

//   return (
//     <>
//       <main className="flex flex-col items-center justify-center w-full min-h-screen m-auto">
//         <div className="flex flex-col items-center justify-center w-full h-full m-auto bg-center bg-cover bg-heroImage">
//           <div className="h-full max-w-screen-xl">
//             <div className="flex items-center justify-center w-full h-full gap-8 m-auto">
//               <div className="flex flex-col w-1/2 gap-6">
//                 <h1>Pinata + Next.js</h1>

//                 <div>
//                   <form
//                     onSubmit={handleSubmit}
//                     className="flex flex-col items-center space-y-4"
//                   >
//                     <div className="flex flex-col space-y-2">
//                       <label
//                         htmlFor="name"
//                         className="text-lg font-medium dark:text-white"
//                       >
//                         Name:
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formEntries.name || ""}
//                         onChange={handleChange}
//                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                         required
//                       />
//                     </div>

//                     <div className="flex flex-col space-y-2">
//                       <label
//                         htmlFor="description"
//                         className="text-lg font-medium dark:text-white"
//                       >
//                         Description:
//                       </label>
//                       <textarea
//                         name="description"
//                         value={formEntries.description || ""}
//                         onChange={handleChange}
//                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------

// "use client";

// import { useAccount, useConnect } from "@starknet-react/core";
// import { useState } from "react";
// // import ConnectModal from "./ConnectModal"; // Adjust the import path if needed
// import ConnectModal from "../components/ui_components/ConnectModal";

// const NewEventPage = () => {
//   const { address } = useAccount();
//   const { connect, connectors } = useConnect();
//   const [openConnectModal, setOpenConnectModal] = useState(false);

//   const [formEntries, setFormEntries] = useState({
//     name: "",
//     description: "",
//   });
//   const [cid, setCid] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const uploadJSON = async (JsonObjectToUpload: object) => {
//     console.log("JsonObjectToUpload =", JsonObjectToUpload);
//     console.log("type of JsonObjectToUpload =", typeof JsonObjectToUpload);

//     // Get a one-time use signed JWT to use for uploading directly from the frontend
//     const jwtRes = await fetch("/api/files", { method: "POST" });
//     const JWT = await jwtRes.text();

//     console.log("user JWT =", JWT);
//     console.log("typeof user JWT =", typeof JWT);

//     try {
//       const data = JSON.stringify({
//         pinataContent: JsonObjectToUpload,
//         pinataMetadata: {
//           name: "metadata.json", //TODO: update name to the event_id
//         },
//       });
//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${JWT}`,
//             "Content-Type": "application/json",
//           },
//           body: data,
//         },
//       );
//       const resData = await res.json();
//       console.log("resData =", resData);
//       console.log("resData.IpfsHash =", resData.IpfsHash);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormEntries({
//       ...formEntries,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in formEntries) {
//       formData.append(key, formEntries[key]);
//     }
//     const eventDetails = Object.fromEntries(formData.entries());
//     // console.log("eventDetails =", eventDetails);

//     uploadJSON(eventDetails);
//   };

//   // const loadRecent = async () => {
//   //   try {
//   //     const res = await fetch("/api/files");
//   //     const json = await res.json();
//   //     setCid(json.ipfs_pin_hash);
//   //   } catch (e) {
//   //     console.log(e);
//   //     alert("Trouble with fetching recent uploads");
//   //   }
//   // };

//   const toggleModal = () => {
//     setOpenConnectModal((prev) => !prev);
//   };

//   return (
//     <div className="flex flex-col items-center justify-around min-h-screen py-24 space-y-12 md:space-y-0 md:p-24">
//       {address ? (
//         <div className="flex flex-col items-center w-full">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg dark:bg-gray-800"
//           >
//             <div className="flex flex-col space-y-2">
//               <label
//                 htmlFor="name"
//                 className="text-lg font-medium dark:text-white"
//               >
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formEntries.name || ""}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                 required
//               />
//             </div>

//             <div className="flex flex-col space-y-2">
//               <label
//                 htmlFor="description"
//                 className="text-lg font-medium dark:text-white"
//               >
//                 Description:
//               </label>
//               <textarea
//                 name="description"
//                 value={formEntries.description || ""}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             <button
//               type="submit"
//               className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Submit
//             </button>
//           </form>
//           {/* {cid && <Files cid={cid} />} */}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center space-y-6">
//           <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
//             Please connect your StarkNet wallet to create an event.
//           </p>
//           <button
//             onClick={toggleModal}
//             className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Connect Wallet
//           </button>
//         </div>
//       )}

//       <ConnectModal isOpen={openConnectModal} onClose={toggleModal} />
//     </div>
//   );
// };

// export default NewEventPage;
