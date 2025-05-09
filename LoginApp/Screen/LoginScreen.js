import React, { useEffect, useState } from 'react';
import { View, Text, Alert,ActivityIndicator, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { loginApi } from '../ApiRequest/loginRequest';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  paddingHorizontal: 20px;
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

const LoginScreen = ({ navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const msg = route.params?.msg;

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await loginApi(email, password);
    setIsLoading(false);

    if(response === 0){
      Alert.alert('Logowanie', 'Błędne dane logowania');
    }
    else{
        setEmail('');
        setPassword('');
        if(msg != null){
          route.params.msg = null;
        }

      navigation.replace("Home");
    }
  };

  return (
    <Container>
      <KeyboardAwareScrollView style={{width:'100%', width:'100%'}} contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingVertical:30+StatusBar.currentHeight}} showsVerticalScrollIndicator={false}>
      {(msg!= null)&&(
        <View style={{borderRadius:20,backgroundColor: 'rgba(27, 202, 56, 0.51)',padding:10,justifyContent:'center',alignItems:'center',width:'100%',marginBottom:10}}>
        <Text style={{color:"white",fontWeight:700,fontSize:16}}>{msg}</Text>
        </View>
      )}
      <MaterialIcons name="login" size={80} color="#6200ea" style={{ marginBottom: 20 }} />
      <Input 
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input 
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin}>
      {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText>Zaloguj się</ButtonText>
        )}
      </Button>
      
      <View style={{justifyContent:'flex-end',alignItems:'center',marginTop:50}}>
        <Text style={{fontSize:15,fontWeight:700,paddingBottom:10}}>Nie masz konta?</Text>
        <Button onPress={()=>{
          navigation.navigate("SignUp");
        }}>
          <ButtonText>Zarejestruj się !</ButtonText>
        </Button>
      </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LoginScreen;
