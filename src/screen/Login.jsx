import { View, Text, TextInput, Pressable, TouchableOpacity, Alert, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastAndroid } from 'react-native';
import { useCallback } from 'react';
import { BASE_URL } from '../constants/Config';
import axios from 'axios';
import NewHome from './NewDesign/NewHome';

// const validationSchema = Yup.object().shape({
//   userEmail: Yup.string().userEmail('Invalid email').required('Email is required'),
//   userPasswd: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });


export default function Login({ navigation }) {

  const [userEmail, setUserEmail] = useState('');
  const [userPasswd, setUserPasswd] = useState('');
  const { loading, login, userInfo, errorMessage } = useContext(AuthContext)
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [PasswordValidity, setPasswordValidity] = useState(false)
  const [checkEmpty, setcheckEmpty] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye')
  




  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

 
 

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setUserEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    }else if (!userEmail.trim()){
     return 'Field is required'
    }
    else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      setPasswordValidity(false)
      return 'Password must not contain Whitespaces.';
     
    }
    // const isContainsNumber = /^(?=.*[0-9]).*$/;
    // if (!isContainsNumber.test(value)) {
    //   return 'Password must contain at least one Digit.';
    // }
    if(!userPasswd.trim()){
      setPasswordValidity(false)
      return 'Field is required'
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      setPasswordValidity(false)
      return 'Password must be 8-16 Characters Long.';
    }
    else{
      setPasswordValidity(true)
    }
    return null;
  }

  //---------------------
//   const validationSchema = () => {
//     yup.object().shape({
//   userEmail: yup.string().userEmail('Invalid email').required('Email is required'),
//   userPasswd: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// })}
 
 const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}> Welcome to Finsight</Text>
      </View>
      {/* <Spinner visible={loading} /> */}



        {/* <Formik
        initialValues={{ userEmail: '', userPasswd: '' }}
                     onSubmit={(values)=> login(values)}
        validationSchema={yup.object().shape({
                      userEmail: yup
                        .string()
                        .email()
                        .required(),
                      userPasswd: yup.
                      string().min(6, 'Password should not excced 10 chars.')
                        .required(),
                    })}
      >


        {({ handleChange, handleBlur, handleSubmit, values, errors, touched  }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('userEmail')}
              onBlur={handleBlur('userEmail')}
              value={values.userEmail}
              keyboardType="email-address"
            />
            {touched.userEmail && errors.userEmail && 
              <Text style={styles.errorText}>{errors.userEmail}</Text>}

            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('userPasswd')}
              onBlur={handleBlur('userPasswd')}
              value={values.userPasswd}
              secureTextEntry
            />
            {touched.userPasswd && errors.userPasswd && (
        <Text style={styles.errorText}>{errors.userPasswd}</Text>
      )}
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik> */}
    
     
      <View style={styles.footer}>
        <Text style={styles.text_footer}>E-MAIL</Text>
        <Animated.View>
        {errorMessage !== '' && <Text>{errorMessage}</Text>}
        
        <View style={styles.action}>

          <FontAwesome
            name='user-o'
            color='#05375a'
            size={20}
            style={styles.font} />
            
          <TextInput placeholder='Enter Email'
            style={styles.textInput}
            value={userEmail}
            onChangeText={text => (setUserEmail, handleCheckEmail)(text)} 
            />
          <Feather name='check-circle' color='green' size={20}
            style={styles.font} />
        </View>
        {checkValidEmail ? (
          <Text style={{ color: 'red' }}> Wrong Format email  </Text>
        ) : 
        (
          <Text style={styles.textFailed}></Text>
        ) 
       
        }
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather
            name='lock'
            color='#05375a'
            size={20}
            style={styles.font} />
          <TextInput placeholder='Enter Password'
            value={userPasswd}
            style={styles.textInput}
            onChangeText={text => setUserPasswd(text)}
            secureTextEntry ={passwordVisibility} />
         <Pressable onPress={handlePasswordVisibility}>
          {
            passwordVisibility ?
            <Feather name='eye-off' color='grey' size={20} 
            style={styles.font} /> :
            <Feather name='eye' color='grey' size={20} 
            style={styles.font} />
          }
         
         </Pressable>
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('CheckEmail')}>
          <Text style={{ color: '#009bd1', marginTop: 15 }}> Forgot Password ?</Text>
        </TouchableOpacity>
        </Animated.View>
        <View style={styles.button}>



          <LinearGradient colors={['#5db8fe', '#39cff2']}
            style={styles.singIn}>
            <TouchableOpacity onPress={() => login(userEmail, userPasswd)} 
          
          >

              <Text style={styles.textSign}> Sign IN</Text>
            </TouchableOpacity>

          </LinearGradient>
       </View>

      
       </View>
    </View>



    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 1.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',

  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  singIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  singIn1: {

    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  font: {
    paddingTop: 10,
    paddingRight: 10
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
  //  textInput: {
  //       height: 40,
  //       width: '100%',
  //       margin: 10,
  //       backgroundColor: 'white',
  //       borderColor: 'gray',
  //       borderWidth: StyleSheet.hairlineWidth,
  //       borderRadius: 10,
  //     },


});

