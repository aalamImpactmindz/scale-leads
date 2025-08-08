"use client"
import { cancelSubscription, deleteaccount } from '@/utils/service/userlogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
const PageDSettings = () => {
  let router = useRouter();
  const handleDeleteAccount = async() => {
    try{
      let deleteacc = await deleteaccount();
      const {status}  = deleteacc;
     if(status){
       Cookies.remove("authToken");
       toast.success("Supprimé avec succès");
      router.push('/');
     }

    
    }
    catch(err){
      toast.error("Not found");
    }
  }

  const handleCancelSubscription = async() => {
    try{
    let res = await cancelSubscription();
    const {cancel_at_period_end} = res;
    if(cancel_at_period_end){
      toast.success("L'abonnement sera annulé à la fin de la période en cours");
    }


    }catch(err){
      console.log(err);
    }
  // toast.success('Subscription cancellation initiated.')
  }

  return (
    <div className="container text-white ">
      <h2 className="fw-semibold mb-4">Paramètres du compte</h2>

      <div className="d-flex  gap-3" >
        <button
          onClick={handleCancelSubscription}
          className="btn flex-1 custom-subscription-btn"
        >
           <FontAwesomeIcon icon={faBan} className="me-2 buttontransform" />
          Annuler mon abonnement
        </button>

        <button
          onClick={handleDeleteAccount}
          className="btn flex-1 custom-delete-btn"
        >  <FontAwesomeIcon icon={faTrash} className="me-2 buttontransform" />
          Supprimer mon compte


        </button>
      </div>
    </div>
  )
}

export default PageDSettings
