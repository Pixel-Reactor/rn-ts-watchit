import { View, ScrollView,  StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useMyContext } from '../context/MyContext';
import Loader from './Loader';
import { Movie } from '../Interfaces';
const Populars = () => {
  const { searchType,language } = useMyContext();
  const [populars, setpopulars] = useState(null);
  const [loading, setloading] = useState(false);
  const GetPopulars = async () => {
    try {
      setloading(true);
     
      const res = await fetch(
        `https://api.themoviedb.org/3/${searchType}/popular?language=${language.id}&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      const results = data.results || null;
      if (results) {
        setpopulars(results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    GetPopulars();
  }, [searchType,language]);

  return (
    <>
      <StatusBar backgroundColor='#222f3e' />
      <ScrollView  className='bg-zinc-900 flex-[1] ' >
        {!loading ?
          <>
            <View className='bg-zinc-900' style={{ padding: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
              {
              populars ? populars.map((item:Movie) => <MovieCard key={item.id} movie={item} />) : <Loader />
              }
            </View>
          </> : <Loader />}
      </ScrollView>
    </>
  );
};

export default Populars;
