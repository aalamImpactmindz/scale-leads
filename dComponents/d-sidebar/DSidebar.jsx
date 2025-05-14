"use client";
import React from "react";
import Logo from "@/components/logo/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faPenToSquare,
  faUserPlus,
  faBullhorn,
  faArrowTrendUp,
  faReceipt,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import imageUser from "@/public/assets/images/user.jpg"

const DSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: faGaugeHigh },
    { name: "Onboarding", href: "/dashboard/onboarding", icon: faPenToSquare },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: faUserPlus,
    },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: faBullhorn },
    { name: "Leads", href: "/dashboard/leads", icon: faArrowTrendUp },
    { name: "Invoices", href: "/dashboard/invoices", icon: faReceipt },
    { name: "Notifications", href: "/dashboard/notifications", icon: faBell },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: faGear,
      customClass: "mt-auto",
    },
  ];

  return (
    <div className="d-sidebar position-fixed top-0 bottom-0 start-0 d-flex flex-column small">
      <div className="d-sidebar-header p-3 pb-0">
        <Logo />
      </div>
      <div className="d-sidebar-nav p-2 flex-grow-1 overflow-auto">
        <Nav className="flex-column">
          {navLinks.map(({ name, href, icon, customClass }) => (
            <Nav.Link
              key={name}
              as={Link}
              href={href}
              active={pathname === href}
              className={`rounded-2 ${customClass ? customClass : ""}`}
            >
              <FontAwesomeIcon icon={icon} className="me-3" />
              {name}
            </Nav.Link>
          ))}
        </Nav>
      </div>
      <div className="d-sidebar-footer mt-auto border-top border-gray">
        <div className="profile d-flex align-items-center w-100 p-3">
          <img alt="User" width="40" className="rounded-circle me-3" src={imageUser.src} />
          <span className="text-truncate">Olivia Williams</span>
        </div>
      </div>
    </div>
  );
};

export default DSidebar;
