"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "@/components/logo/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import {
  faGaugeHigh,
  faPenToSquare,
  faUserPlus,
  faBullhorn,
  faArrowTrendUp,
  faReceipt,
  faBell,
  faGear,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import imageUser from "@/public/assets/images/user.jpg"
import Cookies from "js-cookie";
import { AuthContext } from "@/app/context/Authcontext";
import axiosInstance from "@/utils/axiosInstance";
import { signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

const DSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const[show,setshow] = useState(false);
  const {user,isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async() => {
    if (isClient) {
      setIsLoggedIn(false);
      setshow(false);
      Cookies.remove("authToken");
      Cookies.remove("microsoft_access_token");
      Cookies.remove("gmail_access_token");
      Cookies.remove("user_token");
      await signOut()
      
      localStorage.clear();
     router.push("/");
    }
  };

  if (!isClient) {
    return null;
  }

 


  const navLinks = [
    { name: "Tableau de bord", href: "/dashboard", icon: faGaugeHigh },
    // { name: "Onboarding", href: "/dashboard/onboarding", icon: faPenToSquare },
    
    { name: "Campagnes", href: "/dashboard/campaigns", icon: faBullhorn },

    {
      name: "Abonnements",
      href: "/dashboard/subscriptions",
      icon: faUserPlus,
    },
    {
      name: "Paramètres",
      href: "/dashboard/settings",
      icon: faGear,
      customClass: "mt-auto",
    }
 
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
         {show && (
        <div className="dropdown-logout bg-white border-top p-3">
          <div
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "black" }}
          >
           <FontAwesomeIcon icon={faArrowRightFromBracket} /> se déconnecter
          </div>
        </div>
      )}
      <div className="d-sidebar-footer mt-auto border-top border-gray">
        <div onClick={()=>setshow(!show)} className="profile d-flex align-items-center w-100 p-3  " style={{cursor:'pointer'}}>
         
          <img alt="User" width="40" className="rounded-circle me-3 " src={imageUser.src} />
          <span className="text-truncate">{user}</span>
        </div>
      </div>
    </div>
  );
};

export default DSidebar;
