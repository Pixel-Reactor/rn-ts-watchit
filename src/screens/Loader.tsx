import { View, Text, Animated, Easing ,Image} from 'react-native';
import React, { useRef, useEffect } from 'react';

const Loader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], 
  });

  const startSpinAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, 
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startSpinAnimation();
  }, []);

  return (
    <View
    className='flex-1 items-center justify-center min-h-[700] relative'
   >
       <Text className='text-zinc-50 text-lg font-semibold my-10 mt-[150]'>Cargando...</Text>
       <Animated.View  style={{
          transform: [{ rotate: spin }],
          width: 50,
          height: 50,
          minWidth:50,
          minHeight:50,
          borderRadius: 25, 
          borderTopColor: 'blue',
          borderTopWidth: 2, 
          borderColor:'rgb(255,255,255)',
          backgroundColor: 'transparent',
          position:'absolute',
          margin:'auto'
        }}>
       
      </Animated.View>
      <Image
      className='absolute w-10 h-10'
        source={require('../../assets/claqueta.png')}
       
      />
    </View>
  );
};

export default Loader;
