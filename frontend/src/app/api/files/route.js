import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const keyRestrictions = {
  keyName: "Signed Upload JWT",
  maxUses: 1,
  permissions: {
    endpoints: {
      data: {
        pinList: false,
        userPinnedDataTotal: false,
      },
      pinning: {
        pinFileToIPFS: false,
        pinJSONToIPFS: true,
        pinJobs: false,
        unpin: false,
        userPinPolicy: false,
      },
    },
  },
};

export async function POST() {
  try {
    console.log("Generating one-time-use JWT...");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: JSON.stringify(keyRestrictions),
    };

    const jwtResponse = await fetch(
      "https://api.pinata.cloud/users/generateApiKey",
      options,
    );

    if (!jwtResponse.ok) {
      const errorText = await jwtResponse.text();
      console.error(
        "Failed to generate one-time-use JWT:",
        jwtResponse.status,
        jwtResponse.statusText,
        errorText,
      );
      throw new Error("Failed to generate one-time-use JWT");
    }

    const json = await jwtResponse.json();
    const { JWT } = json;

    console.log("One-time-use JWT generated successfully:", JWT);
    return NextResponse.json({ JWT });
  } catch (e) {
    console.error("Error in POST /api/files:", e);
    return new NextResponse("Server Error", { status: 500 });
  }
}
