import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';

const ForgotPassword = ({navigation}) => {
  const [currentPasswd, setCurrentPasswd] = useState('');
  const [newPasswd, setNewPasswd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {userInfo } = useContext(AuthContext);
  // console.log(token)


  

  // const CircularJSON = require('circular-json');

// const cache = []
// const  handleResetPassword = (currentPasswd, newPasswd) => {

// setIsLoading(true)
// const myHeaders = new Headers();
//   myHeaders.append("Authorization", token);
//   const requestData ={
//     "currentPasswd": currentPasswd,
//     "newPasswd": newPasswd
//   } 
//   requestData.circularRef = requestData;
//   const jsonString = JSON.stringify(requestData, (key, value) => {
//     if( typeof value === 'object' && value !== null) {
//       if (cache.includes(value)) return '[Circular Reference]';
//       cache.push(value);
//     }
//   })
//   axios.post('http://192.168.0.163:9902/account/change-password', requestData, {headers: myHeaders}
//   ).then(response => response.text()) 
//   .then(result =>
//  { setCurrentPasswd(result)
//     setNewPasswd(result)})
//     .catch(error => console.log('error', error))
// }

// const [currentPassword, setcurrentPassword] = useState('');
//  const [newPassword, setnewPassword] = useState('');

  
  
 
  const handleResetPassword = async () => {
       var raw = JSON.stringify({
          "currentPasswd": currentPasswd,
          "newPasswd": newPasswd
       });
       const token = userInfo.data?.accessToken;
       const header={
        "headers":{
          "Authorization":token
        }
       }
      //  var myHeaders = new Headers();
      //  myHeaders.append("Authorization", token);

       var requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',  // I added this line
          "Authorization": token
      },
        body: raw,
        // redirect: 'follow'
      };
       fetch(`${BASE_URL}/account/change-password`, requestOptions)
       .then(response => response.text())
       .then(result =>      
        {if (currentPasswd !== confirmPassword || result.code===500) {
          Alert.alert("You have suceessful change New Password") 
          navigation.navigate("NewHome")         
          console.log(result)
        } 
      else{
        Alert.alert('Password & Confirmed password must be same or ReEntered ')
      }} 
       )
        
        .catch(error => console.log('error', error));
  };



  return (
    <View style={{alignItems: 'center', marginTop: "60%"}}>
      <TextInput
      style={{ width: "80%", borderWidth: 1, borderColor: 'black', marginVertical: 20}}
        placeholder="Current Password"
        // secureTextEntry
        value={currentPasswd}
        onChangeText={text => setCurrentPasswd(text)}
      />
      <TextInput
      style={{ width: "80%", borderWidth: 1, borderColor: 'black', marginVertical: 20}}
        placeholder="New Password"
        // secureTextEntry
        value={newPasswd}
        onChangeText={text => setNewPasswd(text)}
      />
      <TextInput
      style={{ width: "80%", borderWidth: 1, borderColor: 'black', marginVertical: 20}}
        placeholder="Confirm New Password"
        // secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <View>
      <Button title="Change Password" onPress={handleResetPassword} />
      <Text></Text>
      <Button title='Go Back' onPress={()=> navigation.navigate('NewHome')} />
      </View>
    </View>
  );
};

export default ForgotPassword;
