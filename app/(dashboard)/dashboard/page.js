"use client";
import "react-circular-progressbar/dist/styles.css";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCrown, faRocket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import imageUser from "@/public/assets/images/user.jpg";
import AnimatedProgressbar from "@/dComponents/d-circular-progressbar/DCircularProgressbar";
import LinkedInConnect from "@/dComponents/linkedin/linkedinconnect";
import EmailConnect from "@/dComponents/email/emailconnect";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import CountUp from "react-countup";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import { dashboardstats } from "@/utils/service/userlogin";
export default function DashboardHome() {
  const[islinkconnect,setconnect] = useState(false);
 
  const [leads, totalleads] = useState(0);
  const [leadperc, setleadperc] = useState(0);
  const [emailleads, totalemailleads] = useState(0);
  const [leademailperc, setlemaileadperc] = useState(0);
    const {user,setuser ,connected,email} = useContext(AuthContext);
    const[emailstats,setemailstats] = useState(null);
    const[linkedinstats,setlinkedinstats] = useState(null);
  //linkedin
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/linkedin/leads");
      totalleads(response.data.leads.length || 0);
      let leadpercentage = Math.round((response.data.leads.length / 500) * 100);
      console.log(leadpercentage);
      setleadperc(leadpercentage);
    } catch (err) {
      console.log("Error fetching leads:", err);
    } finally {
    }
  };
  const fetchemailData = async () => {
    try {
      const response = await axiosInstance.get("/api/email-leads");

      totalemailleads(response.data?.data?.length || 0);
      let leadpercentage = Math.round(
        (response.data?.data?.length / 500) * 100
      );

      setlemaileadperc(leadpercentage);
    } catch (err) {
      console.log("Error fetching leads:", err);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
    fetchemailData();
  }, []);

  const statsdata = async()=>{
    try{
    let res = await dashboardstats();
    setemailstats(res.email);
  
    setlinkedinstats(res.linkedin);
    console.log(res.linkedin);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    
    const token = Cookies?.get("authToken");
  
    if (token) {
      let decode = jwtDecode(token);
      if (decode) {
        const { name } = decode;
        setuser(name);
      }
    }
    statsdata();
  }, [connected,email]);
useEffect(()=>{
  const liid = Cookies?.get("user_token");
      let check = Cookies.get("gmail_access_token");
      let microsoft = Cookies.get("microsoft_access_token")
 
 
    statsdata();
   
},[connected,email])


  return (
    <div className="dashboard">
      <Row>
        <Col md={8}>
          <h2 className="mb-4 fw-bold">Tableau de bord</h2>
          <Row className="row-cols-1 row-cols-sm-2">
            <Col>
              <div className="bg-gradient-purple p-4 rounded-3 text-light">
                <Row>
                  <Col md={7} className="d-flex flex-column">
                    <h5 className="mb-5">
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span className="ms-3 fw-normal text-white text-opacity-75">
                        LinkedIn
                      </span>
                    </h5>
                    <h3 className="mt-auto display-5 fw-semibold">
                      <CountUp end={leads} duration={6} />
                    </h3>
                   
                  </Col>
                  <Col md={5} className="d-flex flex-column align-items-center">
                    <AnimatedProgressbar
                      value={leadperc}
                      strokeColor="#29003b"
                    />
                    <p className="mb-0 text-white text-opacity-75 small mt-2">
                      Aliqua massa arcu
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="bg-gradient-blue p-4 rounded-3 text-light">
                <Row>
                  <Col md={7} className="d-flex flex-column">
                    <h5 className="mb-5">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span className="ms-3 fw-normal text-white text-opacity-75">
                        Email
                      </span>
                    </h5>
                    <h3 className="mt-auto display-5 fw-semibold">
                      <CountUp end={emailleads} duration={6} />
                    </h3>
                   
                  </Col>
                  <Col md={5} className="d-flex flex-column align-items-center">
                    <AnimatedProgressbar
                      value={leademailperc}
                      strokeColor="#000957"
                    />
                    <p className="mb-0 text-white text-opacity-75 small mt-2">
                      Aliqua massa arcu
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="rounded-3 bg-gray mt-4 p-4">
            <h5>Actions envoyés</h5>
            <Row className="row-cols-4 flex-wrap mt-3">
              <Col
                
              >
                <div className="d-flex flex-column flex-grow-1 align-items-center shadow-sm px-3 py-4 rounded-3 gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#FFE3E1",
                    opacity: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E84545",
                    }}
                  />
                </span>
<h4 className="mb-0 lh-1 fw-semibold">
  {connected && email
    ? (linkedinstats?.accept || 0) + (emailstats?.accept || 0)
    : connected
    ? linkedinstats?.accept || 0
    : email
    ? emailstats?.accept || 0
    : 0}
</h4>



                <p className="mb-0 small text-white text-opacity-75">
                  Invitations acceptées
                </p>
                </div>
              </Col>
              <Col
               
              >
                <div  className="d-flex flex-column flex-grow-1 align-items-center  shadow-sm px-3 py-4 rounded-3 gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#FFE3E1",
                    opacity: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E84545",
                    }}
                  />
                </span>
              <h4 className="mb-0 lh-1 fw-semibold">
  {connected && email
    ? (linkedinstats?.send || 0) + (emailstats?.send || 0)
    : connected
    ? linkedinstats?.send || 0
    : email
    ? emailstats?.send || 0
    : 0}
</h4>
                <p className="mb-0 small text-white text-opacity-75">
                 Invitations envoyées
                </p>
                </div>
              </Col>
              <Col
               
              >
                <div  className="d-flex flex-column  flex-grow-1 align-items-center shadow-sm px-3 py-4 rounded-3 gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#FFE3E1",
                    opacity: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E84545",
                    }}
                  />
                </span>
                     <h4 className="mb-0 lh-1 fw-semibold">
  {connected && email
    ? (linkedinstats?.accept || 0) + (emailstats?.send || 0)
    : connected
    ? linkedinstats?.accept || 0
    : email
    ? emailstats?.send || 0
    : 0}
</h4>
                <p className="mb-0 small text-white text-opacity-75">
                  Messages
                </p>
                </div>
              </Col>
              <Col
               
              >
                <div  className="d-flex flex-column flex-grow-1 align-items-center shadow-sm px-3 py-4 rounded-3 gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#FFE3E1",
                    opacity: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E84545",
                    }}
                  />
                </span>
                     <h4 className="mb-0 lh-1 fw-semibold">
  {connected && email
    ? (linkedinstats?.profile_views || 0) + (emailstats?.profile_views || 0)
    : connected
    ? linkedinstats?.profile_views || 0
    : email
    ? emailstats?.profile_views || 0
    : 0}
</h4>
                <p className="mb-0 small text-white text-opacity-75">Visites</p>
                </div>
              </Col>
              {/* <Col
              
              >
                <div   className="d-flex flex-column flex-grow-1 align-items-center shadow-sm px-3 py-4 rounded-3 gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#FFE3E1",
                    opacity: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E84545",
                    }}
                  />
                </span>
                <h4 className="mb-0 lh-1 fw-semibold">0</h4>
                <p className="mb-0 small text-white text-opacity-75">Suivi</p>
                </div>
              </Col> */}
            </Row>
          </div>
          <LinkedInConnect></LinkedInConnect>
          <EmailConnect />
        </Col>
        <Col md={4}>
          <div className="bg-gray rounded-3 p-4 d-flex flex-wrap flex-column align-items-center">
            <div className="profile-pic">
              <Image
                src={imageUser}
                alt="Profile pic"
                width={100}
                height={100}
                priority={true}
                className="object-fit-cover rounded-circle"
              />
            </div>
            <h5 className="my-3">{user}</h5>
            <span className="mb-3 bg-gradient-purple px-3 py-2 lh-1 rounded-3 small">
              <FontAwesomeIcon
                icon={faCrown}
                className="me-2"
                style={{ width: "18px", height: "18px" }}
              />
              Planifier une entreprise
            </span>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <span className="text-center fs-5 fw-bold">
                0
                <i className="fst-normal fw-normal text-white text-opacity-75 d-block small">
                  Relations
                </i>
              </span>
              <span className="text-center fs-5 fw-bold">
             0
                <i className="fst-normal fw-normal text-white text-opacity-75 d-block small">
                 En attention
                </i>
              </span>
              <span className="text-center fs-5 fw-bold">
                0
                <i className="fst-normal fw-normal text-white text-opacity-75 d-block small">
                  Relations
                </i>
              </span>
            </div>
          </div>
          <div className="bg-gray rounded-3 p-4 d-flex flex-wrap flex-column mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">État de la prospection</h5>
              <Badge className="bg-light color-dark py-2">Inactif</Badge>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly my-4">
              <div>
                <div className="d-flex align-items-center justify-content-center fs-2 fw-bold">
                  <span
                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#FFE3E1",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRocket}
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#E84545",
                      }}
                    />
                  </span>
                  <span>{emailleads}</span>
                </div>
                <h6 className="mt-2 text-white text-opacity-75">
                  E-mail
                </h6>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-center fs-2  fw-bold">
                  <span
                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#FFE3E1",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRocket}
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#E84545",
                      }}
                    />
                  </span>
                  <span>{leads}</span>
                </div>
                <h6 className="mt-2 text-white text-opacity-75">
                    Linkedin
                </h6>
              </div>
            </div>
           
          </div>
        </Col>
      </Row>
    </div>
  );
}
