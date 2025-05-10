import axios from "axios";
import { getUserKey,renewApiKey } from "./RenewApiKey";

const apiUrl = "https://api.fwapi.duckdns.org/Auth/logout";

export const logOutRequest = async () => {

    try{

        const token = await getUserKey();
        const response = await axios.post(apiUrl, null,{
            headers: {
              "Authorization": `Bearer ${token}`
            },
          });

        
        return;
    }catch(error){
        console.log("Token wygasł",error?.response?.data);
        const response = await renewApiKey();
        if(response == true){
          console.log("uzyskano nowy token");
          return await logOutRequest();
       }
       else{
         console.log("Błąd nowy token");
         return null;
        }
    }
};