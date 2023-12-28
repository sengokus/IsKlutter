import React, { useEffect, useState } from 'react';
import {
    VStack,
    HStack,
    Text,
    Heading,
    Box,
    Button,
    ButtonText,
    FormControl,
    Input,
    InputField,
    ScrollView,
} from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import SearchHeaderBack from '../components/SearchHeaderBack.js';
import ReceivedMessageBox from '../components/ReceivedMessageBox.js';

import colors from '../config/colors.js';
import { getFirestore, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import Routes from '../components/constants/Routes.js';
import { FIREBASE_APP } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';




const db = getFirestore(FIREBASE_APP);
const auth = getAuth();


export default function AllMessagesPage( { user } ) {

    const navigation = useNavigation();
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchAllUsernames = async () => {
            try {   
                const userCollection = collection(db, 'users');
                const querySnapshot = await getDocs(userCollection);
    
                const allUsernames = [];
                querySnapshot.forEach((doc) => {
                    allUsernames.push(doc.data().username);
                });
    
                setUsernames(allUsernames); // Set usernames to state
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
    
        fetchAllUsernames();
    }, []);
    
    
    const renderUsernames = () => {
        return usernames.map((username, index) => (
          <TouchableOpacity key={index} onPress={() => handleUsernameClick(username)}>
            <Text>{username}</Text>
          </TouchableOpacity>
        ));
      };
    
      const handleUsernameClick = (selectedUsername) => {
        navigation.navigate(Routes.PRIVATEMESSAGE, { recipient: selectedUsername });
      };
      



    const messagesData = [
        { 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Sassa",
            senderUsername: "@sassagurl",
            message: "avail na po ang neon balls"
        }, { 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Yasmin Marie Asistido",
            senderUsername: "@kweenyasmin",
            message: "hahhahaha"
        }, { 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Juniper",
            senderUsername: "@leng",
            message: "mhine q"
        },{ 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Ychan",
            senderUsername: "@adele",
            message: "ayaw q na"
        },{ 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Ychan",
            senderUsername: "@adele",
            message: "hatdog"
        }
    ]

    const renderAllMessages = () => {
        return messagesData.map((message, index) =>
            <ReceivedMessageBox 
                key = {index}
                senderIcon={message.senderIcon}
                senderName={message.senderName}
                senderUsername={message.senderUsername}
                message={message.message}

            />
        );
    }

    return(
        // Parent box
        <Box w="100%" h="100%">
        
            {/*Search Bar*/}
            <SearchHeaderBack posterUser="Sassa Girl" 
            userIcon={require("../../assets/img/usericon.jpg")} />

            {/* Messages Title */}
            <VStack space="xs" alignItems="left" bgColor="$amber200" p="$3" width="100%">
                <Heading lineHeight={40} fontSize="$3xl" fontWeight="$extrabold" 
                    color={colors.secondary} m={2} >Messages</Heading>
            </VStack>

            {/* Container */}
            <Box p="$0" maxWidth="100%" flex={0} bgColor="#cfcfcf">
                <ScrollView>
                    <HStack space={0} flexWrap="wrap">
                                {renderUsernames()}

                                {renderAllMessages()}
                    </HStack>
                </ScrollView> 
          </Box>
        </Box>
    )

}