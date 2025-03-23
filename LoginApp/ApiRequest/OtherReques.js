import axios from "axios";

const apiUrl = "http://10.0.2.2:5273/User";

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