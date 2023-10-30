import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';

const Home = () => {
    const navigation = useNavigation();

    // Function to navigate to the Chat screen
    const goToChat = () => {
        navigation.navigate('Chat');
    };

    // Function to navigate to the PrivateMessage screen
    const goToPrivateMessage = (otherUserEmail) => {
    navigation.navigate('PrivateMessage', { otherUserEmail });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToChat} style={styles.chatButton}>
                <Entypo name="chat" size={24} color={colors.lightGray} />
                <Text>Community</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToPrivateMessage} style={styles.privateChatButton}>
                <Entypo name="chat" size={24} color={colors.lightGray} />
                <Text>Private Chat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 150,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
        flexDirection: 'row',
    },
    privateChatButton: {
        backgroundColor: colors.secondary, // Change the color as needed
        height: 50,
        width: 150,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.secondary, // Change the shadow color as needed
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 10, // Adjust the margin as needed
        flexDirection: 'row',
    },
});

export default Home;
