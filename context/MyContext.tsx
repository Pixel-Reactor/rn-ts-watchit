import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { Linking } from 'react-native';
import { getLocales } from 'expo-localization';
import { Movie } from '../Interfaces';
import it from '../Languages/IT.json';
import es from '../Languages/Es.json';
import en from '../Languages/En.json';

interface DetailsState {
  on: boolean;
  data: null | Movie; 
  id: string | null;
}

interface MyContextValue {
  details: DetailsState;
  setdetails: Dispatch<SetStateAction<DetailsState>>;
  searchType: string;
  setsearchType: Dispatch<SetStateAction<string>>;
  language: any; 
  setlanguage: Dispatch<SetStateAction<any>>;
}


const MyContext = createContext<MyContextValue | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }){
  const [language, setlanguage] = useState<any>(en);
  const [details, setdetails] = useState<DetailsState>({ on: false, data: null, id: null });
  const [searchType, setsearchType] = useState<string>('movie');


  
  
  useEffect(() => {
    const Locales = getLocales();

    const language = Locales[0].languageTag;
    if (!language) {
      return;
    }
    if (language === 'es-ES') {
      setlanguage(es);
    } else if (language === 'it-IT') {
      setlanguage(it);
    } else if (language === 'en-EN') {
      setlanguage(en);
    }
  }, []);

  return (
    <MyContext.Provider value={{ details, setdetails, searchType, setsearchType, language,setlanguage }} >
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
