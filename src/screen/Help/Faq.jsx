import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { BASE_URL } from "../../constants/Config";
import { Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AccordionFag from "./AccordionFag";

const Faq = () => {


    const [loading, setLoading] = useState(false)
    const [faq, setFaq] = useState([])
    const { userInfo } = useContext(AuthContext)
    // console.log(userInfo)
    const token = userInfo.data?.accessToken
    // console.log(token)
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
                //   console.log('check...result..', result)
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

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
      };
    const FaqAccordion =({question,answer})=> {
      
        <View>
           
            <TouchableOpacity onPress={toggleAccordion}>
        <Text>{question}</Text>
      </TouchableOpacity>
      {isExpanded && <Text>{answer}</Text>}
                </View>
        
    }


    return (
        <ScrollView>
            <View style={{paddingHorizontal: 8}}>
                <View>
                    <Text style={{ fontSize: 20, padding: 7,textAlign:"center", fontFamily:'Calibri-Regular',
                 }}> Frequently Ask </Text>
                    
                </View>
                    {/* <Spinner visible={loading} /> */}
                <View style={{paddingHorizontal: 10}}>
                   
                {
                    faq.map((item, index)=> (
                        <AccordionFag key={index} question={item.question}
                        answer={item.answer}
                       />
                   
                    ))
                }
                    {/* {faq.map(({question, answer}, index) => {
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
                    })} */}
                </View>
            </View>
        </ScrollView>
    )
}
export default Faq;