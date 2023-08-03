import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';



const Accordion = ({category,data}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [subCat, setsubCat] = useState(false)

    


    return (
   <View>
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={{color:'black', fontSize: 20}}>{category.section}</Text>
      </TouchableOpacity>
      {
        isExpanded && (
            <View>
              <Text> {data.term}</Text>
                {/* {category.sectionData.map(sub => 
                            {
                                <><TouchableOpacity onPress={()=> setsubCat(!subCat)}>
                                    <Text >{sub.term}</Text>
                                </TouchableOpacity>
                                {subCat && (
                                    <View>
                                        <Text>{sub.definition}</Text>
                                    </View>
                                )}

                                </>
                            })} */}
                </View>
        )
      }
      {/* {isExpanded && (
        <View>
          {category.sectionData.map((i, index) => (
            <Text key={index._glossaryID}>{i.term}</Text>
          ))}
        </View>
      )} */}

   </View>
    );
};

export default Accordion