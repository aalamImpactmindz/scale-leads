import axios from "axios";
import axiosInstance from "../axiosInstance";
import scrapInstance from "../scrapeInstace";

export const userLogin = async (payload) => {
  try {
    let response = await axiosInstance.post("/api/login", payload);

    return response.data;
  } catch (err) {
   return err.response?.data;
  }
};
//user registeration
//new registration
export const userRegister = async (payload) => {
  try {
    let response = await axiosInstance.post("/api/register", payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const paymentlink = async (payload) => {
  try {
    let reponse = await axiosInstance.post("/checkout-session", payload);
    return reponse.data;
  } catch (err) {
    console.log(err);
  }
};

export const userOnboardingForm = async (payload) => {
  try {
    let response = await axiosInstance.post("/api/profile", payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserOnboardingForm = async (id, payload) => {
  try {
    let response = await axiosInstance.put(`/api/profiles/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


export const resetpassword  = async(email)=>{
 
  try{
       const response = await scrapInstance.post('/api/resetpassword',{email});
       return response.data;
  }catch(err){
    console.log(err)
  }

}

export const newpassword = async(data)=>{
  const{email,password,password_confirmation}  = data;
  try{
   const res = await axiosInstance.post('/api/update-password',{
    email,
    password,
    password_confirmation
   })
   return res.data;
  }catch(err){ 
    console.log(err);
  }
}


export const dashboardstats = async()=>{
  try{
     const res = await axiosInstance.get('/api/stats');
     return res.data;
  }catch(err){
    console.log(err);
  }
}

export const deleteaccount = async()=>{
  try{
  const response = await axiosInstance.delete('/api/delete-account');
  return response.data;
  }catch(err){ 
    console.log(err);
  }
}
export const cancelSubscription = async()=>{
  try{
    const response = await axiosInstance.post('/api/subscription/cancel');
    return response.data;

  }catch(err){
   return err.response?.data;
  }
}

export const deleteleads = async(id)=>{
  try{
      const response = await axiosInstance.delete(`/api/linkedin-leads/${id}`);
      return response?.data
  }catch(err){
    return err.response?.data;
  }
}
export const musercampaigns = async(id)=>{
  try{
      const response = await axiosInstance.get(`/api/musers-campaigns`);
      return response?.data
  }catch(err){
    return err.response?.data;
  }
}


export const validatelist = async(payload)=>{

  try{
     const response = await scrapInstance.post(`/api/sendrequest`,payload);
     return response?.data;
  }catch(err){
    return err?.response?.data
  }
}
export const deletelist = async(payload)=>{

  try{
     const response = await axiosInstance.post(`/api/bulk-linkedin-leads`,payload);
     return response?.data;
  }catch(err){
    return err?.response?.data
  }
}

