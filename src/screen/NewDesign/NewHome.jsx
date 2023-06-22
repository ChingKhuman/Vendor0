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


    const [pieCount, setPieCount] = useState([0, 0, 0, 0]);
    const [pieAmount, setPieAmount] = useState([0, 0, 0, 0])
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
                console.log('checking the count', cont)
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

    var countArray = [];
    series1.forEach(ele => countArray.push(+ele))
    console.log(countArray)

    const sliceColor = ['green', 'blue', 'violet', '#92CDE2']

    const widthAndHeight1 = 180
    const SeriesA = pieAmount.map(i =>
        i.totalOfferedAmount
    )
    var numberArray = SeriesA.map(Number);
    // console.log(numberArray)

    var numberArray = [];
    length = SeriesA.length;
    for (var i = 0; i < length; i++)
        numberArray.push(parseInt(SeriesA[i]));

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

    const graphicColor = ['#388087', '#6fb3b8', '#badfe7', 'red']; // Colors
    const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
    const defaultGraphicData = [-100, 0, 0, 100]; // Data used to make the animate prop work


    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(countArray); // Setting the data that we want to display
    }, []);


    const [chart, setChart] = useState(0)

    const radio_props = [
        { label: 'Bar', value: 0 },
        { label: 'Pie', value: 1 },
        { label: 'Area', value: 2 }
    ]

    const radioProps = [
        { label: 'Bar', value: 0 },
        { label: 'Pie', value: 1 },
        { label: 'Area', value: 2 }
    ]

    return (
        <>
            <View style={styles.container}>

            </View>


            <View style={styles.headers}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                    <View>
                        <View>

                            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                            </View>

                            <View style={{
                                paddingHorizontal: 80, paddingBottom: 20
                            }}>
                                <Text style={styles.Text5}> Total Yield: {yieVal.totalYield}</Text>

                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <RadioForm
                                    radio_props={radio_props}
                                    formHorizontal={true}
                                    labelHorizontal={false}
                                    buttonColor={'#2196f3'}
                                    onPress={(value) => setChart(value)}
                                />
                            </View>
                            <ScrollView>
                            <>

                                <Card style={{ height: "45%", width: 350 }}>

                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.Text4}>Offer Counts Details</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: windowWidth, justifyContent: 'center', paddingRight: 30
                                    }}>

                                        {pieData.map((item, index) => (
                                            <>

                                                <View style={styles.View8}>

                                                    <Text style={{
                                                        textAlign: 'justify', color: item.color, fontSize: 14,

                                                    }}>{item.name}:</Text>
                                                    <Text style={styles.Text7}>{item.allOfferCount}</Text>

                                                </View>

                                            </>
                                        ))}
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
                                            {chart === 0
                                                ? <VictoryBar
                                                    style={{ data: { fill: "#c43a31" } }}
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
                                </Card>



                            </>

                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <RadioForm
                                    radio_props={radioProps}
                                    formHorizontal={true}
                                    labelHorizontal={false}
                                    buttonColor={'#2196f3'}
                                    onPress={(value) => setChart(value)}
                                />
                            </View>



                            <Card style={{ height: "45%", width: 360, marginTop: 20 }}>
                                <View style={{
                                    marginTop: 20, paddingHorizontal: 80
                                    , borderColor: 'black'
                                }}>
                                    <Text style={styles.Text4}>Offer Amount Details</Text>
                                </View>
                                <>
                                    <View >
                                        {pieAData.map((item, index) =>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                                                <Text style={{ flexDirection: 'column', color: item.color, fontSize: 15 }} key={index}>{item.name}:</Text>


                                                <Text style={styles.Text7}>{item.totalOfferedAmount}</Text>
                                                <View >


                                                </View>
                                            </View>
                                        )}
                                        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                          

                                            {/* <PieChart
                                                widthAndHeight={widthAndHeight1}
                                                series={[3, 2, 0, 1]}
                                                sliceColor={sliceColor1}
                                                doughnut={true}
                                                coverRadius={0.45}
                                                coverFill={'#FFF'} /> */}

                                            <VictoryChart
                                                height={250}
                                                width={350}
                                                theme={VictoryTheme.material}
                                                domainPadding={{ x: 20 }}
                                                
                                            > 
                                                {chart === 0
                                                    ? <VictoryBar
                                                        style={{ data: { fill: "#c43a31" } }}
                                                        data={pieAmount}
                                                        x='name'
                                                        y='allOfferAmount'
                                                        colorScale={sliceColor}
                                                        barRatio={0.8}
                                                       
                                                    />
                                                    : null
                                                }
                                                {chart === 1
                                                    ? <VictoryPie
                                                     data={pieAmount} x='name'
                                                        y='allOfferAmount' />
                                                    : null
                                                }
                                                {chart === 2
                                                    ? <VictoryArea data={pieAmount} x='name'
                                                        y='allOfferAmount' />
                                                    : null
                                                }


                                                <VictoryAxis
                                                    style={{
                                                        axisLabel: { padding: 30 },
                                                    }}
                                                   
                                                />
                                                <VictoryAxis dependentAxis

                                                    style={{
                                                        axisLabel: { padding: 40 }
                                                    }}
                                                />
                                            </VictoryChart>



                                        </View>
                                    </View></>
                            </Card>
                            </ScrollView>
                        </View>



                    </View>
                    <View style={styles.footer} >

                    <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: 30, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>
                </View>
                </ScrollView>
                



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


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        marginTop: 0
    },
    headers: {
        flex: 5,
        alignItems: 'center',
        paddingLeft: 15,
        borderColor: 'black',
        borderWidth: 1
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10
    },
    footer1: {
        flex: 0.4,
        flexDirection: 'row'
    },
    View10: {

    },
    View8: {
        paddingLeft: 5,
        paddingTop: 15,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'

    },

    Text7: { color: 'white', },
    Text1: { color: 'orange', fontSize: 20, paddingHorizontal: 8, },
    Text4: {
        color: 'black', textAlign: 'center', fontSize: 20, color: 'white',
        marginTop: 20, backgroundColor: 'green', borderRadius: 5, paddingVertical: 7, width: 210
    },
    Text5: {
        color: 'black', textAlign: 'center', fontSize: 20,
        marginTop: 20, backgroundColor: 'orange', color: 'black', paddingVertical: 7,
        borderRadius: 5
    },
    View10: {
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 20,

    },
    TextCount: {
        textAlign: 'center', fontSize: 15,
        paddingHorizontal: 20,
        color: 'black'
    },
    Text7: { flexDirection: 'row', color: 'black', textAlign: 'center' },

})



export default NewHome

