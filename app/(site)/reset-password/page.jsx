"use client";
import Heading from "@/components/heading/Heading";
import { resetpassword } from "@/utils/service/userlogin";
import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ResetPassword = () => {
  const [email,setemail] = useState('');
  const[message,setmessage] = useState('');
  const[loading,setloading] = useState(true);
  const handleemail = async(e)=>{
    setloading(false);
    e.preventDefault();
    try{
        let res = await resetpassword(email);
       
        if(res.isSuccess){
          setloading(true);
           setmessage("Veuillez vérifier votre boîte de réception e-mail. Un lien pour réinitialiser votre mot de passe a été envoyé.");
setemail('')
        }
        if(!res.isSuccess){
           setloading(true);
          setmessage("Email non trouvé");
        }
    }catch(err){
       setloading(true);
      console.log(err)
    }
  }
  return (
      <div className="page-reset-password sec-padding">
        <Container fluid="xl">
         
          <Heading title="Réinitialiser le mot de passe" />
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              <div className="bg-gray p-3 p-lg-4">
                <p>
                  Entrez votre adresse email pour réinitialiser votre mot de passe. D'autres instructions seront envoyées par e-mail.
                </p>
                <p className="text-danger">{message}</p>
                <Form className="mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formResetPasswordEmail"
                  >
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control type="email" placeholder="jane@framer.com" value={email} onChange={(e)=>setemail(e.target.value)} />
                  </Form.Group>
                  <Button onClick={handleemail} className="btn-main" type="submit">
                 {!loading ? <span className="spinner" /> : "Réinitialiser le mot de passe"}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default ResetPassword;
