import { View, Text, TextInput,  TouchableOpacity, ScrollView,Keyboard } from 'react-native'
import React, { useState } from 'react'
import Loader from './Loader';
import MovieCard from '../components/MovieCard';
import { useMyContext } from '../context/MyContext';


const Search = () => {
  const { searchType ,language} = useMyContext();
  const [form, setform] = useState({ movie: ''});
  const [loading, setloading] = useState(false);
  const [searchData, setsearchData] = useState(null);
  const [notFound, setnotFound] = useState(false)

  const HandleSearch = async (query) => {
    
    try {
      setnotFound(false)
      const Movieurl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=${language.id}&page=1`;
      const Seriesurl = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=${language.id}&page=1`;
      setloading(true);
      Keyboard.dismiss();
      const res = await fetch(searchType === 'tv' ? Seriesurl : Movieurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      })
     
      const data = await res.json();

      if (data && data.results.length){
          setsearchData(data.results);
          
      }else{
        setnotFound(true);
       
      }
    } catch (error) {
      console.log('catch',error);
      setnotFound(true);
      return null
    }finally{
      setloading(false)
    }
  };
  return (
    <View className='bg-zinc-900 flex h-full p-1  py-5'>
      
      <TextInput
        className='border-2 border-blue-500 w-full my-1 rounded-md p-2 px-4 text-zinc-50'
        placeholder='Buscar por nombre'
        placeholderTextColor='#ffffff'
        value={form.movie}
        onChangeText={text => setform({ ...form, movie: text })}
      />
      
      <TouchableOpacity
        disabled={form.movie ? false : true}
        onPress={() => HandleSearch(form.movie)}
        className='bg-blue-500 p-3 rounded-md mt-2'
      >
        <Text
          className='text-zinc-50 text-center font-semibold'
        >
          Cerca</Text>
      </TouchableOpacity>
      
      <ScrollView className='bg-zinc-900 flex-[1] mt-2' >
        {!loading ?
          <>
            <View
              className='bg-zinc-900'
              style={{ padding: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
              {searchData && searchData.map(item => <MovieCard key={item.id} movie={item} />)}
              {notFound ? <Text className='text-zinc-50 mt-10 text-xl'>{searchType === 'movie' ? 'Pelicula' : 'Serie'} no encontrada...</Text> : ''}
              
            </View>
          </> : <Loader />}

      </ScrollView>
    </View>
  )
}

export default Search