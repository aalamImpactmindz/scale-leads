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

export default function DashboardHome() {
  const[data,setData] = useState([])
  const fetchdata = async()=>{
    try{
         const getdata = await axiosInstance.get('/api/dashboard-data');
         const {data} = getdata;
         console.log(data);
      if(data.success){
        setData(data.data);
      }
    }catch(err){
      console.log(err);
    }
  }
useEffect(()=>{
     fetchdata()
},[])

  return (
    <div className="dashboard">
      <h2 className="mb-4 fw-bold">Dashboard</h2>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        <Col>
          <div className="bg-success px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">26</span>Leads
          </div>
        </Col>
        <Col>
          <div className="bg-danger px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">14</span>Campaigns
          </div>
        </Col>
        <Col>
          <div className="bg-primary px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">8</span>Plan
          </div>
          <div className="bg-gray rounded-3 p-4 d-flex flex-wrap flex-column mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Status de prospection</h5>
              <Badge className="bg-light color-dark py-2">Inactive</Badge>
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
                  <span>2</span>
                </div>
                <h6 className="mt-2 text-white text-opacity-75">
                  Aliqua massa
                </h6>
              </div>
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
                  <span>1214</span>
                </div>
                <h6 className="mt-2 text-white text-opacity-75">
                  Lorem ipsum dolor
                </h6>
              </div>
            </div>
            <Button className="btn-main w-100">
              Lorem ipsum dolor sit amet
            </Button>
          </div>
        </Col>
      </Row>
      
       
          <LinkedInConnect />
       
          <EmailConnect></EmailConnect>
    </div>
          </>
  );
}
