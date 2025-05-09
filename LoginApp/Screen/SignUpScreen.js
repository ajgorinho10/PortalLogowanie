import React, { useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,ActivityIndicator,FlatList ,StyleSheet,KeyboardAvoidingView, StatusBar,ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import { registerApi } from "../ApiRequest/registerReques";


const Container = styled.View`
  flex: 1.0;
  width:'100%';
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #fff;
  elevation: 3;
`;

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

export const SignUpScreen = ({navigation}) =>{

      const [login, setLogin] = useState('');
      const [password, setPassword] = useState('');
      const [firstName, setfirstName] = useState('');
      const [lastName, setlastName] = useState('');
      const [confirmPassword, setconfirmPassword] = useState('');


      const [isLoading, setIsLoading] = useState(false);

      const[error,setError] = useState('');

      const handleLogin = async () => {
        setIsLoading(true);
        const response = await registerApi(login, password,firstName,lastName,confirmPassword);
        setIsLoading(false);
    
        if(response.success == true){
          setLogin('');
          setPassword('');
          navigation.navigate('Login',{msg:"Utworzono użytkownika pomyślnie możesz się zalogować!"});
        }
        else{
            setError(response.Data);
            console.log(response.Data);
        }
      };

      const ErrorInfo = ({ tablica }) => {
        if (!tablica || tablica.length === 0) return null;
      
        return (
          <View style={{ width: '100%' }}>
            <FlatList
              data={tablica}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.errorItem}>• {item}</Text>
              )}
            />
          </View>
        );
      };

      const RegisterButton = () =>{
        return(
        <Button onPress={handleLogin}>
            {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
            <ButtonText>Zarejestruj się !</ButtonText>
            )}
        </Button>
        );
      };

    return(
    <Container>
        <MaterialIcons name="add" size={80} color="#6200ea" style={{ marginBottom: 20 }} />
        <KeyboardAvoidingView style={{width:'100%',flex:1,justifyContent:'center',alignItems:'center'}} behavior='padding'>
        <FlatList
        data={[{ id: '1'}]}
        keyExtractor={(item) => item.id}
        style={[{width:'100%'}]}
        showsVerticalScrollIndicator={false}
        renderItem={()=>(
        <View style={[{width:'100%'}]}>
            <ErrorInfo tablica={error?.FirstName} />
            <Input 
                placeholder="Imie"
                keyboardType="email-address"
                value={firstName}
                onChangeText={setfirstName}
            />

            <ErrorInfo tablica={error?.LastName} />
            <Input 
                placeholder="Nazwisko"
                keyboardType="email-address"
                value={lastName}
                onChangeText={setlastName}
            />

            <ErrorInfo tablica={error?.Login} />
            <Input 
                placeholder="Login"
                keyboardType="email-address"
                value={login}
                onChangeText={setLogin}
            />

            <ErrorInfo tablica={error?.Password} />
            <Input 
                placeholder="Hasło"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <ErrorInfo tablica={error?.ConfirmPassword} />
            <Input 
                placeholder="Potwiedź Hasło"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setconfirmPassword}
            />    
        </View>  
        )}/>
        <RegisterButton/>
        </KeyboardAvoidingView>

        <View style={{width:'50%',paddingTop:150}}>
            <Button onPress={()=>{
            navigation.replace("Login");
            }}>
            <ButtonText>Zaloguj się!</ButtonText>
            </Button>
        </View>

    </Container>
    );

};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
  },
  errorItem: {
    color: 'Black',
    fontSize: 16,
    marginVertical: 2,
  },
});