"use client";
import React from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import scrapInstance from "@/utils/scrapeInstace";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Campaigns = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/user-campaigns");
      setCampaigns(response.data.campaigns || []);
    } catch (err) {
      console.log("Error fetching campaigns:", err);
      setError("Could not load Campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const startcompain = async (compain) => {
    let gmail = Cookies.get("gmail_access_token");
    let outlook = Cookies.get("microsoft_access_token");
    let userpass = Cookies.get("uapppas");
    let linkedin = Cookies.get("user_token");
    let grefreshtoken = Cookies.get("gmail_refresh_token");
    let mrefreshtoken = Cookies.get("microsoft_refresh_token");
    let gtokenexpire = Cookies.get("gexpire");
    let mtokenexpire = Cookies.get("mexpire");
    let user = Cookies.get("uemail");
    let uemail = Cookies.get("gmail_user");
    let memail = Cookies.get("ms_email");
    let usertoken = Cookies.get("user_token");
    let mid = Cookies.get("mid");
    let pass = userpass;

    let gtoken = gmail;
    let mstoken = outlook;

    

    let { id, channel, company_size, ideal_customer, sector,message_delay } = compain;
      if (!gmail && !outlook && !userpass&& !linkedin) {
      toast.warn("To Start first Login")
      
      return;
    }
    try {
      if (channel === "Email") {
        if (!gmail && !outlook && !userpass) {
      toast.warn("To Start first Login")
      
      return;
    }
        let body = {
          id,
          channel,
          company_size,
          ideal_customer,
          sector,
          gtoken,
          mstoken,
          grefreshtoken,
          mrefreshtoken,
          gtokenexpire,
          mtokenexpire,
          user,
          uemail,
          memail,
          pass,
          message_delay
        };

    let response = await axiosInstance.patch(
        `api/campaign/${id}/status`,
        {
          campaign_status: "active",
        }
      );
   const{data} = response;
  

   if(data.status===true){
     fetchData();
     let response =    await scrapInstance.post(
          "/api/scrapemail",
          { body },
          { withCredentials: true }
        );
      

      const {data} = response;

      if(!data.isSuccess){
         await toast.warn("Outlook Token expired, please sign in again!");
         stopddcomapin(compain);
         try{
            let deletetoken = await axiosInstance.delete(`/api/email-token/${mid}`);
            Cookies.remove("microsoft_access_token")
         }catch(err){
          console.log(err);
         }
         // here delete api
    }else{
      await toast.success("Compain Start Successfully")
    }
    fetchData();
   }
  
      }

      if (channel === "Linkedin") {
        try {
            if (!linkedin) {
      toast.warn("To Start first Login")
      
      return;
    }
          setIsLoading(true);
          let body = {
            id,
            channel,
            company_size,
            ideal_customer,
            sector,
            usertoken,
          };


          let response = await axiosInstance.patch(
        `api/campaign/${id}/status`,
        {
          campaign_status: "active",
        }
      );
       const{data} = response;
         if(data.status===true){
           fetchData();
          await toast.success("Compain Start Successfully")
         
     let response =    await scrapInstance.post(
          "/api/scrap",
          { body },
          { withCredentials: true }
        );
      

      const {data} = response;

    //   if(!data.isSuccess){
    //      await toast.warn("Outlook Token expired, please sign in again!");
    //      stopddcomapin(compain);
    //      try{
    //         let deletetoken = await axiosInstance.delete(`/api/email-token/${mid}`);
    //         Cookies.remove("microsoft_access_token")
    //      }catch(err){
    //       console.log(err);
    //      }
    //      // here delete api
    // }else{
    //   await toast.success("Compain Start Successfully")
    // }
    fetchData();
   }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log("LinkedIn error:", err);
        }
      }
      
    } catch (err) {
      console.log("Error starting campaign:", err);
      stopddcomapin(compain);
      toast.error("Only one compain at a Time")
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (campaign) => {
    const campaignWithStatus = {
      ...campaign,
      campaign_status: campaign.campaign_status,
    };
    localStorage.setItem(
      "campaign_to_edit",
      JSON.stringify(campaignWithStatus)
    );
    const encodedName = encodeURIComponent(campaign.campaign_name);
    router.push(`/dashboard/campaigns/edit/${encodedName}`);
  };
  const stopddcomapin = async (compain) => {
    let { id } = compain;

    try {
      let stopcompain = await scrapInstance.post("/api/stopcompain", {
        id: id,
      });
      const{data}  =stopcompain;
  
      // change status
      let updatestatus = await axiosInstance.patch(
        `api/campaign/${id}/status`,
        {
          campaign_status: "deactive",
        }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  const stopcomapin = async (compain) => {
    let { id,channel} = compain;
    console.log(channel);


    try {
     if(channel==="Email"){
let stopcompain = await scrapInstance.post("/api/stopcompain", {
        id: id,
      });
      const{data}  =stopcompain;
      if(data?.isSuccess){
        await toast.success("Compain stoped Successfully");
      }
     }
     if(channel==="Linkedin"){
      let stopcompain = await scrapInstance.post("/api/pausescrap", {
        id: id,
      });
      const{data}  =stopcompain;
      if(data?.isSuccess){
        await toast.success("Compain stoped Successfully");
      }
     }
      
      // change status
      let updatestatus = await axiosInstance.patch(
        `api/campaign/${id}/status`,
        {
          campaign_status: "deactive",
        }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  //view leads

  return (
    <div className="campaigns mb-4">
      <div className="d-heading-container d-flex flex-wrap justify-content-between mb-4">
        <h2 className="mb-0 fw-bold me-5 d-inline-block">Campaigns</h2>
        <Link href="/dashboard/onboarding">
          <Button className="btn-rounded" size="sm">
            Add New Campaign
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Loading campaigns...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="px-3 py-2 small">
          {error}
        </Alert>
      ) : campaigns.length === 0 ? (
        <p className="text-center py-5">No campaigns found.</p>
      ) : (
        <Table striped hover responsive className="mb-0 small">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Campaign Name</th>
              <th>Target Channels</th>
              <th>Number of Leads</th>
              <th>Campaign Status</th>
              <th>Sequences in progress</th>
              <th>Results</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <h6
                    className="mb-0"
                    onClick={() => handleEditClick(campaign)}
                  >
                    {campaign.campaign_name}
                  </h6>
                </td>
                <td>{campaign.channel}</td>
                <td>8</td>
                <td>{campaign?.campaign_status==="active"?'In process':'Stopped'}</td>
                <td>{campaign.campaign_status}</td>
                <td>2</td>
                <td>
                  {campaign.campaign_status === "active" ? (
                    <Button
                      onClick={() => stopcomapin(campaign)}
                      className="btn-rounded me-3"
                      size="sm"
                    >
                      Stop
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => startcompain(campaign)}
                        className="btn-rounded me-3"
                        size="sm"
                      >
                        Start
                      </Button>
                    </>
                  )}

                  <Button className="btn-rounded me-3" size="sm">
                    Delete
                  </Button>
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/leads/${campaign?.id}?channel=${campaign?.channel}`)
                    }
                    className="btn-rounded me-3"
                    size="sm"
                  >
                    View leads
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Campaigns;
