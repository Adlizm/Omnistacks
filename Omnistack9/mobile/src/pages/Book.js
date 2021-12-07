import React , { useState, useEffect }from "react";
import { SafeAreaView, Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import api from "../services/api";

export default function Book({ navigation }){
    const [date, setDate] = useState("");
    const id = navigation.getParams("id");

    async function handleSubmit(){
        const user_id = AsyncStorage.getItem("user");
        await api.post(`spots/${id}/bookings`,{ date }, {
            headers: { user_id }
        });

        Alert.alert("Solicitação de reserva enviada! ");
        navigation.navigate("List"); 
    } 

    function handleCancel(){
        navigation.navigate("List"); 
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERRESE *</Text>
            <TextInput 
                style={styles.input}
                placeholder = "Qual data você quer reservar?"
                placeholderTextColor = "#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar reserva</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },  
    label: {
        marginTop: 20,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2, 
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
    },
    button: {
        height: 42,
        backgroundColor: '#f50a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    } 
});