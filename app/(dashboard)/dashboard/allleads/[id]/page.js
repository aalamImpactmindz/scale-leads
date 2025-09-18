"use client";

import React from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useRouter,useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { use } from "react";
import { deleteleads, validatelist } from "@/utils/service/userlogin";
import { toast } from "react-toastify";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
 faTrash
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
const PageDLeads = ({params}) => {
   const { id} = use(params); 
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query params
  const channel = searchParams.get("channel"); // Read `channel`

  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if(channel=="Email"){
  const response = await axiosInstance.get(`/api/campaign/${id}/leads`);
   const {data} =response; 
   if(data?.status){
 setLeads(data?.leads || []) 
   }
      }
      https://impactmindz.in/client/scaleleads/api/linkedin/connect-leads?campaign_id=183
      if(channel=="Linkedin"){
         const response = await axiosInstance.get(`/api/linkedin/connect-leads?campaign_id=${id}`);
      
     
   const {data} =response; 

   if(data?.status){
setLeads(data?.leads);

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

      
    }catch(err){
        console.log(err)
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
          Aucune piste trouvée.
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
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    
    </div>
  );
};

export default PageDLeads;
