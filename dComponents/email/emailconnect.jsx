// components/LinkedInConnect.js
"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { auth } from "@/utils/firebase/firebase";
import Image from "next/image";
import gmailicon from '../../public/assets/images/gmail.png'
import outlook from '../../public/assets/images/outlook_icon.png'
import circle from '../../public/assets/images/circle-tick.png'
import remove from '../../public/assets/images/remove.png'
import login from '../../public/assets/images/login.png'
import { GoogleAuthProvider, OAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { signOut as firebaseSignOut } from 'firebase/auth';
import Cookies from "js-cookie";
import SmtpModal from "@/modals/smtpmodal";
import axiosInstance from "@/utils/axiosInstance";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "@/app/context/Authcontext";
import { useRef } from "react";

const EmailConnect = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();


  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [isMicrosoftConnected, setIsMicrosoftConnected] = useState(false);
  const [showSmtpModal, setShowSmtpModal] = useState(false); // 🔑
  const [emaildata, setemaildata] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showsmDropdown, setShowsmDropdown] = useState(false);
  const [showmDropdown, setmShowDropdown] = useState(false);
  const [selectedid, setselectedid] = useState();
  const [selectedmid, setselectedmid] = useState();
  const [selectedsmid, setselectedsmid] = useState();
  const [outlookdata, setoutlookdata] = useState([]);
  const { smtp, setsmtp } = useContext(AuthContext);
  const [existsmtp, setexistsmtp] = useState([]);
  const[planid,setplanid] = useState(0);
  const [hasSavedOutlookToken, setHasSavedOutlookToken] = useState(false);
  const userRef = useRef(null);


  useEffect(() => {
    let check = Cookies.get("gmail_access_token");
    console.log(Cookies.get("microsoft_access_token"))
    if (!check) {
      setIsConnected(false);
    }
    let microsoft = Cookies.get("microsoft_access_token");
    if (!microsoft) {
      setIsMicrosoftConnected(false);
    }
  }, [])
useEffect(() => {
  const userEmail = searchParams.get('email');
  const expires_in = searchParams.get('expires_in');

  const saveEmailToken = async () => {
    const accessToken = Cookies.get('microsoft_access_token');
    const refreshToken = Cookies.get('microsoft_refresh_token');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    if (userEmail && accessToken && refreshToken && !hasSavedOutlookToken) {
      try {
        const response = await axiosInstance.post('/api/email-token', {
          access_token: accessToken,
          email_id: userEmail,
          provider: 'outlook',
          refresh_token: refreshToken,
          expires_in: expires_in,
          status: true,
        });

        const { data } = response;

        if (data?.status) {
          Cookies.set('mid', data?.data?.id, { path: '/' });
          Cookies.set('mexpire', expires_in, {
            expires: expiresAt,
            path: '/',
            sameSite: true,
          });

          setIsMicrosoftConnected(true);
          setHasSavedOutlookToken(true); // ✅ Prevent future calls
        }
      } catch (error) {
        console.error('❌ Failed to save Microsoft email token:', error);
      }
    }
  };

  if (userEmail && !hasSavedOutlookToken) {
    saveEmailToken();
  }
}, [searchParams, hasSavedOutlookToken]);


  useEffect(() => {


    const checkInterval = setInterval(() => {
      const isInstalled =
        !!window.__MY_EXTENSION_INSTALLED__ ||
        !!document.getElementById("my-extension-flag");

      if (isInstalled) {

        setIsExtensionInstalled(true);
        clearInterval(checkInterval);
      } else {
        setIsExtensionInstalled(false);

      }
    }, 100); // Check every 300ms

    // Stop after 3 seconds
    setTimeout(() => clearInterval(checkInterval), 300);

  }, []);

  const handlesmtplogin = async () => {
    setShowSmtpModal(true); // 🔑 Open modal

  }
  const handleCloseModal = () => {
    setShowSmtpModal(false); // 🔑 Close modal
  };

  useEffect(() => {
    if (!session) return;

    let  provider = session.provider;
provider = provider === "google" ? "gmail" : provider;


    const syncTokenToBackend = async () => {
      try {
        await axiosInstance.post("/api/email-token", {
          access_token: session.accessToken,
          provider: provider,
          email_id: session.user.email,
          refresh_token: session.refreshToken,
          expires_in: session.expiresAt,
          status: true,
        });
            setIsConnected(true);
      } catch (error) {
        if (error.response?.status === 409) {
          console.warn("Token already exists, skipping...");
        } else {
          console.error("❌ Token sync failed:", error);
        }
      }
    };
    if (provider === "google") {
  
      

      Cookies.set("gmail_refresh_token", session.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
        expires: session.expiresAt
        ,
      });
      Cookies.set("gexpire", session.expiresAt
        , {
          path: "/",
          secure: true,
          sameSite: "Strict",
          expires: session.expiresAt
          ,
        });
      Cookies.set("gmail_user", session.user.email, {
        path: "/",
        secure: true,
        sameSite: "Strict",
        expires: session.expiresAt
        ,
      });
    }
    if (!Cookies.get("gmail_access_token")) {
      syncTokenToBackend();
    }


  }, [session])

  const handlegmaillogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });

    } catch (err) {
      console.error("❌ Gmail login failed:", err);
    }
  }


const handleMicrosoftLogin=async()=>{
const scopes = [
    'openid',
    'profile',
    'offline_access',
    'email',
    'https://graph.microsoft.com/Mail.Send',
    'https://graph.microsoft.com/Mail.ReadWrite',
    'https://graph.microsoft.com/MailboxSettings.ReadWrite',
  ].join(' ');
try{
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI)}` +
    `&response_mode=query` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&prompt=consent` +  // 👈 forces the consent screen to appear
    `&state=1234`;

  window.location.href = authUrl;

}catch(err){
  console.log(err);
}
}
  const checkexistgmailaccount = async () => {
    try {
      const letdata = await axiosInstance.get('/api/email-token/gmail');
      const { data } = letdata;

      if (data?.status) {
        setemaildata(data?.data);

      }

    } catch (err) {
      console.log(err);
    }
  }

  const checkexistmicrosoft = async () => {
    try {
      const letdata = await axiosInstance.get('/api/email-token/outlook');
      const { data } = letdata;


      if (data?.status) {
        setoutlookdata(data?.data);

      }

    } catch (err) {
      console.log(err);
    }
  }

  const checkexistsmtp = async () => {
    try {
      let response = await axiosInstance.get('/api/smtps');
      const { data } = response;
      if (response?.status === 200) {
        setexistsmtp(data?.data);
      }



    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getCookies = Cookies.get("microsoft_access_token");
    if (getCookies) {
      setIsMicrosoftConnected(true);
    }
    const apppass = Cookies.get("uapppas");
    const appemail = Cookies.get("uemail");
    if (apppass && appemail) {
      setsmtp(true);
    }

    const getGmailCookies = Cookies.get("gmail_access_token");
    if (getGmailCookies) {
      setIsConnected(true);
    }
    let id = Cookies.get('selectedid');
    let mid = Cookies.get('selectedmid');
    let smid = Cookies.get('selectedsmid')
    if (id) {
      setselectedid(id);
    }
    if (smid) {
      setselectedsmid(smid);
    }
    if (mid) {
      setselectedmid(mid);
    }
    checkexistgmailaccount();
    checkexistmicrosoft();
    checkexistsmtp();
  }, [])

useEffect(()=>{
    let checkplan = localStorage.getItem('plan');
    let pid = JSON.parse(checkplan);
    if(pid){
         setplanid(pid?.id)
    }
},[])

const getemaillimit = (pid)=>{
switch(pid){
    case 1:
      return 1
    case 2:
      return 3
    case 3:
      return 5
    case 4:
      return 1
    case 5:
      return 3
    case 6:
      return 5
  }
  }

let emaillimit = getemaillimit(planid);


  const handleexistinggmail = async (item) => {

    try {
      let response = await axiosInstance.post('/api/email-token/refresh', { email_id: item?.email_id,provider:"gmail" });
      const { data } = response;

      if (data?.status) {
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);



        Cookies.set("gmail_user", item?.email_id, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        });
        Cookies.set("gmail_access_token", data?.access_token, {
          path: "/",
          secure: true,
          sameSite: "None", expires: new Date(item?.expires_in * 1000)
        });
        Cookies.set("gmail_refresh_token", item?.refresh_token, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        })
        Cookies.set("gexpire", item?.expires_in, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        });
       Cookies.set("tid",item?.id,{
        path:"/",
        secure:true,
        sameSite:"None",expires:expiresAt
       })


        setIsConnected(true);
        Cookies.set('selectedid', item?.id);
        setselectedid(item?.id);
      }

    } catch (err) {
      console.log(err);
    }

    setShowDropdown(false);



  }
  const handleexistingsmtp = async (item) => {

    try {

      Cookies.set('uapppas', item?.app_password, {
        path: "/",
        secure: true,
        sameSite: "None"
      });
      Cookies.set('uemail', item?.email, {
        path: "/",
        secure: true,
        sameSite: "None"
      });

      setsmtp(true);
      Cookies.set('selectedsmid', item?.id);
      setselectedsmid(item?.id);
    }

    catch (err) {
      console.log(err);
    }

    setShowsmDropdown(false);



  }


  const handleexistingoutlook = async (item) => {

    try {
      let response = await axiosInstance.post('/api/email-token/refresh', { email_id: item?.email_id,provider:"outlook" });
      const { data } = response;

      Cookies.set("microsoft_access_token", item?.access_token, {
        path: "/",
        secure: true,
        sameSite: "None", expires: new Date(item?.expires_in * 1000)
      });
         Cookies.set("mid",item?.id,{
        path:"/",
        secure:true,
        sameSite:"None",expires:new Date(item?.expires_in * 1000)
       })

          if (data?.status) {
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);



        Cookies.set("ms_email", item?.email_id, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        });
        Cookies.set("microsoft_access_token", data?.access_token, {
          path: "/",
          secure: true,
          sameSite: "None", expires: new Date(item?.expires_in * 1000)
        });
        Cookies.set("microsoft_refresh_token", item?.refresh_token, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        })
        Cookies.set("mexpire", item?.expires_in, {
          path: "/",
          secure: true,
          sameSite: "None", expires: expiresAt
        });
       Cookies.set("mid",item?.id,{
        path:"/",
        secure:true,
        sameSite:"None",expires:expiresAt
       })


    setIsMicrosoftConnected(true);
   Cookies.set('selectedmid', item?.id);
      setselectedmid(item?.id);
      }
     

    




      setmShowDropdown(false);

    } catch (err) {
      console.log(err);
    }



  }
  const handledisconnect = async (provider) => {
    try {
      if (provider === "gmail") {
        Cookies.remove("gmail_access_token");
        Cookies.remove('selectedid');
        await signOut()
        setIsConnected(false);
        setShowDropdown(false);


      }
      if (provider === "outlook") {
        Cookies.remove("microsoft_access_token");
        await firebaseSignOut(auth);
        setmShowDropdown(false)
        setIsMicrosoftConnected(false);
      }
      if (provider === "smtp") {
        Cookies.remove("uapppas");
        Cookies.remove("uemail")

        setShowsmDropdown(false);
        setsmtp(false)
      }
    } catch (err) {
      console.log(err);
    }

  }
 


  return (
    <>
      <div className="container custombackgrond rounded-4 border p-4 shadow-sm mt-5">
        <h5 className="fw-bold mb-4 text-white ">Connect your Email account (Choose any one) </h5>

        <div className="d-flex gap-3 mt-3 flex-wrap">
          {/* Gmail Box */}
          <div className=" flex-fill custombackgroundcard d-flex justify-content-between align-items-center border rounded-3 px-4 py-3" style={{ minWidth: "300px", position: "relative" }}>
            {/* Left: Icon and Text */}
            <div className="d-flex align-items-center gap-3">
              <Image src={gmailicon} alt="Gmail Icon" width={35} height={35} className="me-2">

              </Image>
              <div>
                <div className="fw-semibold text-white">Log in using Gmail</div>
                <div className="text-white small">{isConnected ? 'Connected to Gmail' : 'You are not connected to Gmail'}</div>
              </div>
            </div>

            {/* Right: Button */}
            <button disabled={isConnected || isMicrosoftConnected || smtp} onClick={handlegmaillogin}
              className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill ms-auto me-3 btn-main"
            >
              {isConnected
    ? 'Connected'
    : (emaildata?.length < emaillimit ? 'Add' : 'Log in')}
            </button>

            {isConnected ? (
              <span onClick={() => handledisconnect('gmail')} className="d-flex align-items-center gap-2 disconnect_button">
                <Image src={remove} alt="Connected" width={22} height={22} />
              </span>
            ) :
              (!isMicrosoftConnected && !smtp && emaildata?.length > 0 && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-primary drop_icon"
                  onClick={() => setShowDropdown(prev => !prev)}
                />
              ))
            }




            {showDropdown && (
              <div className="shows  pe-3 ps-3 p-2 border rounded shadow customdropdowncard ">
                {emaildata?.length > 0 && emaildata?.map((item) => {
                  return (
                    <div className=" " key={item.id}>
                      <div className="d-flex align-items-center justify-content-between mt-3  ">
                        <div className="text-white d-block small mb-1">{item?.email_id}</div>
                        <button disabled={isConnected} onClick={() => handleexistinggmail(item)}
                          className="btn btn-primary gap-2 px-4 rounded-pill btn-main"
                        >
                          {item?.id == selectedid && isConnected ? 'Connected' : 'Continue'}



                        </button>

                        {item?.id == selectedid && isConnected && (
                          <span onClick={() => handledisconnect('gmail')} className="d-flex align-items-center gap-2 disconnect_button">
                            <Image src={remove} alt="Connected" width={22} height={22} />
                          </span>
                        )}
                      </div>


                    </div>
                  )





                })}



              </div>
            )}

          </div>

          <div className="flex-fill d-flex custombackgroundcard justify-content-between align-items-center border rounded-3 px-4 py-3" style={{ minWidth: "300px", position: "relative" }}>
            {/* Left: Icon and Text */}
            <div className="d-flex align-items-center gap-3">
              <Image src={outlook} alt="Outlook Icon" width={35} height={35} className="me-2">

              </Image>
              <div>
                <div className="fw-semibold text-white">Log in using Outlook</div>
                <div className="text-white small">{isMicrosoftConnected ? 'Connected to Outlook' : 'You are not connected to Outlook'}</div>
              </div>
            </div>

            {/* Right: Button */}
            <button disabled={isConnected || isMicrosoftConnected || smtp} onClick={handleMicrosoftLogin}

              className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill ms-auto me-3 btn-main"
            >
              
  {isMicrosoftConnected
    ? 'Connected'
    : (emaildata?.length < emaillimit ? 'Add' : 'Log in')}
            </button>
            {isMicrosoftConnected ? (
              <span onClick={() => handledisconnect('outlook')} className="d-flex align-items-center gap-2 disconnect_button">
                <Image src={remove} alt="Connected" width={22} height={22} />
              </span>
            ) :
              (!isConnected && !smtp && outlookdata.length > 0 && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-primary drop_icon"
                  onClick={() => setmShowDropdown(prev => !prev)}
                />
              ))
            }



            {showmDropdown && (
              <div className="shows  pe-3 ps-3 p-2 border rounded  customdropdowncard  ">
                {outlookdata?.length > 0 && outlookdata?.map((item) => {
                  return (
                    <div className=" " key={item.id}>
                      <div className="d-flex align-items-center justify-content-between mt-3  ">
                        <div className="text-white d-block small mb-1">{item?.email_id}</div>
                        <button disabled={isMicrosoftConnected} onClick={() => handleexistingoutlook(item)}
                          className="btn btn-primary gap-2 px-4 rounded-pill btn-main "
                        >
                          {item?.id == selectedmid && isMicrosoftConnected ? 'Connected' : 'Continue'}



                        </button>

                        {item?.id == selectedmid && isMicrosoftConnected && (
                          <span onClick={() => handledisconnect('outlook')} className="d-flex align-items-center gap-2 disconnect_button">
                            <Image src={remove} alt="Connected" width={22} height={22} />
                          </span>
                        )}
                      </div>


                    </div>
                  )





                })}



              </div>
            )}

            {/* {isMicrosoftConnected && (
              <>

                <span className="d-flex align-items-center gap-2">
                  <Image src={circle} alt="Connected" width={22} height={22} />
                </span>
                <span onClick={() => handledisconnect('microsoft')} className="d-flex align-items-center gap-2 disconnect_button">
                  <Image src={remove} alt="Connected" width={22} height={22} />
                </span>
              </>
            )} */}
          </div>

          <div className="flex-fill d-flex justify-content-between custombackgroundcard align-items-center border rounded-3 px-4 py-3" style={{ position: "relative" }}>
            {/* Left: Icon and Text */}
            <div className="d-flex align-items-center gap-1">
              <Image src={login} alt="Login Icon" width={35} height={35} className="me-2">

              </Image>
              <div>
                <div className="fw-semibold text-white">Log in using SMTP (Email and app Password)  </div>
                <div className="text-white small">
                  {smtp ? "you're connected with SMTP account" : "You're not connected with smtp account "}
                </div>
              </div>
            </div>

            {/* Right: Button */}
            <button disabled={isConnected || isMicrosoftConnected || smtp} onClick={handlesmtplogin} className="btn btn-primary btn-main d-flex align-items-center gap-1 px-4 rounded-pill ms-auto me-3">
            
               {smtp
    ? 'Connected'
    : (emaildata?.length < emaillimit ? 'Add' : 'Log in')}
            </button>
            {smtp ? (
              <span onClick={() => handledisconnect('smtp')} className="d-flex align-items-center gap-2 disconnect_button">
                <Image src={remove} alt="Connected" width={22} height={22} />
              </span>
            ) :
              (!isMicrosoftConnected && !isConnected && existsmtp?.length > 0 && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-primary drop_icon"
                  onClick={() => setShowsmDropdown(prev => !prev)}
                />
              ))
            }



            {showsmDropdown && (
              <div className="shows  pe-3 ps-3 p-2 border rounded shadow  customdropdowncard ">
                {existsmtp?.length > 0 && existsmtp?.map((item) => {
                  return (
                    <div className=" " key={item.id}>
                      <div className="d-flex align-items-center justify-content-between mt-3   ">
                        <div className="text-white d-block small mb-1">{item?.email}</div>
                        <div className="d-flex gap-3">
                          <button disabled={smtp} onClick={() => handleexistingsmtp(item)}
                            className="btn btn-primary gap-2 px-4 rounded-pill btn-main"
                          >
                            {item?.id == selectedsmid && smtp ? 'Connected' : 'Continue'}



                          </button>

                          {item?.id == selectedsmid && smtp && (
                            <span onClick={() => handledisconnect('smtp')} className="d-flex align-items-center gap-2 disconnect_button">
                              <Image src={remove} alt="Connected" width={22} height={22} />
                            </span>
                          )}
                        </div>
                      </div>


                    </div>
                  )





                })}



              </div>
            )}

          </div>



          {/* Outlook Box */}

        </div>



        {/* Card Section */}

      </div>
      {showSmtpModal && <SmtpModal isOpen={showSmtpModal} onClose={handleCloseModal} />}

    </>
  );
};

export default EmailConnect;
