// components/LinkedInConnect.js
"use client";
import React, { useEffect,useState,useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import chromicon from '../../public/assets/images/chrome_icon.png';
import linkedin from '../../public/assets/images/linkedinicon.svg';
import { jwtDecode } from "jwt-decode";


import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import scrapInstance from "@/utils/scrapeInstace";
import Cookies from "js-cookie";
const LinkedInConnect = () => {
    const[isExtensionInstalled, setIsExtensionInstalled] = useState(false);
    const[islinkedinConnected, setIslinkedinConnected] = useState(false);
    const[isloading, setIsLoading] = useState(false);
    const[message,setmessage] = useState("")
    const[id,setId] = useState("");
    const handleLogin = async() => {
  const extensionId = "nmckndphoocceadajdmdgbckfagcifjp"; // 🧩 Replace with your extension's real ID
 
chrome.runtime.sendMessage(
  extensionId,
  { action: "test_trigger" },
  async(response) => {
    if (chrome.runtime.lastError) {
      console.error("❌ Error:", chrome.runtime.lastError.message);
    } else {
      console.log("✅ Response from extension:", response);
      Cookies.set("user_token", response?.token, {path: "/",
            secure: true,
            sameSite: "None", expires: 7 });
         setIslinkedinConnected(true);
      try{
          let sendtoken  = await axiosInstance.post("/api/linkedin-token",{
            status:true,linkedin_token:response?.token
          })
      }catch(err){
        console.log(err);
      }
    }
  }
);
 
  };
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
  const startautomation = async()=>{
    try{  
      setIsLoading(true);

       let start = await scrapInstance.post("/api/scrap/33");
       const{data} = start;
       if(data?.status){
        setIsLoading(false);
        setmessage("Leads fetched successfully🎉")
       }else{
 setIsLoading(false);
       }
      
    }catch(err){
       setIsLoading(false);
      console.log(err);
    }
  }


useEffect(()=>{
    const getCookies = Cookies.get("user_token");
    if(getCookies){
        setIslinkedinConnected(true);
    }
   const token = Cookies.get("authToken");
   if(token){
    let decode = jwtDecode(token);
    if(decode){
      console.log(decode);
      const{sub} = decode;

getlinkedintoken(sub);

    }
   }

},[])
setTimeout(()=>{
  setmessage("")
},2000)

const getlinkedintoken = async(sid)=>{
  
  try{
    let existingtoken = await axiosInstance.get(`/api/linkedin-token/${sid}`);
  const{data} = existingtoken;
 if(data?.status){
  const{linkedin_token} = data.data;
  if(linkedin_token){
    // Cookies.set("user_token", linkedin_token, { expires: 20 });
    // setIslinkedinConnected(true);
  }
  
 }

  }catch(err){
    console.log(err);
  }
}

  return (
    <div className="container bg-gray custombackgrond rounded-4 border p-4 shadow-sm mt-5">
      <h5 className="fw-bold mb-4 text-white ">Connect your LinkedIn account</h5>
      {isExtensionInstalled?(     
  <div>

          <div className="d-flex justify-content-between align-items-center border rounded-3 px-4 py-3 custombackgroundcard">
        {/* Left: Icon and Text */}
        <div className="d-flex align-items-center gap-3">
          <Image src={linkedin} alt="LinkedIn Icon" width={35} height={35} className="me-2">

          </Image>
          <div >
            <div className="fw-semibold text-white">Log in to your LinkedIn account</div>
            <div className="small text-white">
              {islinkedinConnected?"You're connected to LinkedIn":"You're not connected to LinkedIn so our extension can't detect your account"}
            </div>
          </div>
        </div>
      
                    {isloading ? (
  <div className="w-25">
<div className="progress" style={{ height: '15px' }}>
    <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{ width: '100%' }}></div>
  </div>
    </div>
):(<p className="text-success text-center mb-0 pt-1 pb-0">{message}</p>)}
    
        {/* Right: Button */}
      <div className="d-flex gap-2">
          <button disabled={islinkedinConnected} onClick={handleLogin} className="btn btn-primary d-flex align-items-center gap-1 px-4 rounded-pill btn-main">
         {islinkedinConnected?'Connected':'Log in to LinkedIn '} 
        </button>
{/* {islinkedinConnected&&(
  <button disabled={isloading} onClick={startautomation} className="btn btn-primary d-flex align-items-center gap-1 px-4 rounded-pill">
  {isloading ? (
    <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
  ) : (
    "Start Automation"
  )}
</button>
)} */}

 
      </div>

      </div>
     

  </div>
    
    ):(<div className="w-75 mx-auto my-4">
      <p className="text-center mb-3 text-white">
        Connect your LinkedIn account automatically with our browser extension
      </p>

      <div className="d-flex align-items-center justify-content-between border rounded-3 px-3 py-2 custombackgroundcard ">
        {/* Left: Icon + Label */}
        <div className="d-flex align-items-center gap-2">
          <Image src={chromicon} alt="Chrome Icon" width={45} height={45} className="me-2">

          </Image>
          <div className="fw-semibold text-white">Chrome Web Store</div>
        </div>

        {/* Right: Button */}
        <button
          onClick={() => window.open("https://chromewebstore.google.com/detail/scalelead/nmckndphoocceadajdmdgbckfagcifjp?authuser=0&hl=en", "_blank")}
          className="btn btn-primary d-flex align-items-center gap-1 px-4 py-2 rounded-pill btn-main"
        >
          Get the Extension 
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ transform: "rotate(0deg)" }}
          />
        </button>
      </div>
    </div>)}
 
      {/* Card Section */}
 
    </div>
  );
};

export default LinkedInConnect;
