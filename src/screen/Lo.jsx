import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'





const Lo = ({ navigation }) => {



  return (

    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.header}>
        {/* <Animatable.Image source={require('../../../assets/Logo.png')}
          animation='bounceIn'
          duration={1500}
          style={styles.logo}
          resizeMode="stretch" /> */}
           <Image
            source={require('../../assets/logo1.jpg')}
            style={{width: 300,height: 150 , borderRadius: 0, 
            margin: 5, marginVertical: 15}}/>
            <Text style={{color:293462, fontSize:20}}>An Alternative Investment Platform</Text>
      </View>

      <Animatable.View style={styles.footer}
        animation='fadeInUpBig'>
        <Text style={styles.title}>
          A Finsight Venture       Platform
        </Text>
{/*         
        <Text style={styles.text}> Platform</Text> */}
        {/* <View style={{borderRadius: 50}}>
        <Image 
            source={require('../../assets/logo2.jpg')}
            style={{width: 80,height: 80 , borderRadius: 0, 
            margin: 5, marginVertical: 15}}/>
        </View> */}


        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient colors={['#5db8fe', '#39cff2']}
              style={styles.singIn}>
              <Text style={styles.textSign}> Get Started</Text>
              <MaterialIcons name='navigate-next' color='white' size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>


      </Animatable.View>
    </View>

  )
}

const { height } = Dimensions.get('screen')
const height_logo = height * 0.5 * 0.4

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#7dce13',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100 / 1

  },
  title: {
    color: 293462,
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily:'Calibri-bold '
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  text: {
    color: 'grey',
    marginTop: 30,
    // fontWeight: 'bold',
    fontFamily:'Calibri-bold'
  },
  singIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontFamily:'Calibri-bold',
    fontSize: 20
  }


});

export default Lo;


