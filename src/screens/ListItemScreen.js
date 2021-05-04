import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Linking, Platform, Image, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { onlineBazar } from "../constants/images";

const ListItemScreen = () => {
    const [items,setItems] = useState([])
    const [loading, setLoading] = useState(false)

    const getDetails = async () => {
        const querySnap = await firestore().collection('ads').get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())
        // console.log(result);
        setItems(result);
    } 
    useEffect(()=> {
        getDetails()
        return ()=>{
            console.log("cleanup");
        }
    }, [])

    const openDial = (item) => {
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${item.phone}`)
        }else {
            Linking.openURL(`telprompt:${item.phone}`)
        }
    }
    
    const renderItem = (item) => {
        return(
            <Card style={styles.card}>
                <Card.Title title={item.name} />
                <Card.Content>
                    <Paragraph>{item.desc}</Paragraph>
                    <Paragraph>{item.year}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Actions>
                    <Button>Rs.{item.price}</Button>
                    <Button onPress={()=>openDial(item)}>call seller</Button>
                </Card.Actions>
            </Card>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.box}>
            <Image source={onlineBazar} style={styles.logoImage}  resizeMode="contain"/>
            </View>  
            <FlatList 
             data={items}
             keyExtractor={(item)=>item.phone}
             renderItem={({item})=>renderItem(item)}
             onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
             }}
             refreshing={loading}
            />
        </SafeAreaView>
    )
};

export default ListItemScreen;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        elevation: 2,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: 50,
        width: '100%',
        marginTop: 16,
    },
})
