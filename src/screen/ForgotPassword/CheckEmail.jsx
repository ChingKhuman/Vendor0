import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../constants/Config';
import { Alert } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const CheckEmail = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleResetPassword = () => {
      setIsLoading(true);
      // Send a password reset request to the API
      axios
        .post('http://192.168.0.163:9902/account/reset-password-initiate', { userEmail })
        .then(response => {
          let dat = response.data
          {if (dat.code === 400) {
            Alert.alert("User Not Register")
            
          } else {
            setUserEmail(dat)
            Alert.alert('Please check in your mail')
            
          }}
          //  console.log('check.....', response)
         
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

  
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
 
  
  
    return (
      <View style={{alignItems:'center' , paddingTop: "50%"}}>
        <Text style={{fontSize: 20, }}>Reset Password</Text>
        <TextInput
          placeholder="Enter your Register Email"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
          style={{ width: "80%", borderWidth: 1, borderColor: 'black', marginVertical: 20}}
        />
       <View style={{}}>
       <Button         
        title="Reset Password"
        onPress={handleResetPassword}
        disabled={isLoading || !userEmail}
        
      />
      <View>
        <Text></Text>
      </View>
        <Button title='Go to Login Page' onPress={()=> (navigation.navigate('Login'))} />
       </View>

      </View>
    );
  };
  
  export default CheckEmail;
  