import { View,  TouchableOpacity,ImageBackground,Image } from 'react-native'
import React from 'react'
import { useMyContext } from '../context/MyContext';
import { Ionicons } from '@expo/vector-icons';
import HandleDelete from '../storage/HandleDelete';

const MovieCardSaved = ({ movie,searchType,setMovies}) => {

    const {setdetails } = useMyContext();
    
    return (
        <View className='relative' >
            <TouchableOpacity 
            onPress={() => { setdetails({ on: true, data: movie, id: movie.id }) }} 
            key={movie.id}   
            className='p-0 bg-red-100 w-[200] h-[300] shadow-md shadow-white/20 m-[2] my-[6] '>
                {!movie.poster_path ?
                <ImageBackground
                className='object-cover flex-[1]'
                source={require('../assets/claqueta.png')}
              /> : <ImageBackground
              source={{ uri:  `https://image.tmdb.org/t/p/w500` + movie.poster_path}}
              className='object-cover flex-[1]'
          />}
               
                <TouchableOpacity 
                onPress={()=>HandleDelete(movie,searchType,setMovies)}
                className='flex-[1] items-center justify-center rounded-full absolute w-[35] h-[35] bg-red-600 top-[-6] right-[-6] border-2 border-white'
                 >
                <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    )
}

export default MovieCardSaved
