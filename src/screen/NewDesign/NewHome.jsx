import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, Dimensions, Animated } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native'
import PieChart from 'react-native-pie-chart';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Card } from 'react-native-paper';
import { Slice, VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryPie, VictoryTheme } from 'victory-native';
import { Svg } from 'react-native-svg';
import RadioForm from 'react-native-simple-radio-button';





const NewHome = ({ navigation }) => {


    const [pieCount, setPieCount] = useState([]);
    const [pieAmount, setPieAmount] = useState([])
    const [yieVal, setYieVal] = useState('')
    const [loading, setLaoding] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [show, setShow] = useState(true)

    const [pieData, setpieData] = useState([]);

    const [pieAData, setpieAData] = useState([])


    const Tab = createBottomTabNavigator();

    const { userInfo } = useContext(AuthContext);
    // // console.log(userInfo)
    const token = userInfo.data?.accessToken;
    console.log('token....', token);

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
            //   console.log('checking the count', cont)
                let Color = ['green', 'blue', 'violet', '#92CDE2']
                let colorData = cont.map((row, index) => {
                    return {
                        name: row.name,
                        allOfferCount: row.allOfferCount,
                        color: Color[index]
                    }
                });
                // console.log("Meraj Color Response = ", colorData);
                setLaoding(false)
                setpieData(colorData)


            }).catch(function (error) {
                console.log(error)
                setLaoding(false)
            })

    }
    useEffect(() => {
        getData()
    }, []);

//    const sortCount = pieCount.sort((r1, r2) => (r1.allOfferCount > r2.allOfferCount) ? 1 : (r1.allOfferCount < r2.allOfferCount) ? -1 : 0);
const sortCount = pieCount.sort(function(a, b ){
    return  a.allOfferCount - b.allOfferCount
})

    	// console.log(sortCount)

    const getData1 = () => {
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson?.data.amount;
                setPieAmount(cont)
                // console.log('checking Data...........,', cont)

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
                console.log(error)
            })

    }
    useEffect(() => {
        getData1()
    }, []);

    const getDataYield = () => {
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let Yield = myJson?.data.yield;
                // console.log('check the data...', Yield)
                setYieVal(Yield);

            }).catch(function (error) {
                console.log(error)
            })

    }
    useEffect(() => {
        getDataYield()
    }, []);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const widthAndHeight = 180
    const series1 = pieCount.map(item =>
        item.allOfferCount
    )
    // var countArray =[];
    // length = series1.length;
    // for(var i = 0; i < length; i++)
    // countArray.push(parseInt(series1[i]));
    // var countArray = series1.map(Number)

    // var countArray = [];
    // series1.forEach(ele => countArray.push(+ele))
    // console.log(countArray)

     const sliceColor = ['green', 'blue', 'violet', '#92CDE2']

    // const widthAndHeight1 = 180
    // const SeriesA = pieAmount.map(i =>
    //     i.totalOfferedAmount
    // )
    // var numberArray = SeriesA.map(Number);
    // // console.log(numberArray)

    // var numberArray = [];
    // length = SeriesA.length;
    // for (var i = 0; i < length; i++)
    //     numberArray.push(parseInt(SeriesA[i]));

     const sliceColor1 = ['red', 'blue', 'green', '#2C5AA2']

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
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


    //--------------------------Victory---------


    const [chart, setChart] = useState(0)
    const [chartA, setChartA] = useState(0)

    const radio_props = [
        { label: 'Bar', value: 0 },
        { label: 'Pie', value: 1 },
        { label: 'Area', value: 2 }
    ]

    const radioProps = [
        { label: 'Bar', value: 3 },
        { label: 'Pie', value: 4 },
        { label: 'Area', value: 5 }
    ]

    const animation = useRef(new Animated.Value(0)).current;
    const [isButtonClick, setIsButtonClick] = useState(false);

    const toggleButton = () => {
        let toValue = isButtonClick ? 0 : 1;
        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();
        setIsButtonClick(!isButtonClick);
    };
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    };
    const style1 = {
        transform: [
            {
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                })
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120]
                })
            }
        ]
    };
    const style2 = {
        transform: [
            {
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                })
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -130]
                })
            }
        ]
    };
    return (

        <>
            <ScrollView
                // contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    <View style={{
                        backgroundColor: 'white', marginVertical: 29, borderRadius: 5,
                        marginHorizontal: 10

                    }}>

                        <View style={{
                            paddingHorizontal: 10, marginVertical: 20,
                            justifyContent: 'space-between',


                        }}>
                            <Text style={styles.Text5}> YIELDS </Text>
                            <Text style={{
                                color: '#27666A', fontSize: 15,
                                marginBottom: 1, fontFamily: 'sans-serif'
                            }}> Total Yield</Text>

                            <Text style={{ fontSize: 13, color: '#27666A', paddingLeft: 7 }}>Rs/- {yieVal.totalYield}</Text>

                        </View>

                        <View style={{
                            borderTopWidth: 1, borderTopColor: 'grey',
                            height: 40, paddingTop: 10
                        }}>
                            <Text style={{ color: 'blue', fontFamily: 'sans-serif', textAlign: 'center' }}>  View all</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.headers}>




                    <View style={{marginTop: 15}}>
                        <Card style={{width: 370}} >

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'black', padding: 5, }}>Offer Counts Details</Text>
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
                                    {chart === 0
                                        ? <VictoryBar

                                            data={pieCount}
                                            x='name'
                                            y='allOfferCount'
                                            colorScale={sliceColor}
                                            barRatio={0.8}
                                            animate={{
                                                onExit: {
                                                    duration: 500,
                                                    before: () => ({
                                                        _y: 0,
                                                        fill: "orange",
                                                        label: "name"
                                                    })
                                                }
                                            }}
                                            labelComponent={
                                                <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />
                                            }
                                        />
                                        : null
                                    }
                                    {chart === 1
                                        ? <VictoryPie
                                            colorScale={sliceColor}
                                            data={pieCount} x='name'
                                            y='allOfferCount' />
                                        : null
                                    }
                                    {chart === 2
                                        ? <VictoryArea data={pieCount} x='name'
                                            y='allOfferCount'
                                            colorScale={sliceColor}
                                        />

                                        : null
                                    }


                                    <VictoryAxis
                                        style={{
                                            axisLabel: { padding: 30 },


                                        }}
                                        colorScale={sliceColor}
                                    />
                                    <VictoryAxis dependentAxis

                                        style={{
                                            axisLabel: { padding: 40 }
                                        }}
                                    />
                                </VictoryChart>
                            
                            <View style={{

                                width: windowWidth, paddingRight: 30,
                            }}>

                                {pieData.map((item, index) => (
                                    <>
                                        <View style={styles.View8}>
                                            <Text style={{
                                                color: item.color, fontSize: 14, paddingHorizontal: 15
                                            }}>{item.name}:</Text>

                                            <View style={{ alignItems: 'flex-end', }}>
                                                <Text style={styles.Text7}>{item.allOfferCount}</Text>
                                            </View>
                                        </View>


                                    </>
                                ))}

                            </View>

                        </Card>
                    </View>

                    <View >
                        
                            <View style={{
                                alignItems: 'center',
                                borderTopWidth: 1,
                                marginTop: 20
                            }}>
                                <Text style={{ color: 'black', padding: 5, fontSize: 20 }}>Offer Amount Details</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginTop: 5, marginRight: 5 }}>
                                <RadioForm
                                    st
                                    radio_props={radioProps}
                                    formHorizontal={true}
                                    labelHorizontal={false}
                                    buttonColor={'#2196f3'}
                                    onPress={(value) => setChartA(value)}
                                />
                            </View>

                            <View style={styles.View10}>

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
                                    {chartA === 3
                                        ? <VictoryBar

                                            data={pieAmount}
                                            x='name'
                                            y='totalOfferedAmount'
                                            colorScale={sliceColor1}
                                            barRatio={0.8}
                                            animate={{
                                                onExit: {
                                                    duration: 500,
                                                    before: () => ({
                                                        _y: 0,
                                                        fill: "orange",
                                                        label: "name"
                                                    })
                                                }
                                            }}
                                            labelComponent={
                                                <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />
                                            }
                                        />
                                        : null
                                    }
                                    {chartA === 4
                                        ? <VictoryPie
                                            colorScale={sliceColor1}
                                            data={pieAmount} x='name'
                                            y='totalOfferedAmount' />
                                        : null
                                    }
                                    {chartA === 5
                                        ? <VictoryArea colorScale={sliceColor1}
                                            data={pieAmount} x='name'
                                            y='totalOfferedAmount'
                                        />

                                        : null
                                    }


                                    <VictoryAxis
                                        style={{
                                            axisLabel: { padding: 30 },


                                        }}
                                        colorScale={sliceColor}
                                    />
                                    <VictoryAxis dependentAxis

                                        style={{
                                            axisLabel: { padding: 40 }
                                        }}
                                    />
                                </VictoryChart>
                            </View>
                            {pieAData.map((item, index) =>
                                <View style={styles.View8} >
                                    <Text style={{ flexDirection: 'column', color: item.color, fontSize: 15 }} key={index}>{item.name}:</Text>
                                    <View style={{ alignItems: 'flex-end', }}>
                                        <Text style={styles.Text7}>{item.totalOfferedAmount}</Text>
                                    </View>


                                    <View >


                                    </View>
                                </View>
                            )}

                       
                    </View>


                    <View style={styles.footer} >

                        <Text style={{
                            color: 'black', textAlign: 'center', fontWeight: 'bold',
                            fontFamily: 'Georgia',
                            backgroundColor: 'white',
                            paddingHorizontal: 35,
                            paddingVertical: 15

                        }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>
                    </View>
                </View>
              




                <View style={styles.footer1}>
                    <View style={{ flex: 0.6 }}>
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <TouchableOpacity style={{ backgroundColor: 'powderblue', }} onPress={() => navigation.navigate('NewInvoice')}>
                                <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'black', fontSize: 20 }}>Invest</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'orange', borderRadius: 30, }}>

                        <TouchableOpacity onPress={fadeIn}>
                            <Text style={{
                                textAlign: 'center', paddingTop: 8,
                                fontSize: 30
                            }}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <TouchableOpacity style={{ backgroundColor: 'powderblue' }} onPress={() => navigation.navigate('NewReport')}>
                                <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'black', fontSize: 20 }}> Report</Text>

                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>


            </ScrollView>
          
                <View style={{
                    position: "absolute",
                    bottom: 20,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            toggleButton();
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('NewInvoice')}>
                        <Animated.View
                            style={[
                                {
                                    width: 120,
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "grey"
                                },
                                style2
                            ]}
                        >
                            <Text style={{ fontSize: 30, color: 'black' }}>Invest</Text>
                        </Animated.View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            toggleButton();
                        }}
                    >
                         <TouchableOpacity 
                       onPress={() =>  navigation.navigate('NewReport')}>
                        <Animated.View
                            style={[
                                {
                                    width: 120,
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "grey"
                                },
                                style1
                            ]}
                        >
                            <Text style={{ fontSize: 30, color: 'black', }} > Reports</Text>
                        </Animated.View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            height: 50,
                            width: 60,
                            position: "absolute",
                            bottom: 0,


                        }}
                        onPress={() => {
                            toggleButton();
                        }}
                    >
                      
                       <Animated.View
                            style={[
                                {
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    

                                },
                                rotation
                            ]}
                        >
                            <Text style={{ fontSize: 80,margin: -40, color: 'black' }} >+</Text>
                        </Animated.View>
                     
                    </TouchableOpacity>
                </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        backgroundColor: '#5B5FB6',
        marginTop: 0,
        borderTopColor: 'white',
        borderTopWidth: 1
    },
    headers: {
        flex: 2.7,
        alignItems: 'center',
        backgroundColor: '#C5C9C9',
        borderColor: 'black',
        borderWidth: 1
    },
    footer: {
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white'

    },
    footer1: {
        flex: 0.5,
        flexDirection: 'row',
    },
    footer2: {

        backgroundColor: 'grey'
    }
    ,
    View8: {
        paddingLeft: 5,
        paddingTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    Text1: { color: 'orange', fontSize: 20, paddingHorizontal: 8, },
    Text4: {
        color: 'black', textAlign: 'center', fontSize: 15,
        marginTop: 5, borderRadius: 5, paddingVertical: 7, width: 210
    },
    Text5: {
        color: 'grey', fontSize: 19, fontFamily: 'sans-serif',
        fontWeight: 'bold',
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
       
        position:'absolute',
        bottom: 0
    },

})



export default NewHome

