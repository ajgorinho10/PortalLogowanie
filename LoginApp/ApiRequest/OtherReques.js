import axios from "axios";
import { getUserKey,renewApiKey } from "./RenewApiKey";

const apiUrl = "https://api.fwapi.duckdns.org/User";

export const Request = async () => {

    try{

        const token = await getUserKey();
        const response = await axios.get(apiUrl, {
            headers: {
              "accept": "text/plain",
              "Authorization": `Bearer ${token}`
            },
          });

        
        return response.data;
    }catch(error){
        console.log("Token wygasł");
        const response = await renewApiKey();
        if(response == true){
          console.log("uzyskano nowy token");
          return await Request();
        }
        else{
          console.log("Błąd nowy token");
          return null;
        }
    }
};