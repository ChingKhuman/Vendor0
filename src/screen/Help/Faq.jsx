import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { BASE_URL } from "../../constants/Config";
import { Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Faq = () => {


    const [loading, setLoading] = useState(false)
    const [faq, setFaq] = useState([])
    const { userInfo } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(null)
    const ref = useRef()
    const screen = Dimensions.get('window').width;
    // console.log(userInfo)
    const token = userInfo.data?.accessToken
    console.log(token)
    const regex = /(<([^>]+)>)/ig;
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
        fetch(`${BASE_URL}/account/faqs`, requestOptions)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong.')

            }).
            then(function (myJson) {
                let result = myJson.data
                setFaq(result)
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
            <View>
                <View>
                    <Text style={{ fontSize: SIZES.h2, padding: 7 }}> Faqs</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: SIZES.h4, padding: 7, color: 'orange' }}> Home /</Text>
                        <Text style={{ fontSize: SIZES.h4, padding: 7 }}>Faqs</Text>
                    </View>
                </View>
                <Text> This is actual Data, Cant make dummy data. Confused on data format</Text>
                {/* <Spinner visible={loading} /> */}
                <View style={{paddingHorizontal: 10}}>
                    {faq.map(({question, answer}, index) => {
                        return (
                            <View style={{}} key={index}>
                                <TouchableOpacity key={question}
                                onPress={() => {setCurrentIndex(index === currentIndex ? null: index)}}
                                activeOpacity={0.9} style={{}}>
                                    <Text style={{color: 'blue',paddingHorizontal:5, fontSize:20, paddingVertical: 5,
                                borderWidth: 1, borderColor:'grey' }}>{question.replace(regex, '')}</Text>
                                </TouchableOpacity>
                                {index ===currentIndex && (
                                    <View>
                                        <Text> {answer.replace(regex, '')}</Text>
                                        </View>
                                )}
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}
export default Faq;