import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "../navigation/Tabs";

const Stack = createStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

const Router = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={"Home"}
            >
                <Stack.Screen name="Home" component={Tabs} />
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;

