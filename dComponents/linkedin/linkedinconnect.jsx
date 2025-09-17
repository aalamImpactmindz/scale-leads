// components/LinkedInConnect.js
"use client";
import React, { useEffect,useState,useLayoutEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import chromicon from '../../public/assets/images/chrome_icon.png';
import linkedin from '../../public/assets/images/linkedinicon.svg';
import { jwtDecode } from "jwt-decode";
import remove from '../../public/assets/images/remove.png'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import scrapInstance from "@/utils/scrapeInstace";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/context/Authcontext";
const LinkedInConnect = () => {
    const {connected,setconnected } = useContext(AuthContext);
    const[isExtensionInstalled, setIsExtensionInstalled] = useState(false);
    const[islinkedinConnected, setIslinkedinConnected] = useState(false);
    const[isloading, setIsLoading] = useState(false);
   const [selectedid, setselectedid] = useState();
    const[message,setmessage] = useState("")
    const[id,setId] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const[planid,setplanid] = useState('');
let linkedinlimit;
    const[existlinkedin , setexistlinkedin] = useState([]);
    const handleLogin = async() => {
  const extensionId = "hhfbaibjbeanbpigmnlebbncceblfndo"; // 🧩 Replace with your extension's real ID
 const threeMonthsLater = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);

chrome.runtime.sendMessage(
  extensionId,
  { action: "test_trigger" },
  async(response) => {
    
    if (chrome.runtime.lastError) {
      console.error("❌ Error:", chrome.runtime.lastError.message);
    } else {
      console.log(response);
     if(response?.token!==undefined){
          Cookies.set("user_token", response?.token, {path: "/",
            secure: true,
            sameSite: "None", expires: threeMonthsLater });
          Cookies.set("ua",response?.ua,{path:"/", secure:true,sameSite:"None",expires:threeMonthsLater})
         setIslinkedinConnected(true);
         setconnected(true);
       let fetchprofile = await scrapInstance.post('/api/getprofile',{

        user_token:response?.token,
        userAgent:response?.ua
       })
       const {data}=fetchprofile;
   
      try{
          let sendtoken  = await axiosInstance.post("/api/linkedin-token",{
            status:true,linkedin_token:response?.token,email_id:data?.email,username:data?.name
          })
      }catch(err){
        console.log(err);
      }
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
    }, 300); // Check every 300ms

    // Stop after 3 seconds
    setTimeout(() => clearInterval(checkInterval), 300);
  }, []);



useEffect(()=>{
    const getCookies = Cookies.get("user_token");
 
    if(getCookies!==undefined){
      setconnected(true);
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
  
  
    setexistlinkedin(data?.data);
 
    // Cookies.set("user_token", linkedin_token, { expires: 20 });
    // setIslinkedinConnected(true);
  
  
 }

  }catch(err){
    console.log(err);
  }
}
const handledisconnect = ()=>{
  Cookies.remove('user_token');
  setIslinkedinConnected(false);
setconnected(false);
}
useEffect(()=>{
  let id = Cookies.get("selectedlid");
  if(id){
        setselectedid(id);
  }

  const currentplan = localStorage.getItem("plan");
  let pid = JSON.parse(currentplan);
  setplanid(pid?.id);
 
},[])

const getlinkedinlimit = (pid)=>{
  
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
linkedinlimit = getlinkedinlimit(planid);



const handleexistlinkedin = (item)=>{


  try{
     Cookies.set("user_token", item?.linkedin_token, { expires: 200 });
     Cookies.set("lid",item?.id,{ expires: 20 })
      Cookies.set('selectedlid', item?.id);
      setconnected(true);
    setselectedid(item?.id);
     setIslinkedinConnected(true);
     setconnected(true)
     setShowDropdown(false);
  }catch(err){
    console.log(err)
  }
}


  return (
    <div className="container bg-gray custombackgrond rounded-4 border p-4 shadow-sm mt-5" style={{ minWidth: "300px", position: "relative" }}>
      <h5 className="fw-bold mb-4 text-white ">Connectez votre compte LinkedIn</h5>
      {isExtensionInstalled?(     
  <div>

          <div className="d-flex justify-content-between align-items-center border rounded-3 px-4 py-3 custombackgroundcard">
        {/* Left: Icon and Text */}
        <div className="d-flex align-items-center gap-3">
          <Image src={linkedin} alt="LinkedIn Icon" width={35} height={35} className="me-2">

          </Image>
          <div >
            <div className="fw-semibold text-white">Connectez-vous à votre compte LinkedIn</div>
            <div className="small text-white">
              {islinkedinConnected?"Vous êtes connecté à LinkedIn":"Vous n'êtes pas connecté à LinkedIn donc notre extension ne peut pas détecter votre compte"}
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
      <div className="d-flex gap-2 align-items-center">
{islinkedinConnected ? (
  <button
    disabled
    className="btn me-2 btn-primary d-flex align-items-center gap-1 px-4 rounded-pill btn-main "
  >
    Connecté
  </button>
) : (!existlinkedin || existlinkedin.length === 0) && (
  <button
    onClick={handleLogin}
    className="btn me-2 btn-primary d-flex align-items-center gap-1 px-4 rounded-pill btn-main"
  >
    Connectez-vous à LinkedIn
  </button>
)}


        {islinkedinConnected ?(
             <span onClick={handledisconnect} className="d-flex align-items-center gap-2 disconnect_button">
                                      <Image src={remove} alt="Connected" width={22} height={22} />
                                    </span>
        ):(
          
                         existlinkedin.length>0 && (
                          <>
                          {existlinkedin.length <linkedinlimit &&(
                            <button
    onClick={handleLogin}
    className="btn me-2 btn-primary d-flex align-items-center gap-1 px-4 rounded-pill btn-main"
  >
   Ajouter un nouveau compte
  </button>
                          )}
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-primary drop_icon"
                             onClick={() => setShowDropdown(prev => !prev)}
                          />
                          </>
                        )
        )}
 {showDropdown && (
              <div className="shows  pe-3 ps-3 p-2 border rounded shadow customdropdowncard ">
                  {existlinkedin?.length > 0 && existlinkedin?.map((item) => {
                  return (
                    <div className=" " key={item.id}>
                      <div className="d-flex align-items-center justify-content-between mt-3  ">
                        <div>
                           <div className="text-white d-block small mb-1">{item?.username}</div>
                        <div className="text-white d-block small mb-1">{item?.email_id}</div>
                        </div>
                        <button disabled={islinkedinConnected} onClick={()=>handleexistlinkedin(item)}
                          className="btn btn-primary gap-2 px-4 rounded-pill btn-main  ms-auto me-3"
                        >
                          {/* {item?.id == selectedid && islinkedinConnected ? 'Connected' : 'Continue'} */}
                          {islinkedinConnected ? 'Connecté' : 'Continuer'}



                        </button>

                        {islinkedinConnected && (
                          <span className="d-flex align-items-center gap-2 disconnect_button">
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

      </div>
     

  </div>
    
    ):(<div className="w-75 mx-auto my-4">
      <p className="text-center mb-3 text-white">
        Connectez automatiquement votre compte LinkedIn avec notre extension de navigateur
      </p>

      <div className="d-flex align-items-center justify-content-between border rounded-3 px-3 py-2 custombackgroundcard ">
        {/* Left: Icon + Label */}
        <div className="d-flex align-items-center gap-2">
          <Image src={chromicon} alt="Chrome Icon" width={45} height={45} className="me-2">

          </Image>
          <div className="fw-semibold text-white">Boutique en ligne Chrome</div>
        </div>

        {/* Right: Button */}
        <button
          onClick={() => window.open("https://chromewebstore.google.com/detail/scalelead/hhfbaibjbeanbpigmnlebbncceblfndo?authuser=0&hl=en", "_blank")}
          className="btn btn-primary d-flex align-items-center gap-1 px-4 py-2 rounded-pill btn-main"
        >
        Obtenez l'extension
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
