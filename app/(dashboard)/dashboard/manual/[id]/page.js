"use client";

import React from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useRouter,useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { use } from "react";
import { deleteleads, deletelist, validatelist } from "@/utils/service/userlogin";
import { toast } from "react-toastify";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
 faTrash
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import scrapInstance from "@/utils/scrapeInstace";
const PageDLeads = ({params}) => {
   const { id} = use(params); 
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query params
  const channel = searchParams.get("channel"); // Read `channel`

  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const[compaigndata,setcompaigndata] = useState();
  const [loading, setLoading] = useState(true);
  const [showloader,setloader]=useState(false);
  const [allleads,setallleads] = useState([]);
  const[validate,setvalidate] = useState(false);
const[errormessage,seterrormessage] = useState('Aucune piste trouvée.')
  const fetchData = async () => {
    try {
      if(channel=="Email"){
  const response = await axiosInstance.get(`/api/campaign/${id}/leads`);

   const {data} =response; 
   
   if(data?.status){
   

 setLeads((data?.leads || []).slice(0, 15)) 
 
   }
      }
      if(channel=="Linkedin"){
         const response = await axiosInstance.get(`/api/linkedin/leads?campaign_id=${id}`);
     
   const {data} =response; 

   if(data?.status){
setallleads(data?.leads || []);
setLeads((data?.leads || []).slice(0, 15))

setcompaigndata(data?.campain_status);


}
      }
    
     
      
    } catch (err) {
      console.log("Error fetching leads:", err);
      setError("Could not load Leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (lead) => {

   window.open(lead.url, '_blank'); 
    
  };

  const handledelete=async(lead)=>{
    try{
        let response = await deleteleads(lead?.id);
        if(response?.status===true){
            await toast.success("Plomb supprimé avec succès")
            setLeads(prev => prev.filter(item => item.id !== lead.id));
            fetchData()

        }
        else{
          await toast.warn("vous dépassez votre limite essayez après 24 heures")

        }

      
    }catch(err){
        console.log(err)
    }
  }
  const handlevalidate =async()=>{
  setvalidate(true);
    
    try{
  const profileLinks = leads.map((lead) => ({
      link: lead.url,
      type: lead.type,
      id:lead.id,
      campaignid:lead?.campaign_id,
    
    }));

  let data = {
    cid:leads[0]?.campaign_id,
    links:profileLinks
  }
  const response = await validatelist(data);
if(response.status==429){
  setvalidate(false);
   toast.warn("Trop de demandes, veuillez réessayer après 24 heures")
}
    }catch(err){
      setvalidate(false);
      console.log(err);
     
    }
  }


  
  const handlegenerate = async()=>{
  
    setloader(true);
     seterrormessage('générer de nouveaux leads')
   try{
  const list_ids = allleads.map(lead => lead.id);

let payload = { list_ids };

let deleteresponse = await deletelist(payload);
if(deleteresponse.status===true){
 fetchData();
}
let startingpage = Math.floor(Math.random() * 50) + 1;



 let {id,company_size,
            ideal_customer,
            sector,
            message_delay,
            message_count,automatic_campaign
          }=compaigndata;

  let body = {
    id,company_size,ideal_customer,sector,message_delay,message_count,automatic_campaign,startingpage
  }
   let response = await scrapInstance.post(
          "/api/regeneratelist",
          { body },
          { timeout: 30 * 60 * 1000 }
        );
      
     
      const {data} = response;
      
      if(data.status===true){
      setloader(false);
        fetchData();
      }
      if(data.status===false){
         setloader(false);
      }
  
   }catch(err){
    
    
    if(err.status===429){
      setloader(false);
      toast.warn("Trop de demandes, veuillez réessayer après 24 heures")
    }
   }


  }
  return (
    <div className="leads mb-4">
      <h2 className="mb-4 fw-bold">Dirigeants</h2>
     
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Chargement des câbles...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="px-3 py-2 small">
          {error}
        </Alert>
      ) : leads.length === 0 ? (
        <Alert variant="warning" className="px-3 py-2 small">
          {errormessage}
        </Alert>
      ) : (
        <Table striped hover responsive className="mb-0 small">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nom du lead</th>
              <th>Source</th>
              <th>Dernière action</th>
              <th>Demande de connexion</th>
          
              <th>Répondit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lead.name}</td>
                <td>{lead.source==='gmail' || lead.source==='outlook' ?'Email':'Linkedin'}</td>
                   <td>{new Date(lead?.updated_at).toLocaleString()}</td>

                <td>{lead?.emailsend ==1 || lead?.connection_request ?'Envoyée':'Échoué'}</td>
                <td>{lead.replied === false ? "Aucune" : "Oui"}</td>
                <td>
                  <Button
                    className="btn-eyerounded"
                    size="sm"
                    onClick={() => handleEditClick(lead)}
                  >
                    
<FontAwesomeIcon style={{transform:'rotate(0deg)',color: '#401557'}} icon={faEye}></FontAwesomeIcon>
                  </Button>
                  <Button
                    className="btn-eyerounded"
                    size="sm"
                    onClick={() => handledelete(lead)}
                  >
                    
<FontAwesomeIcon style={{transform:'rotate(0deg)',color: '#d74a4af0'}} icon={faTrash}></FontAwesomeIcon>
       </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="text-end mt-3 ">
        <button   onClick={handlevalidate} className="text-white btn-rounded me-2">
      Valider la liste
        </button>
        <button onClick={handlegenerate} className="text-white btn-rounded">
          
Générer une nouvelle liste
        </button>
      </div>

      {showloader &&(
  <div id="loader-overlay">    
<div id="wifi-loader">
    <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Generating"></div>
</div>
</div>
)}

{validate && (
  <div id="loader-overlay">
<div class="spinners">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
)}
    </div>
    
  );
};

export default PageDLeads;
