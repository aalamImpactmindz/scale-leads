"use client";

import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const scrapdata = async () => {
  try {
    let login = await axios.post(
      "https://35b9-223-178-213-81.ngrok-free.app/api/scrap/24"
    );
  } catch (err) {
    console.log(err);
  }
};

const PageDInvoices = () => {
  return (
    <div>
      <Button onClick={scrapdata} className="me-2">
        Login
      </Button>
      <Button>Scrap</Button>
    </div>
  );
};

export default PageDInvoices;
