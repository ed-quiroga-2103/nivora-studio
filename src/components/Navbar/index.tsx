import { label } from "framer-motion/client";
import Link from "next/link";
import React from "react";

// const routes = [
//   // {
//   //   label: "Services",
//   //   path: "/services",
//   // },
//   // {
//   //   label: "Portfolio",
//   //   path: "/portfolio",
//   // },
//   // {
//   //   label: "About",
//   //   path: "/about",
//   // },
//   // {
//   //   label: "Contact",
//   //   path: "/contact",
//   // },
// ];

export default function index() {
  return (
    <div className="navbar">
      <div className="logo">
        <Link className="link" href="/">
          Nivora/
        </Link>
      </div>
      <div className="links">
        {/* {routes.map((route) => (
          <Link className="link" key={route.path} href={route.path}>
            {route.label}
          </Link>
        ))} */}
      </div>
    </div>
  );
}
