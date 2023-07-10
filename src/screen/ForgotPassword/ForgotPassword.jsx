import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const ForgotPassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      // Validate current password (you may need to implement this function)
      if (!validateCurrentPassword(currentPassword)) {
        Alert.alert('Invalid current password');
        return;
      }

      // Send request to update password
      const response = await axios.post('/account/change-password', {
        currentPassword,
        newPassword,
      });

      // Handle the response (you may need to adjust this based on your API)
      if (response.data.success) {
        // Password changed successfully
        Alert.alert('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        // Password change failed
        Alert.alert('Failed to change password');
      }
    } catch (error) {
      // Handle error
      console.error('Error changing password:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
      <Button title='Go to Login Page' onPress={()=> (navigation.navigate('Login'))} />
    </View>
  );
};

export default ForgotPassword;
