import React from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HandleDelete = async(movie,searchType,setMovies) => {
try {
 
const list = await AsyncStorage.getItem(searchType);

const array = JSON.parse(list);
const newArray = array.filter(item => item.id != movie.id);
setMovies(newArray);
const stringArray = JSON.stringify(newArray);
const Save = await AsyncStorage.setItem(searchType,stringArray);
} catch (error) {
    console.log(error)
}



};




export default HandleDelete;
