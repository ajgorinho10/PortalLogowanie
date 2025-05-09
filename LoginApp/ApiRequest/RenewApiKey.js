import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const renewApiKey = async () => {
    
    const apiUrl = "https://api.fwapi.duckdns.org/User/login";

    try{
        const login = await SecureStore.getItemAsync('login');
        const password = await SecureStore.getItemAsync('password');
        const requestData = {
            login: login,
            password: password
        };

        const response = await axios.post(apiUrl, requestData, {
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain",
            },
        });

        if(response.data.success === true){
            await SecureStore.setItemAsync('api_key', response.data.token, { secure: true });
            return response.data.data;
        }else{
            return "0";
        }

    }catch(error){
        console.error("Error fetching user data:", error);
    }
};

export const getUserName = async () => {
    const username = await SecureStore.getItemAsync('login');
    if (username) {
        return username;
    } else {
        console.error("Login not found in SecureStore");
        return null;
    }
};

export const getUserPassword = async () => {
    const username = await SecureStore.getItemAsync('password');
    if (username) {
        return username;
    } else {
        console.error("Password not found in SecureStore");
        return null;
    }
};

export const getUserKey = async () => {
    const username = await SecureStore.getItemAsync('api_key');
    if (username) {
        return username;
    } else {
        console.error("Key not found in SecureStore");
        return null;
    }
};

export const delUserKey = async()=>{
      await SecureStore.setItemAsync('api_key', null, { secure: true });
      await SecureStore.setItemAsync('login', null, { secure: true });
      await SecureStore.setItemAsync('password', null, { secure: true });
}