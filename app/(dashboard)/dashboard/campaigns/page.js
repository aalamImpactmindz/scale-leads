
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
import { AuthContext } from "@/app/context/Authcontext";
import { useContext } from "react";
import all from '../../../../public/assets/images/mark.png';
import day from '../../../../public/assets/images/24-hours.png';
import Image from "next/image";
import {
faPlayCircle,
faPauseCircle,
faTrashAlt,

 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const [linkedinsfolloup2, setLinkedinfollowup2] = useState('');
const [linkedinsfolloup3, setLinkedinfollowup3] = useState('');
const[emailfollowup,setEmailfollowup] = useState('');
const[emailfollowup2,setEmailfollowup2] = useState('');
const[emailfollowup3,setEmailfollowup3] = useState('');
const[msgId,setmsgid] = useState('');

const {active,setactive} = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/user-campaigns");
      setCampaigns(response.data.campaigns || []);
    } catch (err) {
    
      setError("Aucune campagne trouvée");
    } finally {
      setLoading(false);
    }
  };


const handledelete = async(id)=>{
  try{
       let resp = await axiosInstance.delete(`/api/campaigns/${id}`);
       const{data} =resp;
    if(data?.status){
      toast.success("La campagne et ses prospects ont été supprimés");
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
    //followup one
    let followupjson = JSON.parse(data?.data?.follow_up_linkedin);
     
    setLinkedinfollowup(followupjson?.option1 || '');
    setLinkedinfollowup2(followupjson?.option2 || '');
    setLinkedinfollowup3(followupjson?.option3 || '');
    let followupemail = JSON.parse(data?.data?.follow_up_email);
    setEmailfollowup(followupemail?.option1 ||'')
    setEmailfollowup2(followupemail?.option2 ||'')
    setEmailfollowup3(followupemail?.option3 ||'')
  } catch (err) {
    toast.error("Impossible de charger les messages");
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
    toast.success("Messages enregistrés !");
    setShowMessageModal(false);
  } catch (err) {
    toast.error("Impossible d'enregistrer les messages");
  }
};
const handlefollowupMessages = async () => {
  let linkedinsfolloups={
    option1:linkedinsfolloup,
    option2:linkedinsfolloup2,
    option3:linkedinsfolloup3
  }
  let emailfollowups={
    option1:emailfollowup,
    option2:emailfollowup2,
    option3:emailfollowup3

  }
  try {
    await axiosInstance.post("/api/user-messages/follow-up", {
      id:msgId,
      follow_up_linkedin: linkedinsfolloups,
      follow_up_email: emailfollowups
    });
    toast.success("Messages enregistrés !");
    setShowfolloupModal(false);
  } catch (err) {
    toast.error("Impossible d'enregistrer les messages");
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
 
     
  
    try {
      if (channel === "Email") {
     
        if (!gmail) {
      toast.warn("Pour commencer, connectez-vous en premier")
      
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
     setactive(true);
     await toast.success("La campagne démarre avec succès")
     let response =    await scrapInstance.post(
          "/api/scrapemail",
          { body }
    
        );
      

      const {data} = response;

      if(!data.isSuccess){
        setLoading(true);
         await toast.warn("Outlook Token a expiré, veuillez vous reconnecter !");
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
      await toast.success("les leads récupèrent avec succès")
    }
    fetchData();
   }
  
      }

      if (channel === "Linkedin") {
           if (!linkedin) {
      toast.warn("Pour commencer, connectez-vous en premier")
      
      return;
    }
        if(compain?.automatic_campaign===false){
         let response = await axiosInstance.patch(
        `api/campaign/${id}/status`,
        {
          campaign_status: "active",
        }
      );
       fetchData();
        }
        else{
              try {
           
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
          setactive(true);
           fetchData();
          await toast.success("Entretenir Démarrer avec succès")
         
     let response =    await scrapInstance.post(
          "/api/scrap",
          { body },
          { timeout: 30 * 60 * 1000 }
        );
      

      const {data} = response;

      if(data?.status==true){
        setLoading(true);
        toast.success("Les leads récupèrent avec succès");
      }
     if(data?.status=="limit"){
        setLoading(false);
        stopcomapin(compain);
         toast.error("Dépassement de la limite Linkedin")
      }

      if(data?.status==false){
        setLoading(false); 
         stopcomapin(compain);
         deletetoken(lid);
         Cookies.remove("lid");
         Cookies.remove("user_token");
        toast.error("Les cookies Linkedin expirent Veuillez vous reconnecter");
      }
      
  

    fetchData();
   }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
    
    
       if(err.status===429){
       stopcomapin(compain);
      toast.warn("Trop de demandes, veuillez réessayer après 24 heures")
    }
          setIsLoading(false);

      
        }
        }
      }
      
    } catch (err) {
      console.log("Error starting campaign:", err);
     
      toast.error("Une seule plainte à la fois")
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
      setactive(false);
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
        setactive(false);
        await toast.success("Compain arrêté avec succès");
      }
     }
     if(channel==="Linkedin"){
      let stopcompain = await scrapInstance.post("/api/pausescrap", {
        id: id,
      });
      const{data}  =stopcompain;
      if(data?.isSuccess){

        setactive(false);
        await toast.success("Compain arrêté avec succès");
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
  const handleroutes = async(campaign)=>{
    try{
        if(campaign.automatic_campaign===false){
           router.push(`/dashboard/allleads/${campaign?.id}?channel=${campaign?.channel}`)
        }
        if(campaign.automatic_campaign===true){
          router.push(`/dashboard/leads/${campaign?.id}?channel=${campaign?.channel}`)
        }
    }catch(err){ 
      console.log(err);
    }
  }
  //view leads
useEffect(() => {
  document.body.style.overflow = showMessageModal ? 'hidden' : 'auto';
}, [showMessageModal]);

  return (
    <div className="campaigns mb-4">
      <div className="d-heading-container d-flex flex-wrap justify-content-between mb-4">
        <h2 className="mb-0 fw-bold me-5 d-inline-block">Toutes les campagnes</h2>
                 <Button
                   onClick={handleOpenMessageModal}
                    className="btn-rounded me-3 ms-auto"
                    size="sm"
                  >
                    Afficher les messages
                  </Button>
                 <Button
                   onClick={handleOpenfollowupModal}
                    className="btn-rounded me-3 "
                    size="sm"
                  >
                   Voir les messages de suivi
                  </Button>
        <Link href="/dashboard/onboarding">
          <Button className="btn-rounded" size="sm">
          Ajouter une nouvelle campagne
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Chargement des campagnes...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="px-3 py-2 small">
          {error}
        </Alert>
      ) : campaigns.length === 0 ? (
        <p className="text-center py-5">Aucune campagne trouvée.</p>
      ) : (
        <Table striped hover responsive className="mb-0 small">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nom de la campagne</th>
              <th>Canaux cibles</th>
              <th>Nombre de prospects</th>
              <th>limite journalière/En attente</th>
              
              <th>Statut de la campagne</th>
              <th>Type de campagne</th>
              <th>Dernière action</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tablestyle">
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
               <td>
  {campaign?.channel === "Linkedin" && campaign?.automatic_campaign===false
    ? (campaign?.total_leads > 15 ? 15 : campaign?.total_leads || 0)
    : campaign?.channel === "Email"
    ? campaign?.total_leads || 0
    : 0}
</td>



           <td>
  {campaign?.channel === 'Linkedin' && campaign?.automatic_campaign===false
    ? `${campaign?.daily_limit > 15 ? 15 : campaign?.daily_limit || 0}/25`
    : campaign?.channel === 'Email'
    ? `${campaign?.daily_limit || 0}/50`
    : '-'}
</td>
                <td>{campaign?.campaign_status==="active"?'actif':'en pause'}</td>
                <td>{campaign?.automatic_campaign===true?'automatique':'manuel'}</td>
                 <td>{new Date(campaign?.latest_updated_at).toLocaleString()}</td>

               
                        <td>
                                 {campaign.campaign_status === "active" ? (
                                   <Button title="Arrêter"
                                     onClick={() => stopcomapin(campaign)}
                                     className="btn-eyerounded me-3"
                                     size="sm"
                                   >
                                    <FontAwesomeIcon style={{transform:'rotate(0deg)',color:'black',width:'24px',height:'24px'}} icon={faPauseCircle}></FontAwesomeIcon>
                                   </Button>
                                 ) : (
                                   <>
                                     <Button title ="Démarrer"
                                       onClick={() => startcompain(campaign)}
                                       className="btn-eyerounded me-3"
                                       size="sm"
                                     >
                                      <FontAwesomeIcon style={{transform:'rotate(0deg)',color:'green',width:'24px',height:'24px'}} icon={faPlayCircle}></FontAwesomeIcon>
                                     </Button>
                                   </>
                                 )}
                   {campaign.automatic_campaign===false &&(
                        <Button title="aujourd'hui, perspectives"
                                   onClick={() =>
                                     router.push(`/dashboard/manual/${campaign?.id}?channel=${campaign?.channel}`)
                                   }
                                   className="btn-eyerounded me-3"
                                   size="sm"
                                 >
                                   <Image alt="aujourd'hui, perspectives" src={day} width={30} height={30}></Image>
                                 </Button>
                   )}
                            
                                 <Button title="toutes perspectives"
                                   onClick={() =>handleroutes(campaign) }
                                   className="btn-eyerounded me-3"
                                   size="sm"
                                 >
                                  <Image alt="toutes perspectives"  src={all} width={30} height={30}></Image>
                                 </Button>
                                 
                                 <Button title="Supprimer" onClick={()=>handledelete(campaign?.id)} className="btn-eyerounded me-3" size="sm">
                               <FontAwesomeIcon style={{transform:'rotate(0deg)',color:'#d74a4af0',width:'22px',height:'22px'}} icon={faTrashAlt}></FontAwesomeIcon>
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
          <h5 className="modal-title">Modifier les messages par défaut</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowMessageModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <label className="form-label">Message LinkedIn</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinMessage}
              onChange={(e) => setLinkedinMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Message par e-mail</label>
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
          <button className="btn btn-secondary btn-main" onClick={() => setShowMessageModal(false)}>
Annuler</button>
          <button className="btn btn-primary btn-main" onClick={handleSaveMessages}>Enregistrer</button>
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
          <h5 className="modal-title">Modifier les messages par défaut</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowfolloupModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <label className="form-label">Linkedin-followup-1</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinsfolloup}
              onChange={(e) => setLinkedinfollowup(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label">Linkedin-followup-2</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinsfolloup2}
              onChange={(e) => setLinkedinfollowup2(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label">Linkedin-followup-3</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={linkedinsfolloup3}
              onChange={(e) => setLinkedinfollowup3(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Email-suivi-1</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={emailfollowup}
              onChange={(e) => setEmailfollowup(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Email-suivi-2</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={emailfollowup2}
              onChange={(e) => setEmailfollowup2(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Email-suivi-3</label>
            <textarea
              className="form-control"
              rows="6"
              style={{ backgroundColor: "#2d0350", color: "white" }}
              value={emailfollowup3}
              onChange={(e) => setEmailfollowup3(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer border-0">
          <button className="btn btn-secondary btn-main" onClick={() => setShowfolloupModal(false)}>Annuler</button>
          <button className="btn btn-primary btn-main" onClick={handlefollowupMessages}>Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Campaigns;
