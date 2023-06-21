import { View, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import { Text } from 'react-native'
import { Pressable } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Profile from '../screen/NewDesign/Profile'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { Surface, Title } from 'react-native-paper'


const  CustomHeader=() => {

  const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
      <Drawer.Navigator
      screenOptions={{
          headerShown:'',
          drawerActiveBackgroundColor: 'grey',
          drawerActiveTintColor:"#8DD2EA",
          drawerInactiveTintColor:"black",
          inactiveBackgroundColor: 'transparent',
          activeTintColor: 'red',
          labelStyle: {
            fontSize: 30,
            marginLeft: 10,
          },
          headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
              shadowOpacity: 0,
          },
          headerTitle: '',
          drawerStyle: {
            // backgroundColor: '#667EB8',
            borderWidth: 1,
          borderColor: 'orange'
            
          },
          itemStyle: {marginVertical: 5,
            borderWidth: 1,
                borderColor: 'white',
                
              },
          
          // headerStyle: {
          //   backgroundColor: 'green', //Set Header color
          // },
          // headerTintColor: 'white', //Set Header text color
          // headerTitleStyle: {
          //   fontWeight: 'bold', //Set Header text style
          // },
        }}
        drawerContent={props => <CustomSidebarMenu {...props}
        labelStyle={{fontFamily: 'sans-serif', fontsize:40}}
         />}>
       <Drawer.Screen name="Home" component={HomeS}  options={{
      drawerLabelStyle:{
        fontSize:17,
        fontFamily: 'Roboto-Medium'
      },
      drawerIcon: () => (
        <><Icon3 name="help-circle"
          size={20}
          color='black' />
       </>
      )
    }} />
      <Drawer.Screen name="Profile" component={Profile}  options={{
      drawerLabelStyle:{
        fontSize:17,
        fontFamily: 'Roboto-Medium'
      },
      drawerIcon: () => (
        <><Icon3 name="help-circle"
          size={20}
          color='black' />
       </>
      )
    }} />
      <Drawer.Screen name="Help" component={Help} 
    options={{
      drawerLabelStyle:{
        fontSize:17,
        fontFamily: 'Roboto-Medium'
      },
      drawerIcon: () => (
        <><Icon3 name="help-circle"
          size={20}
          color='black' />
       </>
      )
    }}
    
    />
     <Drawer.Screen name="Wallet Management" component={WalletScreen}  
  options={{
    drawerLabelStyle:{
      fontSize:17,
      fontFamily: 'Roboto-Medium'
    },
    drawerIcon: () => (
      <Icon2 name="wallet" 
      size={20}
      color="black"
       />
    )
  }}/>
      </Drawer.Navigator>
  )
}

  
  return (
   <>
   <Surface style={styles.header}>
    <View style={styles.view}>
{
  <TouchableOpacity>
      <Feather style={{alignItems: 'center', padding: 15}} name="menu" size={24} color= 'red'/>
  </TouchableOpacity>
}
    </View>
    <View style={styles.view}>
<Title>
  Header Title
</Title>
    </View>
    <View style={[styles.view, styles.rightView]}>
    {
  <TouchableOpacity>
      <Icon style={{alignItems: 'center', padding: 15}} name="bell" size={20} color= 'white'/>
  </TouchableOpacity>
}
    </View>
    </Surface>
   
   </>
  )
}

export default CustomHeader

const styles = StyleSheet.create({

header: {
  height: 50,
  elevation: 4,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: 'black'
},
view: {
  
  margin:10,
  alignItems: 'center',
  flexDirection: 'row'
}, 
rightView: {
  justifyContent: 'flex-end'
}
})
