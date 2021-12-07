import React , { useEffect, useState }from "react";
import { withNavigation } from "react-navigation";
import { View ,Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import api from "../services/api";

function SpotList({ tech , navigation }){
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots(){
            const respose = await api.get("/spots", {
                params: { tech }
            });
            setSpots(respose.data);
        } 
        loadSpots();
    },[]);    
 
    function handleNavigate(id){
        navigation.navigate("Book", { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Empresas que usam <Text style={{fontWeight: 'bold'}}>{tech}</Text></Text>
            <FlatList 
                style={styles.list}
                data={spots}
                keyExtractor={ spot => spot._id }
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ spot }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: spot.thumbnail_url}} style={styles.thumbnail} />
                        <Text style={styles.company}>{spot.company}</Text>
                        <Text style={styles.price}>{spot.price ? `R$${spot.price}/dia` : "Gratuito"}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(spot)} style={styles.button}>
                            <Text style={style.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View > 
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    list:{
        paddingHorizontal: 20
    },
    listItem:{
        marginRight: 15,
    },
    thumbnail:{
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price:{
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f50a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default withNavigation(SpotList);