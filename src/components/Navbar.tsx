import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navlinks from "./Navlinks";
import NavBadge from "./NavBadge";

const Navbar = () => {
  const Links = <Navlinks />;

  return (
    <div className="sticky top-0 z-50 border-b border-[#252836] bg-[#0c0d10]">
      <div className="container mx-auto  ">
        <div className="navbar  shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  aria-label="Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {Links}
              </ul>
            </div>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/assets/logo.png"
                width={30}
                height={30}
                alt="FITLOG Logo"
              />

              <h2 className="text-xl font-bold">FITLOG</h2>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>
          <div className="navbar-end ">
            <NavBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
