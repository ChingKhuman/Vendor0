import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Button, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FONTWIEGHT, SIZES } from '../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome'

import { ListItem } from 'react-native-elements';



const  Profile  = () => {
  return(
  <>
 <View>
  
 <ListItem >
      <ListItem.Content>
        <ListItem.Title>Name</ListItem.Title>
        <ListItem.Subtitle>Number</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem></View></>

    // const [profileData1, setProfileData1] = useState([])
    // const [profileData2, setProfileData2] = useState([])
    // const [selectedImage, setSelectedImage] = useState(null);
    // const { loading, userInfo } = useContext(AuthContext);
    // const token = userInfo.data?.accessToken
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", token);

    // var raw = "";

    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // const getData = () => {
    //     fetch(`${BASE_URL}/registration/user-profile`, requestOptions)
    //         .then(function (response) {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error('Something went wrong.')

    //         }).
    //         then(function (myJson) {
    //             let result = myJson.data.left
    //             setProfileData1(result)
    //             let result2 = myJson.data.right
    //             setProfileData2(result2)

    //         })
    //         .catch(function (error) {
    //             console.warn('Request failed', error)
    //         })

    // }

    // useEffect(() => {
    //     getData()
    // }, [])

    // const LeftContent = <Icon name="home" size={30} />

 

//     return (
//         <>
//             <View style={styles.container0}>

//             </View>

//             <View style={styles.header}>
          
//                 {/* <ScrollView style={{ paddingVertical: 30 }}>
//                     <View style={{

//                     }}>
//                         <View style={{
//                             alignItems: 'center'
//                         }}>
//                             <Text style={{
//                                 borderWidth: 1, borderColor: 'grey', borderRadius: 200,
//                                 padding: 5,
//                             }}>User profile </Text>
                            

//                         </View>
//                         <View>

//                             <View style={{ alignItems: 'center', padding: 10 }}>
//                                 <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Investor1</Text>
//                                 <Text style={{ fontFamily: 'Georgia', fontSize: 17 }}>Status: Active</Text>
//                             </View>

//                             {profileData1.map((item, index) =>
//                                 <View style={{ padding: 20, }}>
//                                     <Seperator />
//                                     <View style={styles.view}>
//                                         <Text style={styles.text2}>{item.name}</Text>



//                                         <Text >{item.value}</Text>

//                                     </View>


//                                 </View>
//                             )}

//                             <View style={{ alignItems: 'center' }}>
//                                 <TouchableOpacity style={{
//                                     backgroundColor: 'green', borderWidth: 1,
//                                     borderColor: 'green', width: 200, paddingVertical: 10, alignItems: 'center'
//                                 }}>
//                                     <Text style={{ position: 'relative', color: 'white' }}> Change Profile Pictuer</Text>
//                                 </TouchableOpacity>

//                             </View>
//                             <View style={{ alignItems: 'center', padding: 10 }}>
//                                 <TouchableOpacity style={{ borderWidth: 1, backgroundColor: 'blue', borderColor: 'green', width: 200, height: 30, alignItems: 'center' }}>
//                                     <Text style={{ position: 'relative', color: 'white' }}> Change Password</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>



//                     </View>
//                     <View style={{
//                         alignItems: 'center', borderWidth: 1, borderColor: 'grey'
//                     }}>
//                         <View style={{ alignItems: 'center', padding: 10 }}>
//                             <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Information</Text>

//                         </View>

//                         {profileData2.map((item, index) =>
//                             <View style={{ padding: 10, }} >
//                                 <Seperator />
//                                 <View style={styles.view1}>
//                                     <Text style={styles.text2}>{item.name} :</Text>


//                                     <Text style={{ paddingVertical: 10, fontSize: 20 }} >{item.value}</Text>

//                                 </View>


//                             </View>
//                         )}




//                     </View>

//                 </ScrollView> */}
//                 <View style={{ backgroundColor: 'white' }}>

//                 </View>
//             </View>
//             <View style={styles.footer} >
//                 <Text style={{ textAlign: 'center', paddingTop: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

//             </View>
//         </>
//     )
// }

  )
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 30,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff'
},
button: {
  width: 250,
  height: 60,
  backgroundColor: '#3740ff',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  marginBottom:12    
},
buttonText: {
  textAlign: 'center',
  fontSize: 15,
  color: '#fff'
}
});

export default Profile