import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const loginApi = async (username,pass) => {

    const apiUrl = "https://api.fwapi.duckdns.org/Auth/login";

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
      //console.log("Odpowiedz logowanie",odp);
      if(odp.success === true){
        await saveApiKey(odp.token,username,pass);
        return odp.data;
      }
      else{
        return 0;
      }

  } catch (error) {
      console.error("Error fetching user data:", error);
      return 0;
  }

};

async function saveApiKey(apiKey,name,pass) {
  await SecureStore.setItemAsync('api_key', apiKey, { secure: true });
  await SecureStore.setItemAsync('login', name, { secure: true });
  await SecureStore.setItemAsync('password', pass, { secure: true });
}
