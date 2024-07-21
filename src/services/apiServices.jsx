import axios from "axios";

export const callDashGetMethod = async (url) => {
    return await axios.get(url, { headers: getHeaders() });
};

const getHeaders=()=>{ 
    let headers = {};
    headers = {
      "Content-Type":"application/json",
    
    };
    return headers;
}