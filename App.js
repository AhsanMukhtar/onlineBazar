/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
// import Navigation from "./src/navigation/Navigation";
import AuthNavigation from "./src/navigation/AuthNavigation";
import Router from "./src/navigation/Router";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#581845',
  },
};

const App = () => {
  // const user = "";
  const [user, setUser] = useState('');

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((userExist) => {
            if(userExist) {
                setUser(userExist)
            }
            else{
                setUser("")
            }
        })
        return unsubscribe
    }, []);
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {/* <Navigation /> */}
          {user? <Router /> : <AuthNavigation />}
        </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
