import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import styles from "./smtp.module.css";
import axiosInstance from "@/utils/axiosInstance";

import Cookies from "js-cookie";
import { AuthContext } from "@/app/context/Authcontext";
import scrapInstance from "@/utils/scrapeInstace";

const SmtpModal = ({ isOpen, onClose }) => {
    const {  smtp,setsmtp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, appPassword: false });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = appPassword.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async(e) => {
    e.preventDefault();
     const trimmedPassword = appPassword.replace(/\s+/g, '');
    if (!isFormValid) return;
    
    try{
       //check first
       let checksmtp = await scrapInstance.post('/api/checksmtp',{user:email,pass:trimmedPassword});
   
  let check =    checksmtp.data;
  if(check.isSuccess){
let response =await axiosInstance.post('/api/smtps',{email:email,app_password:trimmedPassword});
       const{data} = response;
       if(data?.status){
        setsmtp(true);
        Cookies.set('uapppas',data?.data?.app_password,{path: "/",
            secure: true,
            sameSite: "None"});
        Cookies.set('uemail',data?.data?.email,{path: "/",
            secure: true,
            sameSite: "None"});
        setMessage(check?.message);

        
       }
       setTimeout(()=>{
         onClose();
       },1500)      
       
     
  }else{
       setError(check?.message);
  }
       
       

    }catch(err){
      console.error(err);
    }

  };


  return (
    <Modal  show={isOpen} onHide={onClose} centered size="md">
      <Modal.Header className="text-white" closeButton >
        <Modal.Title className="text-white" >SMTP Login</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalContent}>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-white" controlId="smtpEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              isInvalid={touched.email && !isEmailValid}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-white" controlId="smtpAppPassword">
            <Form.Label>App Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={styles.input}
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, appPassword: true })}
                isInvalid={touched.appPassword && !isPasswordValid}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeft: "none",
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{transform:'rotate(0deg)'}} />
              </Button>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Password must be at least 6 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            
            type="submit"
            className="w-100 btn-main"
            disabled={!isFormValid}
          >
            Connect
          </Button>
        </Form>
        
      </Modal.Body>
        {message && (
                          <Alert
                            variant="success"
                            className="mt-3 small py-2 rounded-0"
                          >
                            {message}
                          </Alert>
                        )}
                        {error && (
                          <Alert variant="danger" className="mt-3 small py-2 rounded-0">
                            {error}
                          </Alert>
                        )}
    </Modal>
  );
};

export default SmtpModal;
