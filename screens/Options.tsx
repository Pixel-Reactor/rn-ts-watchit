import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useMyContext } from '../context/MyContext';
import it from '../Languages/IT.json';
import es from '../Languages/Es.json';
import en from '../Languages/En.json';
const Options = () => {
  const { language,setlanguage } = useMyContext();
  return (
    <View 
    className='bg-zinc-900 flex-[1] flex-col'>

      <Text className='text-zinc-50 p-5 text-lg font-semibold'>{language.option}</Text>
      <View className='flex justify-start px-5 gap-5 flex-row '>
      <TouchableOpacity 
      onPress={()=>setlanguage(it)}
      className={`${language && language.lang === 'it' ? 'border-2 ' : ''}  border-amber-300 rounded-md p-1`}>
      <Image
        className='w-10 h-10 '
        
        source={require('../assets/italian.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={()=>setlanguage(es)}
    className={`${language && language.lang === 'es' ? 'border-2 ' : ''}  border-amber-300 rounded-md p-1`}>
      <Image
        className='w-10 h-10'
        
        source={require('../assets/spanish.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={()=>setlanguage(en)}
    className={`${language && language.lang === 'en' ? 'border-2 ' : ''}  border-amber-300 rounded-md p-1`}>
       <Image
        className='w-10 h-10'
        
        source={require('../assets/english.png')}
      />
      </TouchableOpacity>
      </View>
    
      <View className='flex flex-col items-start justify-start  h-[300] mt-96 '>
      <Text className='text-zinc-50 px-5 text-md text-center w-full'>
          Esta app funciona gracias a 
        </Text>
        <Text className='text-zinc-50 px-5 text-lg font-bold text-center w-full'>
         THEMOVIEDB
        </Text>
       
        <Text className='text-zinc-50 px-5 text-md text-center w-full mt-10'>
          App desarrollada por
        </Text>
        <Text className='text-zinc-50 px-5 text-lg font-bold text-center w-full'>
         www.pixel-reactor.com 
        </Text>
        <Text className='text-zinc-50 px-5 text-md text-center w-full'>
        software development
        </Text>
      </View>
    </View>
  )
}

export default Options