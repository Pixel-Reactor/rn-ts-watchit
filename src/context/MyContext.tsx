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
  id: string;
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
  const [details, setdetails] = useState<DetailsState>({ on: false, data: null, id: '' });
  const [searchType, setsearchType] = useState<string>('movie');

  useEffect(() => {
    const handleDeepLink = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleUrl(initialUrl);
    };
  
    const handleUrl = (url) => {
      if (url) {
     
        const parsedUrl = new URL(url);
        const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment);
    
      
        if (pathSegments.length === 2) {
          const contentType = pathSegments[0]; 
          const contentId = pathSegments[1];
    
        
          console.log(`Tipo de contenido: ${contentType}`);
          console.log(`ID del contenido: ${contentId}`);
          
       
        } else {
          console.error('URL con estructura desconocida:', url);
        }
      }
    };
  
    // Manejar el enlace profundo al cargar la aplicación
    handleDeepLink();
  
    // Suscribirse a los cambios de enlace profundo
    const subscription = Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });
  
    // Limpiar la suscripción al desmontar el componente
    return () => subscription.remove();
  }, []);

  
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
