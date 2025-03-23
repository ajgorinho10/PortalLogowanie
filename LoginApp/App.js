import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {loginApi}from './ApiRequest/loginRequest';

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [Key, setKey] = useState('');

  const handleLogin = async () => {
    try{
      const apiKey = await loginApi(username, password);
      await setKey[apiKey];

    }catch(error){
      console.log(error);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie </Text>

      <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Zaloguj" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
