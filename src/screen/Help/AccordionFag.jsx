import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';

export default function AccordionFag({question,answer}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const regex = /(<([^>]+)>)/ig;
     
    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
      };

  return (
      <View style={{padding: 10}}>
         <TouchableOpacity onPress={toggleAccordion} style={{paddingHorizontal: 8}}>
        <Text style={{color: 'black', fontSize:20, borderWidth:1, borderColor:'grey'}}>{question.replace(regex, '')}</Text>
      </TouchableOpacity>
      {isExpanded && <Text style={{color: 'grey',fontSize:15}}>{answer.replace(regex, '')}</Text>}
                </View>
  )
}