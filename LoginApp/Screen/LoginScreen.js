import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,ActivityIndicator  } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { loginApi } from '../ApiRequest/loginRequest';

const Container = styled.View`
  flex: 1;
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

const LoginScreen = ({ navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await loginApi(email, password);
    setIsLoading(false);

    if(response == '0'){
      Alert.alert('Logowanie', 'Błędne dane logowania');
    }
    else{
        setEmail('');
        setPassword('');
      navigation.navigate('Home');
    }
  };

  return (
    <Container>
      <MaterialIcons name="lock-outline" size={80} color="#6200ea" style={{ marginBottom: 20 }} />
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
    </Container>
  );
};

export default LoginScreen;
