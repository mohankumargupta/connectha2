import { useState } from 'react';
import { View, Text } from 'react-native';
import { PaperProvider, TextInput } from 'react-native-paper';

// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

const icons: { [key in string]: number } = {
  ...MaterialCommunityIcons,
};

export default function IconsList() {
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
    </PaperProvider>
    
  );
}