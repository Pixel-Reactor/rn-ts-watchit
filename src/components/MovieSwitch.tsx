import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useMyContext } from "../context/MyContext";

const MovieSwitch = () => {
  const [left, setleft] = useState(2);
  const { setsearchType, searchType, language } = useMyContext();

  //custom animation delay

  const HandleAnimation = (start: number, end: number, timing: number) => {
    setleft(start);
    let from = start;
    let to = end;
    const diff = from > to ? from - to : to - from;
    const speed = 50;
    const cutter = diff / (timing / speed);
    const interval = setInterval(() => {
      if (from > to) {
        from = from - cutter;
        setleft(from);
        from - cutter < to && clearInterval(interval);
      } else {
        from = from + cutter;

        setleft(from);
        from + cutter > to && clearInterval(interval);
      }
    }, speed);
  };

  useEffect(() => {
    if (searchType === "tv") {
      HandleAnimation(2, 78, 200);
    } else {
      HandleAnimation(78, 2, 200);
    }
  }, [searchType]);
  return (
    <View>
      <View className="relative w-[160] h-[40] bg-gray-400/20 flex-row rounded-3xl mr-2 items-center justify-center border border-zinc-50/40 ">
        <View
          style={{ left: left }}
          className={`w-[50%]  top-[1] absolute h-[36] bg-blue-500/80 shadow-inner shadow-black  rounded-2xl`}
        />
        <Text
          onPress={() => {
            setsearchType("movie");
          }}
          className={`${searchType === 'movie' ? 'text-zinc-50' : 'text-zinc-50/70' } text-lg font-medium  w-[50%] text-center`}
        >
          {language.movie}
        </Text>
        <Text
          onPress={() => {
            setsearchType("tv");
          }}
          className={`${searchType === 'tv' ? 'text-zinc-50' : 'text-zinc-50/70' } text-lg font-medium  w-[50%] text-center`}
        >
          {language.tv}
        </Text>
      </View>
    </View>
  );
};

export default MovieSwitch;
