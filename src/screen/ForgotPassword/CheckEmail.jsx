import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';

const CheckEmail = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleResetPassword = () => {
      setIsLoading(true);
      // Send a password reset request to the API
      axios
        .put('http://192.168.157.212:9080/account/change-password', { userEmail })
        .then(response => {
          // Handle success, e.g., show a success message or navigate to a confirmation screen
          console.log('Password reset request successful');
        })
        .catch(error => {
          // Handle error, e.g., display an error message
          console.error('Error occurred during password reset request:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    return (
      <View>
        <TextInput
          placeholder="Email"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          disabled={isLoading || !userEmail}
        />
          <Button title='Go to Login Page' onPress={()=> (navigation.navigate('Login'))} />

      </View>
    );
  };
  
  export default CheckEmail;
  