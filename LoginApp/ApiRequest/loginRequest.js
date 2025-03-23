import axios from "axios";

export const loginApi = async (username,pass) => {

    const apiUrl = "http://10.0.2.2:5273/User/login";

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
        return odp.data;
      }
      else{
        return "0";
      }

  } catch (error) {
      console.error("Error fetching user data:", error);
  }

};
