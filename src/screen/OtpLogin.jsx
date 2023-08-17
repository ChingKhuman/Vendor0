import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OtpLogin = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = async () => {
    try {
      // Send API request to backend to send OTP
      const response = await axios.post(`${BASE_URL}/account/otp`, {
        userEmail: userEmail,

      });
      console.log(response)
      // Handle success or display error message
      // You might want to show a confirmation that OTP has been sent
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send API request to backend to verify OTP
      const response = await axios.post(`${BASE_URL}/account/otp-login`, {
        phoneNumber: phoneNumber,
        otp: otp,
      });
      if (response.data.success) {
        // Navigate to the main part of your app
        console.log('SUccess')
      } else {
        Alert.alert('Error', 'Invalid OTP code');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

      <View style={{ marginVertical: 30, alignItems:'center' }}>
        <Text>Enter your Register Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email"
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <TouchableOpacity style={{alignContent:'center',alignItems: 'center', borderWidth:1, borderRadius: 20,
         width: 100,justifyContent: 'center',padding: 10, backgroundColor:'grey'}}  onPress={handleSendOTP}>
          <Text>Send Otp</Text>
        </TouchableOpacity>
       
      </View>
      <View style={{ marginVertical: 30, alignItems:'center' }}>

        <Text>Enter your Register Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
        />

<TouchableOpacity style={{alignContent:'center',alignItems: 'center', borderWidth:1, borderRadius: 20,
         width: 100,justifyContent: 'center',padding: 10, backgroundColor:'grey'}}  onPress={handleVerifyOTP}>
          <Text>Verify Otp</Text>
        </TouchableOpacity>
      </View>
    
      <View>
        <Button title='Back to Email/Password login' onPress={() => navigation.navigate('Login')} />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  inputView: {
    
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 30,
    width: 300,
    marginBottom: 10,
    backgroundColor: "#FFC0CB",

  }
})
export default OtpLogin;
