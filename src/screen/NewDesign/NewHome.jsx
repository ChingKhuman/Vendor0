import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, Dimensions, Animated, TextInput } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { Card } from 'react-native-paper';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryPie, VictoryTheme } from 'victory-native';
import RadioForm from 'react-native-simple-radio-button';
import { useColorScheme } from 'react-native';
import { Modal } from 'react-native';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import { COLORS } from '../../constants/theme';






const NewHome = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [pieCount, setPieCount] = useState([]);
    const [pieAmount, setPieAmount] = useState([])
    const [yieVal, setYieVal] = useState([])
    const [loading, setLaoding] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [pieData, setpieData] = useState([]);
    const [pieAData, setpieAData] = useState([])
    const { userInfo, logout } = useContext(AuthContext);
    const token = userInfo.data?.accessToken;
   


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
        setLaoding(true)
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson?.data.count;
                setPieCount(cont);

                let Color = ['green', 'blue', 'violet', '#92CDE2']
                let colorData = cont.map((row, index) => {
                    return {
                        name: row.name,
                        allOfferCount: row.allOfferCount,
                        color: Color[index]
                    }
                });
                setLaoding(false)
                setpieData(colorData)
                  console.log('checking.....',colorData)
            }).catch(function (error) {
                console.log(error)
                setLaoding(false)
            })
    }
    useEffect(() => {
        getData()
    }, []);

    const sortCount = pieCount.sort(function (a, b) {
        return a.allOfferCount - b.allOfferCount
    })



    const getData1 = () => {
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson?.data.amount;
                setPieAmount(cont);
                let Color1 = ['red', 'blue', 'green', '#2C5AA2']
                let colorData1 = cont.map((row, index) => {
                    return {
                        name: row.name,
                        totalOfferedAmount: row.totalOfferedAmount,
                        color: Color1[index]
                    }
                })
                setpieAData(colorData1);

            }).catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        getData1()
    }, []);

    const sortAmount = pieAmount.sort(function (a, b) {
        return a.totalOfferedAmount - b.totalOfferedAmount
    })

    const victoryAmount = pieAmount.map(a => a.name)
    //  console.log(victoryAmount)


    const getDataYield = () => {
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let Yield = myJson?.data.yield;
                setYieVal(Yield);
            }).catch(function (error) {
                console.log(error);
            })

    }
    useEffect(() => {
        getDataYield()
    }, []);


    const onRefresh = React.useCallback(() => {
        fetch( `${BASE_URL}/account/validate-jwt`, requestOptions)
            .then(response => response.json()
          ).then(result=>{                 
               //  console.log('Check......',result)               
                {
                            if (result.data === null) {
                                showToast('Session Expired.Login Again');
                                
                            }
                            else {
                                setRefreshing(true);
                                setTimeout(() => {
                                    setRefreshing(false);

                                }, 2000);
                            }
                        }
            })
            .catch(function (error) {
                console.warn('Request failed', error)
                
            })
   }, []);
   const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

    const series1 = pieCount.map(item =>
        item.allOfferCount
    )

  


    // Set different color styles based on x value

    // Default color for other values


    const sliceColor = ['green', 'blue', 'violet', '#92CDE2']
    const sliceColor1 = ['red', 'blue', 'green', '#2C5AA2']

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };


    //--------------------------Victory-------------------------------


    const [chart, setChart] = useState(0)
    const [chartA, setChartA] = useState(0)


    const radio_props = [
        { label: 'Bar', value: 0 },
        { label: 'Pie', value: 1 },
        
    ]

    const radioProps = [
        { label: 'BarA', value: 0 },
        { label: 'PieA', value: 1 },
       
    ]

    // const animation = useRef(new Animated.Value(0)).current;
    // const [isButtonClick, setIsButtonClick] = useState(false);

    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';


    //-----------------Nominiee
    const [initialData, setInitialData] = useState({});
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${BASE_URL}/usermanage/nominee-check`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let res = result
            // console.log(res)    
            setInitialData(res)
        })
        .catch(error => console.log('error', error));

    //---------------Nominee Add--------------
    const handleNominee = () => {

        const formData = new FormData();
        formData.append("nDNomName", formValue.nDNomName);
        formData.append("nDNomRelationship", formValue.nDNomRelationship);
        formData.append("nDNomMobile", formValue.nDNomMobile);
        formData.append("nDNomMailID", formValue.nDNomMailID);
        formData.append("nDNomAddress", formValue.nDNomAddress);

        const token2 = userInfo.data?.accessToken;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token2);
        const requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        }
        fetch(`${BASE_URL}/usermanage/add-nominee`, requestOptions2)
            .then(response => response.json())
            .then(result => {
               
                setModalVisible(!modalVisible)
                Alert.alert('Nominee added sucessfull')
             //   console.log(result)
            }
            )
    }

    const [listOpen, setListOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        nDNomName: '',
        nDNomRelationship: '',
        nDNomMobile: '',
        nDNomMailID: '',
        nDNomAddress: '',
    });

    const listData = [
        { label: 'Spouse', value: '1' },
        { label: 'Adult Child', value: '2' },
        { label: 'Minor Child', value: '3' },
        { label: 'Mother', value: '4' },
        { label: 'Father', value: '5' },
        { label: 'Sibling', value: '6' },
        { label: 'Legal Gaurdian', value: '7' },
        { label: 'Unrealated Person', value: '8' },

    ]

    //-------------------show Hide---------
    const [showTextInput, setShowTextInput] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleDropdownChange = (itemValue) => {
        setSelectedValue(itemValue);
        setShowTextInput(itemValue === 'Minor Child'); // Set the condition based on your dropdown options
    };

    //-------------------Auto invest
    const [isUpdateOn, setIsUpdateOn] = useState(false);
    const AutoOn = () => {
        const token1 = userInfo.data?.accessToken;
        var requestOptions3 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': token1
            }
        }
        fetch(`${BASE_URL}/autoinvest/auto-invest-on/2`, requestOptions3)
            .then(response => response.text())
            .then(result => {
                showToast('You have successfully turn on EMI')
                setIsUpdateOn((prev) => !prev);
                console.log(result)
            }

            )

            .catch(error => console.log('error', error));


    }

    //-----------------Auton Invest off
    
    const AutoOf = () => {
        const token1 = userInfo.data?.accessToken;
        var requestOptions3 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': token1
            }
        }
        fetch(`${BASE_URL}/autoinvest/auto-invest-off`, requestOptions3)
            .then(response => response.text())
            .then(result => {
                showToast('You have successfully turn off EMI')
                setIsUpdateOn((prev) => !prev);
                // console.log(result)
            }
            )

            .catch(error => console.log('error', error));


    }

   



    return (

        <>
            {
                initialData ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={{backgroundColor:'green' , alignItems: 'center',borderRadius: 8,padding: 10,}}>
                                <Text style={{
                                    color: 'white', fontSize: 15, textAlign: 'center', 
                                
                                }}>Add Nominee</Text>
                            </View>
                            <View >

                                <View style={styles.textInput1}>
                                    <TextInput
                                        name="Name"
                                        placeholder="Name"
                                        style={styles.textInput}
                                        defaultValue={formValue.nDNomName}
                                        onChangeText={(item) => setFormValue({
                                            ...formValue,
                                            nDNomName: item
                                        })}

                                    />
                                    <DropDownPicker
                                        onChangeValue={handleDropdownChange}
                                        containerProps={{ height: listOpen === true ? 220 : null, }}
                                        style={{ position: 'relative', }}
                                        placeholder="Select"
                                        placeholderStyle={styles.dropdownPlaceholder}
                                        open={listOpen}
                                        setOpen={itemValue => setListOpen(itemValue)}
                                        items={listData}
                                        key={listData.value}
                                        value={ formValue.nDNomRelationship}
                                        setValue={(item) => setFormValue({
                                            ...formValue,
                                            nDNomRelationship: item(),
                                        })}
                                    />
                                    {showTextInput && (
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder='Legal Gaurdian' />
                                    )}
                                    <TextInput
                                        name="Mobile"
                                        placeholder="Mobile"
                                        style={styles.textInput}
                                        defaultValue={formValue.nDNomMobile}
                                        onChangeText={(item) => setFormValue({
                                            ...formValue,
                                            nDNomMobile: item
                                        })}

                                    />
                                    <TextInput
                                        name="Mail"
                                        placeholder="Mail"
                                        style={styles.textInput}
                                        defaultValue={formValue.nDNomMailID}
                                        onChangeText={(item) => setFormValue({
                                            ...formValue,
                                            nDNomMailID: item
                                        })}

                                    />

                                    <TextInput
                                        name="Address"
                                        placeholder="Address"
                                        style={styles.textInput}
                                        defaultValue={formValue.nDNomAddress}
                                        onChangeText={(item) => setFormValue({
                                            ...formValue,
                                            nDNomAddress: item
                                        })}

                                    />



                                        <TouchableOpacity style={styles.handleNominee}
                                            //  onPress={()=> Alert.alert("Form Value", JSON.stringify(formValue))}
                                            onPress={handleNominee}
                                        >
                                            <Text style={{ color: 'white', textAlign: 'center', fontFamily:'Calibri-bold',fontSize:15 }}>SUBMIT</Text>
                                        </TouchableOpacity>
                                  
                                        <TouchableOpacity style={styles.handleNominee}
                                            //  onPress={()=> Alert.alert("Form Value", JSON.stringify(formValue))}
                                            onPress={() => setModalVisible(false)}
                                        >
                                            <Text style={{ color: 'white', textAlign: 'center', fontFamily:'Calibri-bold',fontSize:15 }}>CLOSE</Text>
                                    
                                        </TouchableOpacity>
                                   
                                </View>

                            </View>


                        </View>
                    </Modal> : (
                        <></>
                    )
            }

          
            <ScrollView style={[
                {
                    flex: 0,
                },
                isDarkTheme
                    ? { backgroundColor: 'black' }
                    : { backgroundColor: 'white' },
            ]}
                // contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {/* <View > */}

                <View style={styles.container}>
                <View  style={{ alignItems: 'flex-end',padding: 10,
            borderRadius: 10 }}>
                {
                    isUpdateOn ?
                        (<TouchableOpacity  onPress={AutoOf}>
                         
                          <Text style={{textAlign:'right',paddingRight: 20,borderRadius: 100,
                              fontFamily:'Calibri-Regular', padding: 5, backgroundColor: COLORS.green,
                           width: 130,color:'white'}} >TURN OFF EMI</Text>
                       
                           
                        </TouchableOpacity>
                        ) : 
                            (<TouchableOpacity  onPress={AutoOn}>
                           
                              <Text style={{textAlign:'right',paddingRight: 20,borderRadius: 100,
                              fontFamily:'Calibri-Regular', padding: 5, backgroundColor: COLORS.green,
                           width: 130,color:'white'}} >TURN ON EMI</Text>
                        
                                
                            </TouchableOpacity>
                            )
                           

                }
            </View>

                   
                    <View style={{
                        backgroundColor: 'white', marginVertical: 15, borderRadius: 5,
                        marginHorizontal: 10
                    }}>

                        <View style={{
                            paddingHorizontal: 10, marginTop: 20,
                            justifyContent: 'space-between',
                        }}>
                            <Text style={styles.Text5}> YIELD </Text>
                            {/* <Text style={{
                                color: '#27666A', fontSize: 15,
                                marginBottom: 1, fontFamily: 'Calibri-Regular',
                            }}> Total Yield</Text> */}

                            <Text style={{
                                fontSize: 13, color: '#27666A', paddingLeft: 7, paddingBottom: 10,
                                borderBottomWidth: 1, borderColor: 'grey',
                            }}>Rs. {yieVal.totalYield}</Text>

                        </View>


                        <Text style={{ height: 25, marginVertical: 10, color: 'grey', fontFamily: 'Calibri-Regular', textAlign: 'center' }}> 
                        
                        </Text> 

                    </View>
                </View>
                {/* </View> */}


                <View style={styles.headers}>

                    <Card style={{ width: 370 }} >

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', padding: 5,fontFamily:'Calibri-bold',fontSize:20, }}> Count </Text>
                        </View>

                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginRight: 5 }}>
                            <RadioForm
                                radio_props={radio_props}
                                formHorizontal={true}
                                labelHorizontal={false}
                                buttonColor={'#2196f3'}
                                onPress={(value) => setChart(value)}
                            />
                        </View>
                        {chart === 0
                            ?
                            <VictoryChart
                                height={250}
                                width={350}
                                theme={VictoryTheme.material}
                                domainPadding={{ x: 20 }}
                                animate={{
                                    onLoad: { duration: 1000 },
                                    duration: 1000,
                                    easing: "bounce"
                                }}
                            >
                                <VictoryBar
                                    style={{
                                        data: {
                                            fill: ({ datum }) =>
                                                datum.name === 'Settled' ? 'green' :
                                                    datum.name === 'Offered' ? 'blue' :
                                                        datum.name === 'Accepted' ? '#92CDE2'
                                                            : 'violet',

                                            fillOpacity: 0.7,
                                            strokeWidth: 3
                                        },
                                        labels: {
                                            fontSize: 15,
                                            fill: ({ datum }) => datum.x === 'Settled' ? 'red' :
                                                datum.x === 'Accepted' ? 'green' :
                                                    datum.x === 'Offered' ? 'violet'
                                                        : 'blue'
                                        }
                                    }}
                                    labels={({ datum }) => {datum.x 
                                    datum.y}}

                                    data={pieData}
                                    x='name'
                                    y='allOfferCount'



                                    barRatio={0.8}
                                    animate={{
                                        onExit: {
                                            duration: 500,

                                        }
                                    }}

                                />
                            </VictoryChart>
                            : null
                        }
                        {chart === 1
                            ? <View style={{ alignItems: 'center' }}>

                                <VictoryChart height={250}
                                    width={350}
                                    theme={VictoryTheme.material}
                                    domainPadding={{ x: 20 }}
                                    animate={{
                                        onLoad: { duration: 1000 },
                                        duration: 1000,
                                        easing: "bounce"
                                    }}>
                                    <VictoryPie
                                        // width={300} // Adjust the width of the pie chart
                                        // height={300}
                                        innerRadius={0} // Adjust the inner radius to make the pie smaller
                                        //  labelRadius={80} // Adjust the distance of the labels from the center of the pie
                                        padding={50}
                                        colorScale={sliceColor}
                                        labels={({ datum }) => (datum.y === 0 ? "" : datum.x)}
                                        data={pieCount}
                                        x='name'
                                        y='allOfferCount'
                                    />
                                </VictoryChart>
                            </View>
                            : null
                        }
                        {chart === 2
                            ? <VictoryLine data={pieCount} x='name'
                                y='allOfferCount'
                                colorScale={sliceColor}
                            />

                            : null
                        }


                        <View style={{
                            width: windowWidth, paddingRight: 30,
                        }}>
                            {pieData.map((item, index) => {
                                return (
                                    <>

                                        <View style={styles.View8} key={index}>
                                            <Text style={{
                                                color: item.color, fontSize: 14, paddingHorizontal: 15
                                            }}>{item.name}:</Text>

                                            <View style={{ alignItems: 'flex-end', }} >
                                                <Text style={styles.Text7}>{item.allOfferCount}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            }

                            )}

                        </View>

                    </Card>

                </View>
                <View style={{ marginVertical: 20, alignItems: 'center' }}>

                    <Card style={{ width: 370 }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Text style={{ color: 'black', padding: 5, fontSize: 20,fontFamily:'Calibri-bold' }}> Amount </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginRight: 5 }}>
                            <RadioForm
                                radio_props={radioProps}
                                formHorizontal={true}
                                labelHorizontal={false}
                                buttonColor={'#2196f3'}
                                onPress={(value) => setChartA(value)}
                            />
                        </View>

                        <View style={styles.View10}>
                            {chartA === 0
                                ?
                                <VictoryChart
                                    height={250}
                                    width={350}
                                    theme={VictoryTheme.material}
                                    domainPadding={{ x: 20 }}
                                    animate={{
                                        onLoad: { duration: 500 },
                                        duration: 500,
                                        easing: "bounce"
                                    }}
                                >
                                    <VictoryBar
                                        data={pieAData}
                                        x='name'
                                        y='totalOfferedAmount'
                                        style={{
                                            data: {
                                                fill: ({ datum }) =>
                                                    datum.name === 'Settled' ? 'red' :
                                                        datum.name === 'Offered' ? 'blue' :
                                                            datum.name === 'Accepted' ? '#92CDE2'
                                                                : 'green',

                                                fillOpacity: 0.7,
                                                strokeWidth: 3
                                            },
                                            labels: {
                                                fontSize: 15,
                                                fill: ({ datum }) => datum.x === 'Settled' ? 'red' :
                                                    datum.x === 'Accepted' ? 'green' :
                                                        datum.x === 'Offered' ? 'violet'
                                                            : 'blue'
                                            }
                                        }}
                                        labels={({ datum }) => datum.x} />
                                    {/* <VictoryAxis/> */}
                                    {victoryAmount.map((d, i) => {
                                        return (
                                            <VictoryAxis dependentAxis
                                                key={i}
                                                label={d}
                                                style={{ tickLabels: { fill: 'none' } }}
                                                axisValue={d}
                                            />
                                        )
                                    })}
                                </VictoryChart>
                                : null
                            }
                            {chartA === 1
                                ? <VictoryPie
                                    width={300} // Adjust the width of the pie chart
                                    height={300}
                                    innerRadius={0} // Adjust the inner radius to make the pie smaller
                                    labelRadius={60} // Adjust the distance of the labels from the center of the pie
                                    padding={50}
                                    labels={({ datum }) => (datum.y === 0 ? "" : datum.x)}
                                    colorScale={sliceColor1}
                                    data={pieAmount} x='name'
                                    y='totalOfferedAmount' />
                                : null
                            }
                            {chartA === 2
                                ? <VictoryChart>
                                    <VictoryLine
                                        data={pieAmount} />
                                </VictoryChart>
                                : null
                            }

                        </View>

                        {pieAData.map((item, index1) => {
                            return (
                                <View style={styles.View8} key={index1}>
                                    <Text style={{ flexDirection: 'column', color: item.color, fontSize: 15, paddingHorizontal: 15 }}>{item.name}:</Text>
                                    <View style={{ alignItems: 'flex-end', }}>
                                        <Text style={styles.Text7}>{item.totalOfferedAmount}</Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>

                            )
                        }

                        )}
                    </Card>
                </View>


                <View style={styles.footer} >

                    {/* <Text style={{
                        color: 'black', textAlign: 'center', fontWeight: 'bold',
                        fontFamily: 'Georgia',
                        backgroundColor: "white",
                        paddingHorizontal: 35,
                        paddingVertical: 8

                    }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text> */}

                </View>

            </ScrollView>

            <View style={styles.footer1}>
                <View style={{ flex: 0.9 }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#5B5FB6',
                            borderBottomRightRadius: 30, borderTopRightRadius: 30, padding: 10,
                        }} onPress={() => navigation.navigate('NewInvoice')}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily:'Calibri-bold', }}>Invest</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <View style={{ flex: 1, backgroundColor:COLORS.green, borderRadius: 30, }}>
                    <TouchableOpacity onPress={fadeIn}>
                        <Text style={{
                            textAlign: 'center', paddingTop: 5,
                            fontSize: 25,color:'white', fontFamily:'Calibri-Regular',
                        }}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9 }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#5B5FB6',
                            borderBottomLeftRadius: 30, borderTopLeftRadius: 30, padding: 10,
                        }} onPress={() => navigation.navigate('NewReport')}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20,fontFamily:'Calibri-bold' }}> Report</Text>

                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </View>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.0,
        backgroundColor: '#5B5FB6',
        marginTop: 0,
        borderTopColor: 'white',
        borderTopWidth: 1
    },
    headers: {
        flex: 0.8,
        alignItems: 'center',
        marginVertical: 15,
    },
    footer: {
        alignItems: 'center',
        marginVertical: 5,
    },
    footer1: {
        flex: 0,
        flexDirection: 'row',
    },
   textInput1: { width: 250, alignItems: 'center' },


    View8: {
        paddingLeft: 5,
        paddingTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    Text1: { color: 'orange', fontSize: 20, paddingHorizontal: 8, },
    Text4: {
        color: 'black', textAlign: 'center', fontSize: 15,
        marginTop: 5, borderRadius: 5, paddingVertical: 7, width: 210
    },
    Text5: {
        color: 'grey', fontSize: 19, fontFamily: 'sans-serif',
        fontFamily:'Calibri-bold',
        marginBottom: 10

    },
    View10: {
        alignItems: 'center', justifyContent: 'center',

    },
    TextCount: {
        textAlign: 'center', fontSize: 15,
        paddingHorizontal: 20,
        color: 'black'
    },
    Text7: {
        paddingRight: 15, color: 'black',
        position: 'absolute',
        bottom: 0

    },
    centeredView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 50,
            height: 40,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    handleNominee: { padding: 10, paddingHorizontal: 20,borderRadius: 8,
        backgroundColor: '#5B5FB6',marginTop: 10 },
     

})


export default NewHome

