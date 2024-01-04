import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { Movie } from '../Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieCardSaved from '../components/MovieCardSaved';
import { useIsFocused } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

const MyMovies = () => {
    const { searchType } = useMyContext();
    const [movies, setMovies] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {

        const GetMyMovies = async () => {
            const get = await AsyncStorage.getItem(searchType);
            if (get && get.length > 2) {

                const movies = JSON.parse(get)
                setMovies(movies);
                
            } else {
                setMovies(null);
            }
        }
        GetMyMovies();
        return () => {
            setMovies(null);
        }

    }, [searchType, isFocused]);
    return (
        <ScrollView className='bg-zinc-900 flex-[1] py-5' >

            <View className='bg-zinc-900 p-1 flex-row flex-wrap justify-around'>
                {movies ? movies.map((item:Movie) =>
                    <MovieCardSaved key={item.id} movie={item} setMovies={setMovies} searchType={searchType} />
                )
                    : <View className='h-[500] w-full items-center flex justify-center'>
                        <Text className='text-zinc-50 p-5 text-xl  '>Non c'è niente qui ,esplora e salva i tuoi film o serie!...
                        </Text>
                    </View>
                }
            </View>

        </ScrollView>
    );
}



export default MyMovies;
