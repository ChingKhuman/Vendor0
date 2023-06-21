import  * as React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Modal,
  Pressable,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { COLORS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Entypo'
import IconHome from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Feather'






const CustomSidebarMenu = (props) => {

  const {logout} = React.useContext(AuthContext) 
  const [modalVisible, setModalVisible] = React.useState(false);
 


  return (
    <SafeAreaView style={{flex: 1}}>
      <>
    
            
      <DrawerContentScrollView {...props} >
        <ImageBackground  source={require('../../assets/BlueTheme.jpg')}>
        <Image style={styles.sideMenuProfileIcon} source={require('../../assets/BlueTheme.jpg')} />
       
        </ImageBackground>
     
        <DrawerItemList {...props}
         />
     
       
        
  

      </DrawerContentScrollView>
      {/* <View style={{paddingBottom: '50%'}}>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Invoice')}}>
      <View style={styles.iconAlign}>
      <Icon1 name="archive" size={20} color= 'black'/>  
       
        <Text style={styles.DrawerText}>Invoice Management</Text>
       
            
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Wallet')}}>
      
      <View style={styles.iconAlign}>
      <Icon2 name="wallet" size={20} color= 'black'/> 
         <Text style={styles.DrawerText}>Wallet</Text>
       
             
       </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => {props.navigation.navigate('Funding')}}>
      <View style={styles.iconAlign}>
      <Icon2 name="credit-card-refund-outline" size={20} color= 'black'/> 
       
        <Text style={styles.DrawerText}>Funding</Text>
       
             
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Settlement')}}>
      <View style={styles.iconAlign}>
      <Icon2 name="set-center" size={20} color= 'black'/> 
     
        <Text style={styles.DrawerText}>Settlement</Text>
             
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('History')}}>
      <View style={styles.iconAlign}>
      <Icon2 name="history" size={20} color= 'black'/>       
        <Text style={styles.DrawerText}>History</Text>
       
             
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Notification')}}>
     
      <View style={styles.iconAlign}>
      <Icon4 name="notifications-on" size={20} color= 'black'/>
          <Text style={styles.DrawerText}>Notification</Text>
       
              
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Help')}}>
      <View style={styles.iconAlign}>
      <Icon3 name="help-circle" size={20} color= 'black'/>  
        
        <Text style={styles.DrawerText}>Help</Text>
       
             
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}}>
     
      <View style={styles.iconAlign}>
      <Icon4 name="camera" size={20} color= 'black'/>  
           <Text style={styles.DrawerText}>Profile</Text>
       
             
      </View>
      </TouchableOpacity>
      </View>*/}
      <View style={styles.iconAlign}> 
      <Icon name='logout'  size={20}             
               />
               <TouchableOpacity onPress={() => setModalVisible(true)}>
               <Text style={styles.DrawerText}>
                Logout
               </Text>
               </TouchableOpacity>
      </View>
     <TouchableOpacity onPress={() => Linking.openURL('https://finsightventures.in')}>
     <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey',
          paddingBottom: 10
        }}>
        www.finsightVentures.com
      </Text>
     </TouchableOpacity>

      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Are you Sure Want to Log out</Text>
        <View  style={styles.touch}>
       <View>
       <Pressable
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>No</Text>
        </Pressable>
       </View>
       <View>
       <Pressable
          onPress={logout}>
          <Text style={styles.textStyle1}>Yes</Text>
        </Pressable>
       </View>
        </View>
   
      </View>
    </View>
   </Modal>
   </>
   {/*   */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginVertical: 30
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 50,
       
  },
  textStyle1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,  
  
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: SIZES.h2,

  },
  touch: {
 flexDirection: 'row',
 display: 'flex',
 justifyContent: 'space-between'
  },
 iconAlign: {flexDirection: 'row', alignItems: 'center', padding: 10,
 paddingHorizontal: 18,
borderTopWidth:1, borderColor: 'grey'}
,
  	DrawerText: {fontSize: 17,color: 'black', fontFamily: 'Roboto-Medium', 
    marginLeft: 5,fontWeight:'bold', paddingHorizontal: 20}
})

export default CustomSidebarMenu;