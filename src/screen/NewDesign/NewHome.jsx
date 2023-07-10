import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, Dimensions, Animated } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { Card } from 'react-native-paper';
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryPie, VictoryTheme } from 'victory-native';
import RadioForm from 'react-native-simple-radio-button';
import { COLORS } from '../../constants/theme';





const NewHome = ({ navigation }) => {


    const [pieCount, setPieCount] = useState([]);
    const [pieAmount, setPieAmount] = useState([])
    const [yieVal, setYieVal] = useState([])
    const [loading, setLaoding] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [pieData, setpieData] = useState([]);
    const [pieAData, setpieAData] = useState([])
    const { userInfo } = useContext(AuthContext);
    const token = userInfo.data?.accessToken;
    console.log(token)


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
                setPieAmount(cont)
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

    const sortAmount = pieAmount.sort(function (a, b) {
        return a.totalOfferedAmount - b.totalOfferedAmount
    })

        const victoryAmount = pieAmount.map(a => a.name)
         console.log(victoryAmount)
 

    const getDataYield = () => {
        fetch(`${BASE_URL}/dashboard/dashboardsummary`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let Yield = myJson?.data.yield;
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


    const series1 = pieCount.map(item =>
        item.allOfferCount
    )

    

    
        // Set different color styles based on x value
        let getColorBasedOnX = pieCount.map(i => 
           {
            if (i.name === 'Settled') {
                return 'green';
              } else if (i.name === 'Offered') {
                return 'blue';
              } else if (i.name === 'Accepted') {
                return '#92CDE2';
              } else {
                return 'violet';
            }
           }
            )
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
        { label: 'Area', value: 2 }
    ]

    const radioProps = [
        { label: 'BarA', value: 0 },
        { label: 'PieA', value: 1 },
        { label: 'Area', value: 2 }
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
            {/* <View > */}
               
                    <View style={styles.container}>
                        <View style={{
                            backgroundColor: 'white', marginVertical: 30, borderRadius: 5,
                            marginHorizontal: 10
                        }}>

                            <View style={{
                                paddingHorizontal: 10, marginTop: 20,
                                justifyContent: 'space-between',
                            }}>
                                <Text style={styles.Text5}> YIELDS </Text>
                                <Text style={{
                                    color: '#27666A', fontSize: 15,
                                    marginBottom: 1, fontFamily: 'sans-serif',
                                }}> Total Yield</Text>

                                <Text style={{ fontSize: 13, color: '#27666A', paddingLeft: 7, paddingBottom: 10 ,
                            borderBottomWidth:1, borderColor:'grey',}}>Rs. {yieVal.totalYield}</Text>

                            </View>

                           
                                <Text style={{height: 25,marginVertical:10, color: 'blue', fontFamily: 'sans-serif', textAlign: 'center' }}>  Note: The ....</Text>
                           
                        </View>
                          </View>
                    {/* </View> */}

                    <View style={styles.headers}>
                       
                            <Card style={{ width: 370 }} >

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
                                                fill: ({ datum}) => 
                                                datum.name ==='Settled' ? 'green':
                                                datum.name === 'Offered' ? 'blue':                                               
                                                datum.name === 'Accepted'  ? '#92CDE2'
                                                : 'violet',
                                                
                                                fillOpacity: 0.7,
                                                strokeWidth: 3
                                            },
                                            labels: {
                                                fontSize: 15,
                                                fill: ({datum}) => datum.x ===  'Settled' ? 'red': 
                                                datum.x === 'Accepted'  ? 'green':
                                                datum.x === 'Offered' ? 'violet'
                                                : 'blue'
                                            }
                                          }}
                                          labels = {({ datum }) => datum.x}
                                            
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
                                        <VictoryPie
                                            width={300} // Adjust the width of the pie chart
                                            height={300}
                                            innerRadius={0} // Adjust the inner radius to make the pie smaller
                                             labelRadius={80} // Adjust the distance of the labels from the center of the pie
                                            padding={50}
                                            colorScale={sliceColor}
                                            data={pieCount}
                                            x='name'
                                            y='allOfferCount'
                                        />
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
                                    width: windowWidth, paddingRight: 30,}}>
                                    {pieData.map((item, index) => (
                                        <>
                                            <View style={styles.View8} key={index.id}>
                                                <Text style={{
                                                    color: item.color, fontSize: 14, paddingHorizontal: 15
                                                }}>{item.name}:</Text>

                                                <View style={{ alignItems: 'flex-end', }} >
                                                    <Text style={styles.Text7}>{item.allOfferCount}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ))}

                                </View>

                            </Card>
                       
                            </View>
                        <View style={{ marginVertical: 20 }}>

                            <Card style={{ width: 370 }}>
                                <View style={{
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                    <Text style={{ color: 'black', padding: 5, fontSize: 20 }}>Offer Amount Details</Text>
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
                                                        fill: ({ datum}) => 
                                                        datum.name ==='Settled' ? 'red':
                                                        datum.name === 'Offered' ? 'blue':                                               
                                                        datum.name === 'Accepted'  ? '#92CDE2'
                                                        : 'green',
                                                        
                                                        fillOpacity: 0.7,
                                                        strokeWidth: 3
                                                    },
                                                    labels: {
                                                        fontSize: 15,
                                                        fill: ({datum}) => datum.x ===  'Settled' ? 'red': 
                                                        datum.x === 'Accepted'  ? 'green':
                                                        datum.x === 'Offered' ? 'violet'
                                                        : 'blue'
                                                    }
                                                  }}
                                                  labels = {({ datum }) => datum.x}
                                            />
                                            <VictoryAxis/>
                                            {victoryAmount.map((d, i ) => {
                                                return (
                                                    <VictoryAxis dependentAxis
                                                    key={i}
                                                    label={d}
                                                    style={{tickLabels: {fill: 'none'}}}
                                                    axisValue= {d}
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
                                            colorScale={sliceColor1}
                                            data={pieAmount} x='name'
                                            y='totalOfferedAmount' />
                                        : null
                                    }
                                    {chartA === 2
                                        ? <VictoryChart>
                                            <VictoryLine
                                            data={pieAmount}/>
                                        </VictoryChart>
                                        : null
                                    }

                                </View>

                                {pieAData.map((item, index1) =>
                                    <View style={styles.View8} key={index1.id}>
                                        <Text style={{ flexDirection: 'column', color: item.color, fontSize: 15 }}>{item.name}:</Text>
                                        <View style={{ alignItems: 'flex-end', }} key={index1}>
                                            <Text style={styles.Text7}>{item.totalOfferedAmount}</Text>
                                        </View>
                                        <View >
                                        </View>
                                    </View>
                                )}
                            </Card>
                        </View>
                  

                    <View style={styles.footer} >

                        <Text style={{
                            color: 'black', textAlign: 'center', fontWeight: 'bold',
                            fontFamily: 'Georgia',
                            backgroundColor: "white",
                            paddingHorizontal: 35,
                            paddingVertical: 8

                        }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

                    </View>
               
             </ScrollView>

                  <View style={styles.footer1}>
                <View style={{ flex: 0.9 }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'powderblue',
                            borderBottomRightRadius: 30, borderTopRightRadius: 30,padding: 10,
                        }} onPress={() => navigation.navigate('NewInvoice')}>
                            <Text style={{ textAlign: 'center',  color: 'black', fontSize: 20 }}>Invest</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'orange', borderRadius: 30, }}>
                    <TouchableOpacity onPress={fadeIn}>
                        <Text style={{
                            textAlign: 'center', paddingTop: 10,
                            fontSize: 25
                        }}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9 }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'powderblue',
                            borderBottomLeftRadius: 30, borderTopLeftRadius: 30,padding: 10,
                        }} onPress={() => navigation.navigate('NewReport')}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}> Report</Text>

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
        // backgroundColor: '#05375a',
        marginTop: 0,
        borderTopColor: 'white',
        borderTopWidth: 1
    },
    headers: {
        flex: 0.8,
        alignItems: 'center',
        // backgroundColor: '#C5C9C9',
        marginVertical: 15,
        // borderColor: 'black',
        // borderWidth: 1
    },
    footer: {
        alignItems: 'center',
        marginVertical: 5,
    },
    footer1: {
        flex: 0,
        flexDirection: 'row',
        
    },


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

        position: 'absolute',
        bottom: 0
    },

})


export default NewHome

