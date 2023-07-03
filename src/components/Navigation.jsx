
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screen/SplashScreen';
import Login from '../screen/Login';
import WalletScreen from '../screen/WalletScreen';
import Help from '../screen/Help/Help';
import Profile from '../screen/NewDesign/Profile';
import ForgotPassword from '../screen/ForgotPassword/ForgotPassword';
import NewHome from '../screen/NewDesign/NewHome'
import NewInvoice from '../screen/NewDesign/NewInvoice';
import NewReports from '../screen/NewDesign/NewReports';
import NewFunding from '../screen/NewDesign/NewFunding';
import NewTds from '../screen/NewDesign/NewTds';
import NewSettlement from '../screen/NewDesign/NewSettlement';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import Icon3 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Lo from '../screen/Lo'
import WalletStatement from '../screen/NewDesign/WalletStatement';
import SearchBar from '../screen/NewDesign/Search/SearchBar';
import List from '../screen/NewDesign/Search/List';






const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


  function HomeDrawer() {
    return (
        <Drawer.Navigator
      
        screenOptions={{
            headerShown:'true',
            drawerActiveBackgroundColor: 'blue',
            drawerActiveTintColor:"#8DD2EA",
            drawerInactiveTintColor:"black",
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
         <Drawer.Screen name="Home" component={NewHome}  options={{
        drawerLabelStyle:{
          fontSize:17,
          fontFamily: 'Roboto-Medium'
        },
        drawerIcon: () => (
          <><Icon3 name="home"
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
          <><Icon3 name="smile"
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

const Navigation = () => {
    const {userInfo,  splashLoading} = useContext(AuthContext)
    
    return (
       <NavigationContainer>  
        <Stack.Navigator>         
        {
        splashLoading ? (
            <Stack.Screen name='Splash Screen' component={SplashScreen}
            options={{headerShown: false}}/>
        ):

     userInfo.code ==200 && userInfo.data.userRole == 3 && userInfo.data?   (              
        <>          
        
       
        <Stack.Screen name='NewHome' component={HomeDrawer} options={{headerShown: false}}/>
        <Stack.Screen name='Funding' component={NewFunding} options={{headerShown: true}}/> 
           <Stack.Screen name='NewReport' component={NewReports} options={{headerShown: true}}/>  
                  <Stack.Screen name='NewInvoice' component={NewInvoice} options={{headerShown: true}}/>    
                  <Stack.Screen name='NewSettlement' component={NewSettlement} options={{headerShown: true}}/>  
                  <Stack.Screen name='NewTds' component={NewTds} options={{headerShown: true}}/>               
             <Stack.Screen name='Wallet' component={WalletScreen} options={{headerShown: false}}/>    
                 <Stack.Screen name='Help' component={Help} options={{headerShown: false}}/>   
                 <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>   
                 <Stack.Screen name='WalletStatement' component={WalletStatement} options={{headerShown: true}}/>                 
               <Stack.Screen name='SearchBar' component={SearchBar} options={{headerShown: true}}/> 
               <Stack.Screen name='List' component={List} options={{headerShown: true}}/>                 
                                     
                                         </>  
                 
    ):(
             <>
                
                <Stack.Screen name='GetStarted' component={Lo} options={{headerShown: false}}/>
                                 <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>  
                 <Stack.Screen name='ForgotPassword' component={ForgotPassword} options= {{headerShown: false}}/>                      
                </>
           )}
            

   </Stack.Navigator>  
   
        </NavigationContainer>
    )}


export default Navigation;

