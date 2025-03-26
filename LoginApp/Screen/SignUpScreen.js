import React, { useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,ActivityIndicator  } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const[error,setError] = useState('');

      const scrollViewRef = useRef(null);

      const handleFocus = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      };

      const handleLogin = async () => {
        setIsLoading(true);
        const response = await registerApi(email, password);
        setIsLoading(false);
    
        if(response.success == true){
          setEmail('');
          setPassword('');
          navigation.navigate('Login',{msg:"Utworzono użytkownika pomyślnie możesz się zalogować!"});
        }
        else{
            setError(response.message);
        }
      };

    return(
<KeyboardAwareScrollView style={{width:'100%', flex:1.0,backgroundColor:'#f5f5f5'}} contentContainerStyle={{justifyContent:'center',alignItems:'stretch',paddingVertical:50}} showsVerticalScrollIndicator={false}
    ref={scrollViewRef} 
>
    <Container>
        <MaterialIcons name="add" size={80} color="#6200ea" style={{ marginBottom: 20 }} />
        {(error==='Nie prawidłowe hasło')&&(
            <View style={{borderRadius:20,backgroundColor: 'rgba(252, 0, 0, 0.51)',padding:10,width:'70%',justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:-20}}>
                <Text style={{color:"white",fontWeight:700,fontSize:16}}>{error}</Text>
                <Text style={{color:"white",fontWeight:500,fontSize:14}}>Hasło powinno zawierać:</Text>
                <View>
                    <Text style={{color:"white",fontWeight:500,fontSize:14}}>min. 8 znaków</Text>
                    <Text style={{color:"white",fontWeight:500,fontSize:14}}>min. 1 cyfre</Text>
                    <Text style={{color:"white",fontWeight:500,fontSize:14}}>min. 1 duży znak</Text>
                </View>
            </View>
        )}
        {((error==='Nie prawidłowy login'))&&(
            <View style={{borderRadius:20,backgroundColor: 'rgba(252, 0, 0, 0.51)',padding:10,width:'70%',justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:-20}}>
                <Text style={{color:"white",fontWeight:700,fontSize:16}}>{error}</Text>
                <Text style={{color:"white",fontWeight:500,fontSize:14}}>Login powinien zawierać:</Text>
                <Text style={{color:"white",fontWeight:500,fontSize:14}}>min. 8 znaków</Text>
            </View>
        )}
        {((error==='Podany Login już istnieje'))&&(
            <View style={{borderRadius:20,backgroundColor: 'rgba(252, 0, 0, 0.51)',padding:10,width:'70%',justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:-20}}>
                <Text style={{color:"white",fontWeight:700,fontSize:16}}>{error}</Text>
            </View>
        )}
        <Input 
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={handleFocus}
        />
        <Input 
            placeholder="Hasło"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={handleFocus}
        />
        <Button onPress={handleLogin}>
        {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
            <ButtonText>Zarejestruj się !</ButtonText>
            )}
        </Button>

        <View style={{width:'50%',paddingTop:150}}>
            <Button onPress={()=>{
            navigation.replace("Login");
            }}>
            <ButtonText>Wyloguj się!</ButtonText>
            </Button>
        </View>

    </Container>
</KeyboardAwareScrollView>
    );

};