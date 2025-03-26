import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';


import styled from 'styled-components/native';

import { getUserName,getUserPassword,getUserKey,delUserKey } from '../ApiRequest/RenewApiKey';
import { StatusBar } from 'react-native';

const Button = styled.TouchableOpacity`
  background-color: #6200ea;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Home = ({ navigation }) => {
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const userName = await getUserName();
            const userPassword = await getUserPassword();
            const userKey = await getUserKey();
            if (userName) {
                setName(userName);
                setPassword(userPassword);
                setKey(userKey);
            } else {
                setName("Brak użytkownika");
            }
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };

    return (
        <View style={[styles.container,{paddingTop:StatusBar.currentHeight}]}>
            <Text style={[styles.text]}>Informacje o użytkowniku</Text>

        <View style={{flexDirection: 'column',justifyContent:'center',alignItems:'flex-start',marginTop:20,width:'80%'}}>
            <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.text}>Urzytkownik: </Text>
                <Text>{Name}</Text>
            </View>

            <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.text}>Hasło: </Text>
                <Text>{password}</Text>
            </View>

            <View style={{flexDirection: 'row',justifyContent:'flex-start',alignItems:'flex-start',width:'60%'}}>
                <Text style={styles.text}>Klucz: </Text>
                <Text>{key}</Text>
            </View>
        </View>

        <View style={{width:'50%',paddingTop:20}}>
            <Button onPress={()=>{
            delUserKey();
            navigation.replace("Login");
            }}>
            <ButtonText>Wyloguj się!</ButtonText>
            </Button>
        </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:'100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;