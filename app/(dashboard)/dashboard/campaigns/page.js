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
const [showMessageModal, setShowMessageModal] = useState(false);
const [linkedinMessage, setLinkedinMessage] = useState('');
const [emailMessage, setEmailMessage] = useState('');
const [showfollowModal, setShowfolloupModal] = useState(false);
const [linkedinsfolloup, setLinkedinfollowup] = useState('');
const[emailfollowup,setEmailfollowup] = useState('');
const[msgId,setmsgid] = useState('');



  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/user-campaigns");
      setCampaigns(response.data.campaigns || []);
    } catch (err) {
      console.log("Error fetching campaigns:", err);
      setError("No Campaign found");
    } finally {
      setLoading(false);
    }
  };


const handledelete = async(id)=>{
  try{
       let resp = await axiosInstance.delete(`/api/campaigns/${id}`);
       const{data} =resp;
    if(data?.status){
      toast.success(data?.message);
      fetchData();
    }
  }catch(err){
    console.log(err);

  }
}


const deletetoken = async(id)=>{
  try{
         let res = await axiosInstance.delete(`/api/linkedin-tokens/${id}`)
         const {data}  = res;
         console.log(data);
  }catch(err){
    console.log(err);
  }
}

const fetchMessages = async () => {
  try {
    const res = await axiosInstance.get("/api/user/messages/latest");
     const {data} = res;

     setmsgid(data?.data?.id);
    setLinkedinMessage(data?.data?.message_content || '');
    setEmailMessage(data?.data?.email_content || '');
    setLinkedinfollowup(data?.data?.follow_up_linkedin || '');
    setEmailfollowup(data?.data?.follow_up_email || '')
  } catch (err) {
    toast.error("Failed to load messages");
  }
};
  

const handleOpenMessageModal = () => {
  fetchMessages();
  setShowMessageModal(true);
};

const handleOpenfollowupModal = ()=>{
  fetchMessages();
  setShowfolloupModal(true);
}
// Save updated messages
const handleSaveMessages = async () => {
  try {
    await axiosInstance.post("/api/user-messages/update", {
      id:msgId,
      message_content: linkedinMessage,
      email_content: emailMessage
    });
    toast.success("Messages saved!");
    setShowMessageModal(false);
  } catch (err) {
    toast.error("Failed to save messages");
  }
};
const handlefollowupMessages = async () => {
  try {
    await axiosInstance.post("/api/user-messages/follow-up", {
      id:msgId,
      follow_up_linkedin: linkedinsfolloup,
      follow_up_email: emailfollowup
    });
    toast.success("Messages saved!");
    setShowfolloupModal(false);
  } catch (err) {
    toast.error("Failed to save messages");
  }
};


const startcompain = async (compain) => {
  setLoading(false);
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
    let lid = Cookies.get('lid');
    let pass = userpass;

    let gtoken = gmail;
    let mstoken = outlook;

    

    let { id, channel, company_size, ideal_customer, sector,message_delay,
message_count
 } = compain;
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
          message_delay,message_count
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
          "/api/scrapemail",
          { body }
    
        );
      

      const {data} = response;

      if(!data.isSuccess){
        setLoading(true);
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
      setLoading(true);
      await toast.success("leads retrive successfully")
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
            message_delay,
            message_count
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
          { body }
        );
      

      const {data} = response;
      console.log(data);
      if(data?.status==true){
        setLoading(true);
        toast.success("Leads retrive successfully");
      }
     if(data?.status=="limit"){
        setLoading(false);
        stopcomapin(compain);
         toast.error("Linkedin Limit Exceed")
      }

      if(data?.status==false){
        setLoading(false); 
         stopcomapin(compain);
         deletetoken(lid);
         Cookies.remove("lid");
         Cookies.remove("user_token");
        toast.error("Linkedin Cookies Expire Please login Again");
      }
      
  

    fetchData();
   }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
           stopcomapin(compain);
          console.log("LinkedIn error:", err);
        }
      }
      
    } catch (err) {
      console.log("Error starting campaign:", err);
      stopcomapin(compain);
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
useEffect(() => {
  document.body.style.overflow = showMessageModal ? 'hidden' : 'auto';
}, [showMessageModal]);

  return (
    <div className="campaigns mb-4">
      <div className="d-heading-container d-flex flex-wrap justify-content-between mb-4">
        <h2 className="mb-0 fw-bold me-5 d-inline-block">Campaigns</h2>
                 <Button
                   onClick={handleOpenMessageModal}
                    className="btn-rounded me-3 ms-auto"
                    size="sm"
                  >
                    View Messages
                  </Button>
                 <Button
                   onClick={handleOpenfollowupModal}
                    className="btn-rounded me-3 "
                    size="sm"
                  >
                    View Follow up Messages
                  </Button>
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
              <th>daily limit/Pending</th>
              
              <th>Campaign Status</th>
              <th>Sequences in progress</th>
             
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
                <td>{campaign?.channel}</td>
                <td>{campaign?.total_leads}</td>
              <td>
  {campaign?.channel === 'Linkedin' ? `${campaign?.daily_limit}/100` : '-'}
</td>
                <td>{campaign?.campaign_status==="active"?'In process':'Stopped'}</td>
                <td>{campaign?.campaign_status}</td>
               
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

                  <Button onClick={()=>handledelete(campaign?.id)} className="btn-rounded me-3" size="sm">
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
      {showMessageModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    tabIndex="-1"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content text-light" style={{ backgroundColor: "#1e003e" }}>
        <div className="modal-header border-0">
          <h5 className="modal-title">Edit Default Messages</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowMessageModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <label className="form-label">LinkedIn Message</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinMessage}
              onChange={(e) => setLinkedinMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Message</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer border-0">
          <button className="btn btn-secondary btn-main" onClick={() => setShowMessageModal(false)}>Cancel</button>
          <button className="btn btn-primary btn-main" onClick={handleSaveMessages}>Save</button>
        </div>
      </div>
    </div>
  </div>
)}
      {showfollowModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    tabIndex="-1"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content text-light" style={{ backgroundColor: "#1e003e" }}>
        <div className="modal-header border-0">
          <h5 className="modal-title">Edit Default Messages</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowfolloupModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <label className="form-label">LinkedIn Message</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinsfolloup}
              onChange={(e) => setLinkedinfollowup(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Message</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={emailfollowup}
              onChange={(e) => setEmailfollowup(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer border-0">
          <button className="btn btn-secondary btn-main" onClick={() => setShowfolloupModal(false)}>Cancel</button>
          <button className="btn btn-primary btn-main" onClick={handlefollowupMessages}>Save</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Campaigns;
