import {  StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewFunding from './NewFunding';
import NewSettlement from './NewSettlement';
import NewTds from './NewTds';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
 
    tabBarIcon: ({ color, size }) => {
      let iconName;
  
      if (route.name === 'Funding') {
        iconName = 'retweet';
      } else if (route.name === 'Settlement') {
        iconName = 'tasks';
      }
      else if (route.name === 'Tds'){
        iconName = 'check-circle'
      }
  
      return <Icon name={iconName} size={size} color={color} />;
    },
  });

const CustomTab = () => (
   
  <Tab.Navigator screenOptions={screenOptions}
    tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'lightgray',
      activeBackgroundColor: 'red',
      inactiveBackgroundColor: 'grey',
          style: {
                backgroundColor: '#CE4418',
                paddingBottom: 3
          }
   }}>
    
         <Tab.Screen name="Funding" component={NewFunding} options={{ headerShown: false, tabBarStyle: "20%" }} />
         <Tab.Screen name="Settlement" component={NewSettlement} options={{ headerShown: false, tabBarStyle: "20%" }} />
         <Tab.Screen name="Tds" component={NewTds} options={{ headerShown: false, tabBarStyle: "20%" }} />
      </Tab.Navigator>
);

export default function NewReports() {

    return (

        <CustomTab />

      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.0,
        backgroundColor: 'green'
    },
    headers: {
        flex: 11,
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    footer: {
        flex: 1,
        alignItems: 'center',

    }
})