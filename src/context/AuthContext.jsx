import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/Config";
import { Alert } from "react-native";




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [splashLoading, setSplashLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('');




 


  // const register = (userFName, userMobile, userEmail, userPasswd,
  //     userRole,tan,referralCode,aadharYesNo, fieldName,
  //     displayName,mandatory,dataType,example) => {
  //     setLoading(true)
  //     axios.post(`${BASE_URL}/registration/registrationFields`, {
  //         userFName,userMobile,userEmail,userPasswd,userRole,
  //         tan,referralCode,aadharYesNo,  fieldName,
  //         displayName,mandatory,dataType,example
  //     }).then(res => {
  //         let signIn = res.data;
  //         let sign = res
  //         if(sign.code =500){
  //             Alert.alert('Sign Up Error')
  //             console.log('check...', signIn)
  //         }else{
  //             setSignInInvestor(signIn);
  //         // console.log('checkRegister', signIn)
  //         setLoading(false)
  //       Alert.alert('Successfully Register')
  //       navigation.navigate('Login')  
  //         }


  //     }).catch(e => {
  //         console.log(`register error ${e}`);
  //         setLoading(false);
  //     })
  // }
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  //  const register = () => {
  // fetch("http://192.168.0.155:9902/registration/registrationFields", requestOptions)
  //   .then(response => response.text())
  //   .then(result => {
  //     let SignIn = result.data
  //     setSignInInvestor(SignIn)
  //     console.log('check', SignIn)
  //   })
  //   .catch(error => console.log('error', error));    
  //  } 
  const login = async (userEmail, userPasswd) => {    
    setLoading(true)
   try {
    axios.post(`${BASE_URL}/account/login`,
    { userEmail, userPasswd }
  ).then(res => {
    let userInfo = res.data;
    // console.log("Checkdata...", userInfo)  
       setUserInfo(userInfo)
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      setLoading(false)
  })
  
  // setErrorMessage('Invalid credentials. Please try again.');
  setLoading(false)
}
    catch (error) {
    console.log(error);
   }

  }


// const login = async (values) => {
//   let raw = JSON.stringify(values);
//   var requestOptions1 = {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',  // I added this line        
//     },
//     body: raw,
// }
//  fetch(`${BASE_URL}/account/login`, requestOptions1)
//  .then(response => response.text())
//  .then(result => {
//   let userInfo = result
//    setUserInfo(userInfo)

//   console.log('chceckk.....', userInfo)
//   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
//     setLoading(false)
//  }
//   ).catch(error => console.log('error', error));
    
// } 



  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setUserInfo({})
     
      Alert.alert('Logged out successfully!');
      

    } catch (error) {
      console.log(`Error removing item: ${error}`);
    }
  };

 

  const isloggedIn = async () => {
    try {
      setSplashLoading(true)
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);


      if (userInfo) {
        setUserInfo(userInfo)
      }

      setSplashLoading(false)
    } catch (e) {
      setSplashLoading(false)
      console.log(`is logged in error ${e}`)

    }
  }

  useEffect(() => {
    isloggedIn()
  }, []);

  const Invoice = (add) => {
    setLoading(true);

    axios.post(`${BASE_URL}/invoicediscounting/addfunding`,
      { add }
    ).then(res => {
      let addInfo = res.data;
      //  console.log("Checkdata...", addInfo)          
      // setAddInfo(addInfo)
      //  setLoading(false)
    }).catch(e => {
      console.log(`login error ${e.res}`);
      setLoading(false)
    })
  }




  return (

    <AuthContext.Provider value={{ loading, userInfo, splashLoading, login, logout, Invoice, isloggedIn,errorMessage }}>{children}</AuthContext.Provider>
  )

}

export default AuthProvider;