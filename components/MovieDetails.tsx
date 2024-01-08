import { View, Text, Modal, Pressable, Image, ScrollView ,Platform,Linking,Alert} from "react-native";
import React, { useState, useEffect } from "react";
import { useMyContext } from "../context/MyContext";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../screens/Loader";
import HandleStorage from "../storage/HandleStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "Interfaces";
const MovieDetails = () => {
  const { details, setdetails, searchType, language } = useMyContext();
  const [movieDetails, setmovieDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [isSaved, setisSaved] = useState(false);



  useEffect(() => {
    if(!details.id){return }
    const FetchData = async () => {
      setloading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${searchType}/${details.data.id}?language=${language.id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        const results = data || null;
        if (results) {
          setmovieDetails(results);
        }
      } catch (error) {
        console.log("catch",error);
      } finally {
        setloading(false);
      }
    };
    FetchData();
  }, [details]);

  const Get = async () => {
    const get = await AsyncStorage.getItem(searchType);
    if (get && movieDetails) {
      const array = JSON.parse(get);
      const checkList = array.filter((item:Movie) => item.id === movieDetails.id);

      if (checkList.length) {
        setisSaved(true);
      } else {
        setisSaved(false);
      }
    }
  };

  useEffect(() => {
    Get();
  }, [movieDetails]);

  return (
    <View>
      {!loading && movieDetails ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={details.on}
          onRequestClose={() => {
            setdetails({ ...details, on: false });
          }}
        >
          <ScrollView>
            <View className="flex items-center justify-center min-h-[900] w-full h-full  top-[40] bg-transparent ">
              <View className="w-full h-[100%] relative top-0 bg-zinc-900 rounded-2xl py-[40]  shadow-2xl shadow-white/90">
                <View className="w-full h-[200] mt-[45] shadow-xl shadow-white">
                  {!movieDetails.backdrop_path ? (
                    <Image
                      className="h-[200] w-full object-contain "
                      source={require("../assets/claqueta.png")}
                    />
                  ) : (
                    <Image
                      className="h-[200] object-cover "
                      source={{
                        uri: movieDetails?.backdrop_path
                          ? `https://image.tmdb.org/t/p/w500` +
                            movieDetails.backdrop_path
                          : "/noimage.png",
                      }}
                    />
                  )}
                </View>
                <View className="w-full p-2">
                  <View>
                    <Text className="text-zinc-50/90 text-2xl font-bold uppercase my-4">
                      {movieDetails && movieDetails.title
                        ? movieDetails.title
                        : movieDetails.name}
                    </Text>
                  </View>
                  <View className="text-zinc-50 text-lg flex flex-col flex-wrap items-start gap-2 justify-start w-full ">
                    <Text className="text-zinc-50 text-lg font-semibold  text-amber-500/80 ">
                      {language.producedby}
                    </Text>
                    <View className="flex flex-row flex-wrap">
                      {movieDetails?.production_companies.map((item) => (
                        <Text
                          key={item.name}
                          className="mx-[2] rounded-lg  border border-zinc-50/20 p-1 px-2 text-zinc-50 text-sm"
                        >
                          {item.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View className="text-zinc-50 text-lg flex flex-col  items-start gap-2 justify-start">
                    <Text className="text-zinc-50 text-lg font-semibold text-amber-500/80">
                     {language.genre}
                    </Text>
                    <View className="flex-row">
                    {movieDetails?.genres.map((item) => (
                      <Text
                        style={{ borderRadius: 10 }}
                        key={item.name}
                        className="mx-[2]  border border-zinc-50/20 p-1 px-2 text-zinc-50 text-md"
                      >
                        {item.name}
                      </Text>
                    ))}</View>
                  </View>
                  <View className="text-zinc-50 text-lg flex flex-col flex-wrap items-start justify-start">
                    <Text className="text-zinc-50 text-lg font-semibold text-amber-500/80">
                     {language.launched}
                    </Text>

                    <Text
                      style={{ borderRadius: 10 }}
                      className="mx-[2] font-semibold  p-1 px-2 text-zinc-50 text-md"
                    >
                      {movieDetails?.release_date
                        ? movieDetails.release_date
                        : movieDetails.first_air_date}
                    </Text>
                  </View>
                  <View className="text-zinc-50 text-lg flex flex-row flex-wrap items-center justify-start">
                    <Pressable
                      disabled={isSaved}
                      onPress={() => {
                        HandleStorage(movieDetails, searchType);
                        setisSaved(true);
                      }}
                      style={{ borderRadius: 10 }}
                      className="justify-items-center py-[5] px-[10] items-center flex-row flex border border-zinc-50/10 my-[6] mr-[10] rounded-[20]"
                    >
                      {isSaved ? (
                        <Ionicons name="checkmark" size={24} color="white" />
                      ) : (
                        <Ionicons
                          name="md-download-outline"
                          size={24}
                          color="rgba(255,255,255,0.7)"
                        />
                      )}

                      <Text className="text-zinc-50/90">
                        {isSaved ? "Salvato" : "Salvare nella mia lista"}
                      </Text>
                    </Pressable>
                 
                  </View>
                  <View className="text-zinc-50 text-lg flex flex-row flex-wrap items-center justify-start">
                    <Text className="text-zinc-50 text-lg font-semibold text-amber-500/80">
                    {language.overview}
                    </Text>
                    <Text className="text-lg text-left text-zinc-50">
                      {details.data && details.data.overview}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={{ borderRadius: 10 }}
                  className="justify-items-center py-[8] px-[10] items-center flex-row flex  border border-zinc-50/10 absolute top-[20] left-[15] rounded-[20]"
                  onPress={() => setdetails({ ...details, on: false })}
                >
                  <Ionicons
                    name="backspace"
                    size={24}
                    color="rgba(255,255,255,0.8)"
                  />
                  <Text className="text-zinc-50/90 ml-2">{language.back}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Modal>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default MovieDetails;
