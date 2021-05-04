import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import Router from "../navigation/Router";
import AuthNavigation from "../navigation/AuthNavigation";
import auth from '@react-native-firebase/auth';

const Navigation = () => {
    const [user, setUser] = useState('Ahsan');

    useEffect(() => {
        auth().onAuthStateChanged((userExist) => {
            if(userExist) {
                setUser(userExist)
            }
            else{
                setUser("")
            }
        })
    }, []);
    return (
        <View>
            {user? <Router /> : <AuthNavigation />}
        </View>
    )
};

export default Navigation;

