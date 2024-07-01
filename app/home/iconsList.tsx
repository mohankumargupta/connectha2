import { useState } from 'react';
import { View, Text } from 'react-native';
import { PaperProvider, TextInput } from 'react-native-paper';

// @ts-ignore
import MDIGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];


const icons: { [key in string]: number } = {
  ...MDIGlyphMap,
};

export default function IconsList() {
  //const iconName: MaterialIconName =  'play'
  
  const [query, setQuery] = useState('');
  
  const iconNames = Object.keys(icons).filter(
    (item) =>
      item.includes(query.toLowerCase().replace(/\s/g, '-')) ||
      item.replace(/-/g, '').includes(query.toLowerCase())
  );

  const iconNamesExact = Object.keys(icons).includes(query.toLowerCase());

  return (
    <PaperProvider>
       <TextInput
         label="Icon"
         value={query}
         onChangeText={text => setQuery(text)}
       /> 
       <Text>{iconNames.length}</Text>
       <Text>{iconNames[0]}</Text>
       <Text>{iconNamesExact? "match": "no match"}</Text>
       <Text style={{fontFamily: "material-community"}}>{String.fromCodePoint(983705)}</Text>
       
       { iconNamesExact && <MaterialCommunityIcons name={query} size={24} color="black" /> }
    </PaperProvider>
    
  );
}