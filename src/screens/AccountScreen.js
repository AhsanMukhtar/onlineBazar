import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Avatar, Card, Title, Paragraph} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { color } from 'react-native-reanimated';

const AccountScreen = () => {
    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(false) 

    const getDetails = async () => {
        const querySnap = await firestore().collection('ads')
        .where('uid','==',auth().currentUser.uid)
        .get()
        const result =  querySnap.docs.map(docSnap=>docSnap.data())
        // console.log(result)
        setItems(result)
      }

      useEffect(()=>{
          getDetails()
          return ()=>{
            console.log("cleanup")
          }
        },[])

        const renderItem = (item)=>{
            return(
                <Card style={styles.card}>
              <Card.Title title={item.name}  />
              <Card.Content>
                <Paragraph>{item.desc}</Paragraph>
                <Paragraph>{item.year}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Actions>
                <Button>Rs{item.price}</Button>
                {/* <Button onPress={()=>openDial()}>call seller</Button> */}
              </Card.Actions>
            </Card>  
            )
          }

    return (
        <View style={{flex:1}}>
            <View style={{height:'30%',justifyContent:"space-evenly",alignItems:"center"}}>
                <Text style={{fontSize:22, backgroundColor: '#EFEFF1', color: 'black', borderRadius: 30,}}>{auth().currentUser.email}</Text>
                <Button  mode="contained" onPress={() => auth().signOut()}>
                        Logout
                </Button> 
                <Text style={{fontSize: 22}}>Your Ads!</Text>  
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
        </View>
    )
};

export default AccountScreen

const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
})
