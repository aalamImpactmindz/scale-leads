import axiosInstance from "../axiosInstance";
export const userLogin = async(payload)=>{
    try{
       let response = await axiosInstance.post("/api/login",payload);
       return response.data;
    }catch(err){
        console.log(err)
    }

}

export const userRegister = async(payload)=>{
    try{
        let response = await axiosInstance.post("/api/register",payload);
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const paymentlink = async(payload)=>{

  try{
    let reponse = await axiosInstance.post("/checkout-session",payload);
    return reponse.data;
  }catch(err){
    console.log(err)
  }

}