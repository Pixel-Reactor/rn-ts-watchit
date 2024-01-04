import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../Interfaces';
const HandleStorage = async (movie:Movie, type:string) => {

  try {

    const get = await AsyncStorage.getItem(type);

    if (!get) {
    
      let newArray = [];
      newArray.push(movie);
      console.log(typeof (newArray), newArray);
      const stringArray = JSON.stringify(newArray);
      await AsyncStorage.setItem(type, stringArray);
    } else {
     
      let array = JSON.parse(get);
      const check = array.filter(item => item.id === movie.id);
      if (!check.length) {
        array.push(movie);
        const stringArray = JSON.stringify(array);
        await AsyncStorage.setItem(type, stringArray)
      }
      return 
    }
  } catch (error) {
    console.error('Error al guardar el objeto:', error);
  }
};


export default HandleStorage