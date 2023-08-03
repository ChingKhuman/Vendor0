import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BASE_URL } from "../../constants/Config";
import { COLORS, SIZES } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native";
import { SectionList } from "react-native";
import Accordion from "./Accordion";





const Glossary = () => {


    const [loading, setLoading] = useState(false)
    const [glossary, setGlosary] = useState([])

    const { userInfo } = useContext(AuthContext);



    const [activeSection, setactiveSection] = useState(null);
    const [activeTask, setactiveTask] = useState(null);
    const [isOpened, setisOpened] = useState(false);

    const ref = useRef()
    const regex = /(<([^>]+)>)/ig;

    // console.log(userInfo)
    const token = userInfo.data?.accessToken
    // console.log(token)
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
        setLoading(true)
        fetch(`${BASE_URL}/account/glossary`, requestOptions)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong.')

            }).
            then(function (myJson) {
                let result = myJson.data
                setGlosary(result)
              //  console.log('check...result..', result)
                setLoading(false)

            })
            .catch(function (error) {
                console.warn('Request failed', error)
                setLoading(false)
            })

    }

    useEffect(() => {
        getData()
    }, [])






    return (
        <ScrollView>
            <SafeAreaView>

                {/* <View>
                    <Text style={{ fontSize: SIZES.h2, padding: 7 }}> Glossary</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: SIZES.h4, padding: 7, color: 'orange' }}> Home /</Text>
                        <Text style={{ fontSize: SIZES.h4, padding: 7 }}>Glossary</Text>
                    </View>
                </View> */}

                <View>
                    <View style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        {/* <Spinner visible={loading} /> */}
                        <Text> New apply</Text>

                {/* {
                    glossary.map((category)=> (
                        <Accordion key={category.section} category={category} />
                    ))
                } */}

                   {/* {
                    glossary?.map ((category)=> (
                        <Accordion key={category.section}  
                          category={category}
                          data={category.sectionData.map((sub) => {
                            <View>
                                <Text> { sub.term}</Text>
                            <Text>{sub.definition}</Text>
                                </View>
                          } 
                           )}
                        //   data={category.sectionData.map(subCategory =>
                        //      subCategory.data).join(', ')}
         />
                    ))
                }  */}

                         {glossary.map(({ section, sectionData }, i) => {
                            return (
                                <>
                                    <View key={i}>
                                        <Text style={styles.heading}>{section}</Text>
                                        <View style={styles.sectiondata}>
                                            {sectionData.map(({ term, definition }, index) => {
                                                return (
                                                    <View style={{padding: 10}}>
                                                        <TouchableOpacity key={term}
                                                            // onPress={() => { setCurrentIndex(index === currentIndex ? null : index) }}
                                                            onPress={()=>{
                                                                     setactiveSection(i);
                                                                     setactiveTask(index);
                                                                     if( i===activeSection && index===activeTask){
                                                                        setisOpened(!isOpened);
                                                                     }
                                                            }}
                                                            activeOpacity={0.9} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{color: 'black', fontSize:20,fontFamily: 'serif', borderWidth:1,borderColor:'grey',
                                                        width:'100%', }} key={term}>{term.replace(regex, '')}</Text>
                                                        </TouchableOpacity>
                                                           {isOpened &&  i===activeSection && index===activeTask && (
                                                            <View>
                                                                <Text  style={{fontSize: 15, fontWeight: '800',fontFamily:'serif',
                                                            color: 'grey'}} key={definition}> {definition.replace(regex, '')}
                                                            </Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                )
                                            })}

                                        </View>
                                    </View>
                                </>
                            )
                        })} 
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Glossary;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        
        // textTransform: 'uppercase',
        letterSpacing: -2,
        color: 'black',

    },
    bodyterm: {
        fontsize: 40,
        fontWeight: '900',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
})
