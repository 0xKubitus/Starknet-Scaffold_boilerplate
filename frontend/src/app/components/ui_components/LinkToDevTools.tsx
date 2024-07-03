"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkToDevTools = () => {
  const pathname = usePathname();

  return (
    pathname != "/dev_tools" && (
      <div className="flex justify-center">
        <Link href="/dev_tools">Link to: "DEV TOOLS" page</Link>
      </div>
    )
  );
};

export default LinkToDevTools;
