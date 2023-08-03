import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../Profile';
import Help from '../../Help/Help';
import CustomSidebarMenu from '../../../components/CustomSidebarMenu';

const OnboardingHome = () => {

    const Drawer = createDrawerNavigator();

    const CustomTab = () => (

   
        <Drawer.Navigator  screenOptions={{
            headerShown: 'true',
            drawerActiveBackgroundColor: '#5B5FB6',
            drawerActiveTintColor: "#8DD2EA",
            drawerInactiveTintColor: "black",
            inactiveBackgroundColor: 'transparent',
            activeTintColor: 'red',
            labelStyle: {
              fontSize: 30,
              marginLeft: 10,
            },
            headerStyle: {
              backgroundColor: '#5B5FB6',
              elevation: 0,
              shadowOpacity: 0,
              height: 60
            },
            headerTitle: 'Menu',
    
            drawerStyle: {
              // backgroundColor: '#667EB8',
              borderWidth: 1,
              borderColor: 'white'
    
            },
            itemStyle: {
              marginVertical: 5,
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
            labelStyle={{ fontFamily: 'sans-serif', fontsize: 40 }}
    
          />}>
          
          <Drawer.Screen name="OnboardingHome" component={OnboardingHome} options={{ headerShown: false, tabBarStyle: "20%" }} />
               <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarStyle: "20%" }} />
               <Drawer.Screen name="Help" component={Help} options={{ headerShown: false, tabBarStyle: "20%" }} />
              
            </Drawer.Navigator>
      );
  return (
   <CustomTab/>
  )
}

export default OnboardingHome