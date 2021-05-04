import React from 'react';
import { View, } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../screens/ListItemScreen";
import CreateAdScreen from "../screens/CreateAdScreen";
import AccountScreen from "../screens/AccountScreen";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home'
                } else if (route.name === 'Create') {
                    iconName = 'plussquareo'
                } else if (route.name === 'Account') {
                    iconName = 'user'
                }
                return <View><AntDesign name={iconName} size={32} color={color} /></View>
                },
            })}
            tabBarOptions={{
                activeTintColor: '#581845',
                inactiveTintColor: 'gray',
            }}
        >
           <Tab.Screen 
                name="Home"
                component={ListItemScreen}
           />
           <Tab.Screen 
                name="Create"
                component={CreateAdScreen}
           />
           <Tab.Screen 
                name="Account"
                component={AccountScreen}
           />
       </Tab.Navigator>
    )
}

export default Tabs;
