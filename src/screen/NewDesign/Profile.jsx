import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FONTWIEGHT, SIZES } from '../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card, ListItem, Button } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Profile = () => {



    
    const [profileData1, setProfileData1] = useState([])
    const [profileData2, setProfileData2] = useState([])
    const { loading, userInfo } = useContext(AuthContext);
    const token = userInfo.data?.accessToken
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const getData = () => {
        fetch(`${BASE_URL}/registration/user-profile`, requestOptions)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong.')

            }).
            then(function (myJson) {
                let result = myJson.data.left
                setProfileData1(result)
                console.log('Profile check left.....', result)
                let result2 = myJson.data.right
                setProfileData2(result2)

            })
            .catch(function (error) {
                console.warn('Request failed', error)
            })

    }

    useEffect(() => {
        getData()
    }, [])

    const LeftContent = <Icon name="home" size={30} />


    return (
        <>
        <View style={styles.container}>

        </View>
        <View style={styles.header}>
        <ScrollView style={{paddingVertical: 30}}>
            

            {/* <View>
                <Text style={{ fontSize: 30, paddingHorizontal: 7,  }}> Profile</Text>
                <View style={{ flexDirection: 'row', paddingBottom: 30}}>
                    <Text style={{ fontSize: SIZES.h4, padding: 7, color: 'orange' }}> Home /</Text>
                    <Text style={{ fontSize: SIZES.h4, padding: 7 }}>Profile</Text>
                </View>
            </View> */}
            <View style={{
                borderWidth: 1, borderTopWidth: 3, borderColor: 'grey',borderRadius:9,
                marginHorizontal: 10, alignItems: 'center', width: '90%'
                }}>
                <View style={{
                    width: 100, height: 40, marginVertical: 10,
                    borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center'
                }}>
                    <Text>User profile </Text>

                </View>
                <View>

                    <View style={{ alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Investor1</Text>
                        <Text style={{ fontFamily: 'Georgia', fontSize: 17 }}>Status: Active</Text>
                    </View>

                    {profileData1.map((item, index) =>
                        <View style={{ padding: 20, }}>
                            <Seperator />
                            <View style={styles.view}>
                                <Text style={styles.text2}>{item.name}</Text>
                               


                                <Text >{item.value}</Text>
                             
                            </View>


                        </View>
                         )} 

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: 'green', borderWidth: 1, borderColor: 'green', width: 200, height: 30, alignItems: 'center' }}>
                            <Text style={{ position: 'relative', color: 'white' }}> Change Profile Pictuer</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity style={{ borderWidth: 1, backgroundColor: 'blue', borderColor: 'green', width: 200, height: 30, alignItems: 'center' }}>
                            <Text style={{ position: 'relative', color: 'white' }}> Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>
            <View style={{
                borderWidth: 1, borderTopWidth: 4, borderColor: 'grey',borderRadius:9,
                marginHorizontal: 10, alignItems: 'center', width: '90%',marginVertical:40
            }}>
            <View>

                

                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Information</Text>

                </View>

                {profileData2.map((item, index) =>
                    <View style={{ padding: 10, }} >
                        <Seperator />
                        <View style={styles.view1}>
                            <Text style={styles.text2}>{item.name} :</Text>
                            

                            <Text style={{paddingVertical:10,fontSize:20}} >{item.value}</Text>
                          
                        </View>


                    </View>
                    )} 



            </View>
                    </View>

                    </ScrollView>
                    <View>
                        <Text>dfkj</Text>
                    </View>
        </View>
                   <View style={styles.footer} >
                   <Text style={{textAlign:'center',paddingTop:10, fontFamily:'Georgia'}}>Copyright @ 2021-2022<Text style={{color:'blue'}}>UpCap.</Text>All right Reserved.</Text>

                   </View>

   
        
      
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 0.0,
        backgroundColor: 'green'
    },

    header: {
        flex: 11,
        alignItems: 'center',
        
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'black'
    },
    footer: {
        flex: 1,
        alignItems: 'center',

    },
    view1: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 350,
        alignItems: 'center'
    },
    view: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350
    },
    text2: {
        color: 'black',
        fontFamily: 'Georgia',
        fontSize: 16
    }
})

const Seperator = () => <View style={{
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',

}} />

export default Profile;