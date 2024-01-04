import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useMyContext } from '../context/MyContext';

const MovieCard = ({ movie }) => {
 
    const {setdetails } = useMyContext();
   
    return (
        <View >
            <TouchableOpacity
            className='p-0 bg-red-100 w-[200] h-[300] shadow-md shadow-white/20 m-[2] my-[6] '
            onPress={()=>{setdetails({on:true,data:movie,id:movie.id})}} key={movie.id} >
                
                <ImageBackground
                    source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500` + movie.poster_path : '/no-poster.png' }}
                    className='object-cover flex-[1]'
                />
            </TouchableOpacity>
        </View>
    )
}

export default MovieCard
