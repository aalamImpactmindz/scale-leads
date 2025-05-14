import React from "react";
import logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="navbar-brand me-0">
      <Link href="/" className="d-flex align-items-center lh-1">
        <Image src={logo} alt="App Logo" width={50} height={50} priority />
        <span className="fs-4 fw-semibold color-light">ScaleLeads</span>
      </Link>
    </div>
  );
};

export default Logo;
