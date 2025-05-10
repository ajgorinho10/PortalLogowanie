import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const renewApiKey = async () => {
    
    const apiUrl = "https://api.fwapi.duckdns.org/Auth/token";

    try{
        const token = await getUserKey();
        const refresh = await getRefreshKey();

        const requestData = {
            accessToken: token,
            refreshToken: refresh
        };

        const response = await axios.post(apiUrl, requestData, {
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain",
            },
        });

        if(response.status === 200){
            console.log("nowy Token",response.data.token);
            await SecureStore.setItemAsync('api_key', response.data.token, { secure: true });
            return true;
        }else{
            delUserKey();
            return false;
        }

    }catch(error){
        delUserKey();
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

export const getRefreshKey = async () => {
    const username = await SecureStore.getItemAsync('refresh_token');
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
      await SecureStore.setItemAsync('refresh_token', null, { secure: true });
}