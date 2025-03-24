import axios from "axios";

const apiUrl = "https://api.fwapi.duckdns.org/User";

export const Request = async ({token}) => {

    try{
        const response = await axios.post(apiUrl, {
            headers: {
              "accept": "text/plain",
              "Authorization": `Bearer ${token}`
            },
          });

        console.log("Odp:",response.data);
    }catch(error){

    }
};