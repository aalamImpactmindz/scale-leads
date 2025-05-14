import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const DHeader = ({ onToggle }) => {
  return (
    <header className="px-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
      <div className="sidebar-toggler" onClick={onToggle}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="d-header-icons color-light">
        <Link
          href="/"
          className="ms-3 d-inline-flex align-items-center justify-content-center rounded-circle border border-light"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
        <Link
          href="/"
          className="ms-3 d-inline-flex align-items-center justify-content-center rounded-circle border border-light"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </header>
  );
};

export default DHeader;
