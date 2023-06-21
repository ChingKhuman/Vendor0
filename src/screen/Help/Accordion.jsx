import { View, Text } from 'react-native'
import React from 'react'



const Accordion = ({ title, content, define, term}) => {
    const [isActive, setIsActive] = useState(false);
     const [isAActive, setIsAActive] = useState(false);

     const sportsData = [
        { title: 'game1', content: 'Badminton' },
        { title: 'game2', content: 'Football' },
        { title: 'game3', content: 'Tennis' }
    ];
    // const sportsData =
    //     { title: 'game1', content: 'Badminton' }
    
    const { title, content } = sportsData;

    return (
        <View style={{ alignItems:"flex-start",  }}>
            <View style={{ justifyContent:'space-between', 
              width:350, margin: 10}} >
                <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }} onPress={() => setIsActive(!isActive)}>

                    <Text style={{  fontSize:SIZES.h1, 
                     }}>{title}</Text>

                    <Text style={{  }}>{isActive ? '-' : '+'}</Text>
                </TouchableOpacity>
            </View>
            {isActive && <Text style={{paddingHorizontal: 10}}>{content}</Text>}

            <View style={{justifyContent:'space-between', width:350, margin: 10}}> 
            <TouchableOpacity style={{flexDirection:'row',display:'flex', justifyContent: 'space-around'}} onPress={() => setIsAActive(!isAActive)}>
                <Text style={{fontSize: SIZES.h2}}>{define}</Text>
            </TouchableOpacity>
                    </View>
            {isAActive && <Text style={{paddingHorizontal:10}}>{term}</Text>} 
        </View>
    );
};

export default Accordion