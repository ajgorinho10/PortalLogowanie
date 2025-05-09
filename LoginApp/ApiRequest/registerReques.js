import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const registerApi = async (username, pass, firstName, lastName, confirmPassword) => {
  const apiUrl = "https://api.fwapi.duckdns.org/Auth/register";

  try {
    const requestData = {
      firstName: firstName,
      lastName :lastName,
      login: username,
      password: pass,
      confirmPassword : confirmPassword,
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        "accept": "text/plain",
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error during registration:", error?.response?.data || error.message);

    // Możesz zwrócić bardziej kontrolowaną odpowiedź
    return error?.response?.data || {success: false}
  }
};

