import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const loginApi = async (username,pass) => {

    const apiUrl = "https://api.fwapi.duckdns.org/User/login";

    try {
      const requestData = {
        login: username,
        password: pass
      };
  
      // Wywołanie zapytania POST z danymi w body
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          "accept": "text/plain",
        },
      });

      const odp = response.data;
      if(odp.success === true){
        await saveApiKey(odp.data,username,pass);
        return odp.data;
      }
      else{
        return "0";
      }

  } catch (error) {
      console.error("Error fetching user data:", error);
  }

};

async function saveApiKey(apiKey,name,pass) {
  await SecureStore.setItemAsync('api_key', apiKey, { secure: true });
  await SecureStore.setItemAsync('login', name, { secure: true });
  await SecureStore.setItemAsync('password', pass, { secure: true });
}
