import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { PasswordVisibility} from './PasswordVisibility'
import Spinner from 'react-native-loading-spinner-overlay';


export default function Login({ navigation }) {

  const [userEmail, setUserEmail] = useState('');
  const [userPasswd, setUserPasswd] = useState('');
  const { loading, login } = useContext(AuthContext)
  const [checkValidEmail, setCheckValidEmail] = useState(false);
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
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}> Welcome to Finsight</Text>
      </View>
      <Spinner visible={loading} />
      <View style={styles.footer}>
        <Text style={styles.text_footer}>E-MAIL</Text>
        <View style={styles.action}>
          <FontAwesome
            name='user-o'
            color='#05375a'
            size={20}
            style={styles.font} />
          <TextInput placeholder='Enter Email'
            style={styles.textInput}
            value={userEmail}
            onChangeText={text => (setUserEmail, handleCheckEmail)(text)} />
          <Feather name='check-circle' color='green' size={20}
            style={styles.font} />
        </View>
        {checkValidEmail ? (
          <Text style={{ color: 'red' }}> Wrong Format email</Text>
        ) : (
          <Text style={styles.textFailed}></Text>
        )}
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
         <Feather name='eye-off' color='grey' size={20} 
            style={styles.font} />
         </Pressable>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: '#009bd1', marginTop: 15 }}> Forgot Password ?</Text>
        </TouchableOpacity>

        <View style={styles.button}>



          <LinearGradient colors={['#5db8fe', '#39cff2']}
            style={styles.singIn}>
            <TouchableOpacity onPress={() => login(userEmail, userPasswd)}>

              <Text style={styles.textSign}> Sign IN</Text>
            </TouchableOpacity>

          </LinearGradient>
       </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}
          style={[styles.singIn1, { width: 330, borderColor: '#4dc2f8', borderWidth: 1, marginTop: 15 }]}>
          <Text style={[styles.textSign, { color: '#4dc2f8' }]}>Sign Up</Text>
        </TouchableOpacity> */}
       </View>
    </View>



    //     <View>
    //       <ScrollView style={styles.container}>
    //       <View style={styles.sectionContainer}>
    //          <Image style={styles.img} source={require('../../assets/platform.png')} />
    //          <Spinner visible={loading} />
    //        </View>

    //        <View style={styles.LogContainer}>

    //          <TextInput style={styles.input} value={userEmail}
    //            placeholder='Enter email'
    //            onChangeText={text => setUserEmail(text)} />

    //          <TextInput style={styles.input} value={userPasswd}
    //            placeholder='Enter password'
    //            onChangeText={text => setUserPasswd(text)}
    //          //  secureTextEntry
    //          />

    //        </View>

    //        <View style={styles.footer}></View>



    //        {/* <View style={styles.containerRes}>
    //        <View >
    //          <TouchableOpacity style={styles.btn} onPress={() => {
    //            login(
    //              userEmail, userPasswd)
    //          }}>

    //            <Text style={styles.textBtn}>Login</Text>
    //          </TouchableOpacity>
    //        </View>
    //          <Text style={{ color: 'black' }}>Forgot Password </Text>
    //          <TouchableOpacity  >


    //            <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Register')}>Register</Text>
    //          </TouchableOpacity>


    //        </View> */}
    //     </ScrollView> 
    //    </View>
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


});

