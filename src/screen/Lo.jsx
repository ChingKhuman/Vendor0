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
            source={require('../../assets/Logo.jpg')}
            style={{width: 300,height: 105 , borderRadius: 100, 
            margin: 5, marginVertical: 15}}/>
      </View>

      <Animatable.View style={styles.footer}
        animation='fadeInUpBig'>
        <Text style={styles.title}>
          Stay Connect With Our Opportunity
        </Text>
        <Text style={styles.text}> Sign in With Account</Text>


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
    backgroundColor: '#05375a'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 30
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  text: {
    color: 'grey',
    marginTop: 30,
    fontWeight: 'bold'
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
    fontWeight: 'bold',
    fontSize: 20
  }


});

export default Lo;