import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet, Alert} from "react-native";

import socketio from "socket.io-client";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List(){
    const [techs, setTechs] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem("user").then(user_id => {
            const socket = socketio("http://192.168.0.110:3333", {
                query: { user_id }
            });
        });

        socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} para a data: ${booking.date} foi ${
                booking.approved ? "Aprovada": "Rejeitada"}!`);
        });
    },[]);

    useEffect(() => {
        AsyncStorage.getItem("techs").then( storageTechs => {
            const arrayTechs = storageTechs.split(",").map( tech => tech.trim());
            setTechs(arrayTechs);
        });
    },[]);
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map((tech,index) => <SpotList tech={tech} key={index}/>)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    }
});