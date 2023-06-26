import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FONTWIEGHT, SIZES } from '../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Searchbar } from 'react-native-paper';



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

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };


    return (
        <>
            <View style={styles.container}>

            </View>
            <View style={styles.header}>
                {/* <ScrollView style={{ paddingVertical: 30 }}>
                    <View style={{

                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                borderWidth: 1, borderColor: 'grey', borderRadius: 200,
                                padding: 5,
                            }}>User profile </Text>

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
                                <TouchableOpacity style={{
                                    backgroundColor: 'green', borderWidth: 1,
                                    borderColor: 'green', width: 200, paddingVertical: 10, alignItems: 'center'
                                }}>
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
                        alignItems: 'center', borderWidth: 1, borderColor: 'grey'
                    }}>
                        <View style={{ alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Information</Text>

                        </View>

                        {profileData2.map((item, index) =>
                            <View style={{ padding: 10, }} >
                                <Seperator />
                                <View style={styles.view1}>
                                    <Text style={styles.text2}>{item.name} :</Text>


                                    <Text style={{ paddingVertical: 10, fontSize: 20 }} >{item.value}</Text>

                                </View>


                            </View>
                        )}




                    </View>

                </ScrollView> */}
                <View style={{ backgroundColor: 'white' }}>
                <Text> Pagination and Search Bar</Text>
                    {/* <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        /> */}

                    <Searchbar
                        placeholder="Type Here..."
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                    />
                    <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            disabled={currentPage === 1}
                            title="Previous"
                            onPress={() => setCurrentPage(currentPage - 1)}
                        />
                        <Button title="Next" onPress={() => setCurrentPage(currentPage + 1)} />
                    </View>
                </View>
            </View>
            <View style={styles.footer} >
                <Text style={{ textAlign: 'center', paddingTop: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

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
        borderWidth: 1,
        borderColor: 'black'
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

    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },

}} />

export default Profile;