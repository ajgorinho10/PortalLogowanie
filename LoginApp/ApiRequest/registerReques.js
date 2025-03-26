import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const registerApi = async (username,pass) => {

    const apiUrl = "https://api.fwapi.duckdns.org/User";

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
      return odp;

  } catch (error) {
      console.error("Error fetching user data:", error);
      const tmp = {success:false,message:"Brak połączenia z serwerem",data:null};
      return tmp;
  }

};

