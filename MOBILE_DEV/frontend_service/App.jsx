/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './app/common/context'
import { AppNavigator } from './app/layouts'
import Spinner from './app/components/loaders'
import { setCustomText } from "react-native-global-props";
import { loadFonts } from './app/config/FontLoader'

export default function App() {
  const [user, setUser] = useState(null)
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const handleFontsLoad = async () => {
    await loadFonts();
    setIsFontLoaded(true);
  };

  useEffect(() => {
    handleFontsLoad();
  });

  if (!isFontLoaded) {
    return <Spinner />;
  }
  else{
    const customTextProps = {
      style: {
        fontFamily: "Poppins-Regular",
      },
    };
    setCustomText(customTextProps);
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
